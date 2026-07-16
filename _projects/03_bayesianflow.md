---
layout: page
title: BayesianFlow
description: Pixel-wise uncertainty estimation in Flow Matching generative models via Last Layer Laplace Approximation
img: assets/img/bayesianflow.png
thumbnail_padded: true
importance: 1
category: Machine Learning
code: https://github.com/Jac-Zac/BayesianFlow
slides: https://canva.link/vteuehldupg5bv3
---

**BayesianFlow** extends [BayesDiff](https://arxiv.org/pdf/2310.11142) from diffusion models to **flow matching**, producing pixel-wise uncertainty estimates alongside generated images.

{% include project_actions.liquid %}

## Method

A **Last Layer Laplace Approximation** is integrated into the U-Net. Its predictive variance is propagated through the generative trajectory, yielding an interpretable confidence map for each generated sample.

## Results

Experiments on MNIST and Fashion-MNIST compare uncertainty quality and computational efficiency across diffusion and flow-matching models. Flow matching achieves **5× faster generation** than DDIM at comparable quality.
