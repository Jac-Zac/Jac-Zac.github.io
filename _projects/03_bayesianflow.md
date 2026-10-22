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

**BayesianFlow** carries the uncertainty estimation of [BayesDiff](https://arxiv.org/pdf/2310.11142) from diffusion models over to **flow matching**, so each generated image comes with a pixel-wise uncertainty map.

{% include project_actions.liquid %}

## Method

A **last-layer Laplace approximation** is fitted in the U-Net. Predictive variance is propagated along the generative trajectory, so each sample ends with a per-pixel variance estimate.

## Results

MNIST and Fashion-MNIST experiments compare uncertainty quality and sampling cost between the diffusion and flow-matching versions. Flow matching generates about **5× faster** than DDIM at comparable quality.
