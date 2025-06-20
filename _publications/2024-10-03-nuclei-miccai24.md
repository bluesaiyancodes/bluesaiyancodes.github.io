---
title: "SAM Guided Task-Specific Enhanced Nuclei Segmentation in Digital Pathology"
collection: publications
category: conferences
permalink: /publication/2024-10-03-nuclei-miccai24
excerpt: 'In this paper we propose utilizing the foundation model to guide the task-specific supervised learning by dynamically combining their global and local latent representations, via our proposed X-Gated Fusion Block, which uses Gated squeeze and excitation block followed by Cross-attention to dynamically fuse latent representations.'
date: 2024-10-03
venue: 'Medical Image Computing and Computer Assisted Intervention <mark>[MICCAI]</mark>'
slidesurl: 'https://cvpr-kit.github.io/SAM-Guided-Enhanced-Nuclei-Segmentation/'
paperurl: 'https://link.springer.com/chapter/10.1007/978-3-031-72114-4_52'
---
<mark>[MICCAI 2024] - Also published in Springer Nature Switzerland</mark>  
<a href="https://link.springer.com/chapter/10.1007/978-3-031-72114-4_52">Springer</a>  
<a href="https://papers.miccai.org/miccai-2024/666-Paper3533.html">MICCAI Papers</a>
<a href="https://cvpr-kit.github.io/SAM-Guided-Enhanced-Nuclei-Segmentation/">Project Page</a>

Cell nuclei segmentation is crucial in digital pathology for various diagnoses and treatments which are prominently performed using semantic segmentation that focus on scalable receptive field and multi-scale information. In such segmentation tasks, U-Net based task-specific encoders excel in capturing fine-grained information but fall short integrating high-level global context. Conversely, foundation models inherently grasp coarse-level features but are not as proficient as task-specific models to provide fine-grained details. To this end, we propose utilizing the foundation model to guide the task-specific supervised learning by dynamically combining their global and local latent representations, via our proposed X-Gated Fusion Block, which uses Gated squeeze and excitation block followed by Cross-attention to dynamically fuse latent representations. Through our experiments across datasets and visualization analysis, we demonstrate that the integration of task-specific knowledge with general insights from foundational models can drastically increase performance, even outperforming domain-specific semantic segmentation models to achieve state-of-the-art results by increasing the Dice score and mIoU by approximately 12% and 17.22% on CryoNuSeg, 15.55% and 16.77% on NuInsSeg, and 9% on both metrics for the CoNIC dataset. 