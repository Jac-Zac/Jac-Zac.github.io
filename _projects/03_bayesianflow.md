---
layout: page
title: BayesianFlow
description: Pixel-wise uncertainty estimation in Flow Matching generative models via Last Layer Laplace Approximation
img: assets/img/bayesianflow.png
importance: 1
category: ml
---

**BayesianFlow** extends [BayesDiff](https://arxiv.org/abs/2306.10173) from diffusion models to **Flow Matching**, achieving **5× faster generation** than DDIM at comparable quality.

A **Last Layer Laplace Approximation** is integrated into the U-Net to produce pixel-wise uncertainty estimates during generation, yielding interpretable confidence maps alongside generated images. Experiments on MNIST and Fashion-MNIST assess both the quality of uncertainty estimates and the computational efficiency gap between diffusion and flow matching.

🔗 [GitHub](https://github.com/Jac-Zac/BayesianFlow) · 📊 [Slides](https://canva.link/vteuehldupg5bv3)
