const fs = require("node:fs/promises");
const path = require("node:path");
const { chromium } = require("playwright");

const root = process.cwd();
const siteDirectory = path.resolve(root, process.env.JEKYLL_SITE_DIR || "_site");
const outputDirectory = path.resolve(root, process.env.BLOG_PDF_DIR || "files/blog");
const siteUrl = process.env.BLOG_PDF_BASE_URL || "http://127.0.0.1:4001";
const productionUrl = process.env.BLOG_PDF_PRODUCTION_URL || "https://bluesaiyancodes.github.io";

async function findPostPages(directory) {
  const pages = [];
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) pages.push(...await findPostPages(absolutePath));
    if (entry.isFile() && entry.name === "index.html") {
      const html = await fs.readFile(absolutePath, "utf8");
      const filename = html.match(/data-pdf-filename="([^"]+\.pdf)"/);
      if (filename) pages.push({ absolutePath, filename: filename[1] });
    }
  }
  return pages;
}

async function waitForPageAssets(page) {
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
    await Promise.all(Array.from(document.images, image => {
      if (image.complete) return Promise.resolve();
      return new Promise(resolve => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      });
    }));
  });
}

async function optimizePdfImages(page) {
  await page.evaluate(async () => {
    const maximumWidth = 1200;
    const images = Array.from(document.querySelectorAll(".blog-post img"));
    await Promise.all(images.map(async image => {
      if (!image.naturalWidth || image.naturalWidth <= maximumWidth) return;
      const canvas = document.createElement("canvas");
      const ratio = maximumWidth / image.naturalWidth;
      canvas.width = maximumWidth;
      canvas.height = Math.round(image.naturalHeight * ratio);
      const context = canvas.getContext("2d");
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      image.removeAttribute("srcset");
      image.removeAttribute("loading");
      image.src = canvas.toDataURL("image/jpeg", 0.88);
      if (image.decode) await image.decode().catch(() => {});
    }));
  });
}

async function rewritePdfLinks(page) {
  await page.evaluate(({ localOrigin, publicOrigin }) => {
    document.querySelectorAll("a[href]").forEach(anchor => {
      const url = new URL(anchor.href);
      if (url.origin !== localOrigin) return;
      anchor.href = new URL(`${url.pathname}${url.search}${url.hash}`, publicOrigin).href;
    });
  }, { localOrigin: new URL(siteUrl).origin, publicOrigin: productionUrl });
}

async function main() {
  const blogDirectory = path.join(siteDirectory, "blog");
  const posts = await findPostPages(blogDirectory);
  if (!posts.length) throw new Error(`No blog post pages found under ${blogDirectory}.`);

  await fs.rm(outputDirectory, { recursive: true, force: true });
  await fs.mkdir(outputDirectory, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ colorScheme: "light" });
  await page.route(/livereload\.js/, route => route.abort());

  try {
    for (const post of posts) {
      const relativePage = path.relative(siteDirectory, post.absolutePath).split(path.sep).join("/");
      const pagePath = `/${relativePage.replace(/index\.html$/, "")}`;
      const url = new URL(pagePath, siteUrl).href;
      const outputPath = path.join(outputDirectory, path.basename(post.filename));

      await page.goto(url, { waitUntil: "load" });
      await waitForPageAssets(page);
      await optimizePdfImages(page);
      await rewritePdfLinks(page);
      await page.emulateMedia({ media: "print", colorScheme: "light" });
      const printLayoutIsActive = await page.evaluate(() => {
        const topbar = document.querySelector(".blog-post__topbar");
        return matchMedia("print").matches && topbar && getComputedStyle(topbar).display === "none";
      });
      if (!printLayoutIsActive) throw new Error(`Print styles did not activate for ${pagePath}.`);
      await page.pdf({
        path: outputPath,
        format: "A4",
        preferCSSPageSize: true,
        printBackground: true,
        tagged: true,
        outline: true
      });
      process.stdout.write(`Generated ${path.relative(root, outputPath)} from ${pagePath}\n`);
    }
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
