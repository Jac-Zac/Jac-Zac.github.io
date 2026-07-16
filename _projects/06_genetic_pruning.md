---
layout: page
title: Genetic Algorithms for Neural-Network Pruning
description: Evolving structured pruning masks for a FashionMNIST MLP while keeping its trained weights frozen
img: assets/img/ga_pruning.png
thumbnail_padded: true
importance: 3
category: ML
---

_Can evolutionary search remove most of a neural network without retraining it?_

This project studies that question on a `784 → 256 → 256 → 256 → 10` ReLU MLP trained on FashionMNIST.

<p class="mt-3">
  <a class="btn btn-primary" href="https://jac-zac.github.io/GA_Pruning/" target="_blank" rel="noopener noreferrer">
    <i class="fa-solid fa-chart-line"></i>&nbsp; Explore the interactive report
  </a>
  <a class="btn btn-outline-primary" href="https://github.com/Jac-Zac/GA_Pruning" target="_blank" rel="noopener noreferrer">
    <i class="fa-brands fa-github"></i>&nbsp; View the source code
  </a>
</p>

## Method

{% include figure.liquid path="assets/img/ga_pruning_steps.png" class="img-fluid rounded z-depth-1 my-3" alt="Training, pruning-mask representations, and genetic algorithm workflow" zoomable=true %}

The experiment follows four steps:

1. **Train and freeze one model.** AdamW trains the MLP for 10 epochs using a fixed
   30% validation split. The checkpoint with the lowest validation loss is retained.
2. **Encode a compact pruning mask.** Each chromosome contains one bit for each of
   the 768 hidden neurons. A zero disables that neuron and all connections that
   depend on it, so the result can be materialized as smaller dense layers.
3. **Evolve masks at an exact sparsity.** A population of 100 masks undergoes
   tournament selection, crossover, bit-flip mutation, exact-cardinality repair,
   and elitism. Every method receives the same **25,000 mask evaluations**.
4. **Separate selection from evaluation.** Full validation accuracy is the fitness
   function. The test set is used only once, after the best mask has been selected.
   Results aggregate five mask-search seeds and compare the GA with equal-budget
   hill climbing, random search, and neuron-magnitude pruning.

## Results

{% include figure.liquid path="assets/img/ga_pruning_accuracy.svg" class="img-fluid rounded z-depth-1 my-3" alt="Test accuracy of structured pruning methods across neuron sparsity levels" zoomable=true %}

At **85% neuron sparsity**, uniform-crossover GA retains **79.4 ± 3.0%** test
accuracy (with 88.92% beeing the original test accuracy for the dense model).
That is 8.9 percentage points above equal-budget hill climbing, 30.7 points above random search, and 52.2 points above per-layer magnitude pruning.
The gap grows as the pruning constraint becomes harder: at 90% sparsity, the GA retains 65.9% accuracy versus 53.8% for hill climbing.

{% include figure.liquid path="assets/img/ga_pruning_convergence.svg" class="img-fluid rounded z-depth-1 my-3" alt="Validation accuracy convergence of genetic algorithms, hill climbing, and random search at 85 percent neuron sparsity" zoomable=true %}

The convergence curves explain the final gap. At 85% sparsity, both crossover
variants keep improving throughout the search, while random search plateaus early
and hill climbing advances more slowly. Uniform crossover finishes slightly ahead of two-point crossover.
