(function () {
  "use strict";

  if (!window.fetch || !window.DOMParser || !window.AbortController || !window.history || !window.history.pushState) return;

  var activeRequest = null;
  var goatCounterTimer = null;
  var navigationSelector = "a[data-blog-navigation]";
  var renderedUrl = window.location.href;

  function copyHeadValue(nextDocument, selector, attribute) {
    var current = document.head.querySelector(selector);
    var next = nextDocument.head.querySelector(selector);
    if (current && next) current.setAttribute(attribute, next.getAttribute(attribute));
  }

  function updateDocument(nextDocument) {
    document.title = nextDocument.title;
    document.documentElement.lang = nextDocument.documentElement.lang || "en";
    copyHeadValue(nextDocument, 'link[rel="canonical"]', "href");
    copyHeadValue(nextDocument, 'meta[name="description"]', "content");
    copyHeadValue(nextDocument, 'meta[property="og:title"]', "content");
    copyHeadValue(nextDocument, 'meta[property="og:url"]', "content");
    copyHeadValue(nextDocument, 'meta[property="og:description"]', "content");
  }

  function activateGiscus(container) {
    var script = container.querySelector('script[src="https://giscus.app/client.js"]');
    if (!script) return;
    var replacement = document.createElement("script");
    Array.prototype.forEach.call(script.attributes, function (attribute) {
      replacement.setAttribute(attribute.name, attribute.value);
    });
    script.replaceWith(replacement);
  }

  function countGoatCounter(previousUrl, attempt) {
    if (!document.querySelector("script[data-goatcounter]")) return;
    if (window.goatcounter && typeof window.goatcounter.count === "function") {
      window.goatcounter.count({
        path: window.location.pathname + window.location.search,
        title: document.title,
        referrer: previousUrl
      });
      return;
    }
    if (attempt >= 20) return;
    window.clearTimeout(goatCounterTimer);
    goatCounterTimer = window.setTimeout(function () {
      countGoatCounter(previousUrl, attempt + 1);
    }, 100);
  }

  function focusPageTitle() {
    var title = document.querySelector(".blog-post__title, .blog-index__title");
    if (!title) return;
    title.setAttribute("tabindex", "-1");
    try { title.focus({ preventScroll: true }); }
    catch (_error) { title.focus(); }
    title.addEventListener("blur", function () { title.removeAttribute("tabindex"); }, { once: true });
  }

  function replaceMain(nextDocument) {
    var currentMain = document.querySelector("main.blog-main");
    var parsedMain = nextDocument.querySelector("main.blog-main");
    if (!currentMain || !parsedMain) throw new Error("Blog content was not found in the response.");

    var nextMain = document.importNode(parsedMain, true);
    updateDocument(nextDocument);
    currentMain.replaceWith(nextMain);
    activateGiscus(nextMain);

    if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
      window.MathJax.typesetPromise([nextMain]);
    }
  }

  function swapWithTransition(nextDocument) {
    if (document.startViewTransition) {
      var transition = document.startViewTransition(function () { replaceMain(nextDocument); });
      return transition.updateCallbackDone.then(function () {
        return transition.finished.catch(function () {});
      });
    }
    replaceMain(nextDocument);
    return Promise.resolve();
  }

  function navigate(url, addHistory) {
    var currentMain = document.querySelector("main.blog-main");
    var previousUrl = renderedUrl;
    if (!currentMain || url.origin !== window.location.origin || !/\/blog(?:\/|$)/.test(url.pathname)) {
      window.location.assign(url.href);
      return;
    }

    if (activeRequest) activeRequest.abort();
    activeRequest = new AbortController();
    currentMain.classList.add("is-blog-loading");
    currentMain.setAttribute("aria-busy", "true");

    window.fetch(url.href, {
      credentials: "same-origin",
      headers: { "X-Requested-With": "blog-navigation" },
      signal: activeRequest.signal
    }).then(function (response) {
      if (!response.ok) throw new Error("Blog navigation failed with status " + response.status + ".");
      return response.text();
    }).then(function (html) {
      var nextDocument = new DOMParser().parseFromString(html, "text/html");
      if (!nextDocument.querySelector("main.blog-main")) throw new Error("The response is not a blog page.");
      return swapWithTransition(nextDocument);
    }).then(function () {
      if (addHistory) window.history.pushState({ blogNavigation: true }, "", url.href);
      renderedUrl = window.location.href;
      window.scrollTo(0, 0);
      focusPageTitle();
      countGoatCounter(previousUrl, 0);
      activeRequest = null;
    }).catch(function (error) {
      if (error.name === "AbortError") return;
      var main = document.querySelector("main.blog-main");
      if (main) {
        main.classList.remove("is-blog-loading");
        main.removeAttribute("aria-busy");
      }
      window.location.assign(url.href);
    });
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest ? event.target.closest(navigationSelector) : null;
    if (!link || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target && link.target !== "_self") return;

    var url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    event.preventDefault();
    navigate(url, true);
  });

  window.addEventListener("popstate", function () {
    navigate(new URL(window.location.href), false);
  });
}());
