---
layout: blog-post
title: "Hello, I’m Bishal"
date: 2026-07-14 12:00:00 +0900
lang: en
translation_key: hello-from-bishal
tags:
  - introduction
  - research
excerpt: "What four years of experiments across images and time series taught me about robust learning—and what I’ll share here."
comments: true
---

<div class="blog-intro-profile">
  <img src="{{ '/images/bishal2.jpg' | relative_url }}" alt="Bishal Swain" width="1080" height="1080">
  <div>
    <p>Hello, I’m <strong>Bishal</strong> (ବିଶାଳ, 비살, 丕薩), a computer vision researcher interested in one question: <strong>how can a learning system remain reliable when its world changes?</strong></p>
    <p>My path began with computer science in India, followed by research at the National Atmospheric Research Laboratory and the Indian Institute of Science. I moved to South Korea as a Global Korea Scholarship recipient and began my PhD under Prof. Jaepil Ko at Kumoh National Institute of Technology.</p>
  </div>
</div>

## Four years, one recurring question

For four years of my PhD journey, I worked from morning into night, every day—including weekends—without taking a day off. I do not offer that as a productivity formula. It explains the depth behind these posts: reproducing baselines, questioning labels, designing ablations, tracing unstable runs, and restarting when an idea failed.

The work ranged from medical images and steel microstructures to industrial inspection, weather radar, and general time series. It led to research at MIDL, MICCAI, WACV, CVPR, and ICANN—but the most reusable lessons often came from experiments that never entered a paper.

<div class="blog-visual-grid" aria-label="Examples from medical imaging, materials microscopy, and weather radar research">
  <figure>
    <img src="{{ '/images/projects/rhinitis/thumb.png' | relative_url }}" alt="Nasal endoscopy image used in an early medical imaging project" width="1008" height="572" loading="lazy">
    <figcaption>Medical imaging</figcaption>
  </figure>
  <figure>
    <img src="{{ '/images/projects/steel/thumb.png' | relative_url }}" alt="Annotated steel microstructure showing ambiguous textures and phases" width="2048" height="996" loading="lazy">
    <figcaption>Materials microscopy</figcaption>
  </figure>
  <figure>
    <img src="{{ '/images/projects/klimax/klimax_thumb.png' | relative_url }}" alt="Weather radar fields used for rainfall forecasting" width="848" height="440" loading="lazy">
    <figcaption>Radar and time series</figcaption>
  </figure>
</div>
`
Across those domains, the pattern stayed remarkably consistent:

<div class="blog-research-map" role="img" aria-label="Research map: images and time series lead to distribution shift, scarce labels, and ambiguity; these motivate context, memory, and feedback">
  <div class="blog-research-map__node">
    <span>Data</span>
    <strong>Images + time series</strong>
  </div>
  <span class="blog-research-map__arrow" aria-hidden="true">→</span>
  <div class="blog-research-map__node">
    <span>Real-world friction</span>
    <strong>Shift + scarcity + ambiguity</strong>
  </div>
  <span class="blog-research-map__arrow" aria-hidden="true">→</span>
  <div class="blog-research-map__node">
    <span>Research direction</span>
    <strong>Context + memory + feedback</strong>
  </div>
</div>

This is why I study **learning under distribution shift**, including memory-augmented models inspired by hippocampal–cortical interaction. Whether the input is a histology image or an evolving signal, I keep returning to the same question: *what should a model remember, and how should that memory change its next decision?*

## What readers will get

- **Decisions, not just results:** how I choose baselines, structure ablations, and detect misleading gains.
- **Failures worth keeping:** what broke, why I think it broke, and what changed next.
- **Robust-learning insights:** practical lessons on domain shift, associative memory, liquid neural networks, segmentation, and foundation-model adaptation.
- **Cross-domain judgment:** what transfers between medical, materials, industrial, and temporal data—and what does not.

I will separate measured results from interpretation, show assumptions and negative evidence, and explain evaluation beyond one average score. The aim is simple: help readers design a better next experiment.

## Beyond the experiments

I currently serve as **Vice President of the MICCAI Student Board**, following a year as Social Events Officer. I also contribute through conference reviewing—including recognition as an ICML 2026 Gold Reviewer—and community work in Korea. Reaching TOPIK Level 5 lets me share useful posts in both English and Korean.

My [Research & Projects]({{ '/research/' | relative_url }}), [Academics]({{ '/academics/' | relative_url }}), and [Co-curricular Activities]({{ '/co-curriculars/' | relative_url }}) pages hold the complete record. This blog is where I will explain the reasoning behind it.

If your experiment behaves differently from what the paper promised, you are in the right place.
