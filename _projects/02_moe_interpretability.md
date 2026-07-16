---
layout: page
title: MoE Interpretability
description: Reading MoE experts with sparse vocabulary directions and testing when specialization is real
img: assets/img/moe_evr_heatmap.png
thumbnail_padded: true
importance: 2
category: Mechanistic Interpretability
---

_Do Mixture-of-Experts models really divide computation into clean, interpretable
specialists?_

This project studies that question in
`allenai/OLMoE-1B-7B-0924-Instruct` and `openai/gpt-oss-20b`. Its main
contribution is **Expert Pursuit**, a method that turns expert activations into
sparse, readable token summaries. A smaller causal study then checks whether
those apparent specializations actually influence generation.

<p class="mt-3">
  <a class="btn btn-primary" href="https://canva.link/6w5ug5hf2pqogjh" target="_blank" rel="noopener noreferrer">
    <i class="fa-solid fa-display"></i>&nbsp; View the presentation
  </a>
</p>

## Expert Pursuit

I adapted
**[HeadPursuit](https://github.com/lorenzobasile/HeadPursuit)** from attention
heads to MoE feed-forward experts. The pipeline captures each expert's gated
output across many prompts and runs **Simultaneous Orthogonal Matching Pursuit
(SOMP)** against the model's normalized unembedding dictionary. The selected
token directions form a sparse, readable summary of how that expert's output
varies; explained variance ratio (EVR) measures how much of the variation the
summary captures.

{% include figure.liquid path="assets/img/moe_evr_heatmap.png" class="img-fluid rounded z-depth-1 my-3" alt="Expert Pursuit explained variance across GPT-OSS layers and experts" zoomable=true %}

The heatmap shows the final EVR of every GPT-OSS layer–expert pair. The same
analysis covers all $16 \times 64$ OLMoE experts. On the Pile-10k extraction,
the median 25-atom EVR is about **0.042** for both models: a small vocabulary
basis captures only a limited part of a typical expert's output variance.

### What does an interpretable expert look like?

The aggregate EVR distribution is only half the story. The token lists make the
method concrete: below are representative OLMoE experts found by unrestricted
SOMP on 10,000 TriviaQA questions. Subword fragments are omitted for
readability.

| Expert  | Candidate specialization | Representative top SOMP atoms                                  | EVR@25 |
| ------- | ------------------------ | -------------------------------------------------------------- | -----: |
| L15 E03 | Numbers and dates        | `35`, `66`, `2004`, `150`, `17`, `four`, `twenty`, `123`, `91` |  0.256 |
| L14 E37 | Numbers and dates        | `1997`, `16`, `1970`, `26`, `June`, `11`, `19`, `1930`         |  0.104 |
| L15 E49 | Geography                | `Japanese`, `American`, `Europe`, `Ukrainian`, `British`       |  0.127 |
| L15 E16 | Names                    | `Ryan`, `Richard`, `Robert`, `Daniel`, `Garcia`, `James`       |  0.073 |
| L15 E38 | Biology                  | `human`, `chemical`, `plant`, `metabolism`, `food`, `blood`    |  0.076 |
| L15 E59 | Entertainment            | `comic`, `music`, `debut`, `screen`, `thriller`, `play`        |  0.071 |

These readable examples cluster in later layers, although the final
unembedding is also a better-calibrated readout there. High EVR does not
automatically mean a clean concept: the highest-EVR early expert mixes unrelated
atoms such as `this`, `Kindle`, `Sutton`, and `History`. Expert Pursuit should
therefore be read as a sparse summary, not as proof that every expert has one
meaning.

### A targeted query recovers the same specialists

Restricting the pursuit dictionary to number words independently recovers L15
E03 and L14 E37 near the top, even on a different stored extraction. Their
unrestricted lists above are already dominated by numerals and dates. This is
useful convergent evidence that the specialization is not just a hand-picked
token list.

| Expert  | Top atoms from the numbers-only query | EVR@10 |
| ------- | ------------------------------------- | -----: |
| L15 E03 | `10`, `6`, `100`, `9`, `2`            |  0.041 |
| L14 E37 | `7`, `3`, `five`, `10`, `4`           |  0.023 |

### Why use SOMP instead of a logit lens?

The ordinary logit lens reads one direction derived from an expert's mean
output. SOMP instead selects several vocabulary directions that explain how its
centered outputs vary across inputs.

| Readout                    |  EVR@1 |  EVR@3 | EVR@10 |
| -------------------------- | -----: | -----: | -----: |
| Logit lens (one direction) | 0.0010 |      — |      — |
| SOMP sparse basis          | 0.0020 | 0.0056 | 0.0146 |

Across all 1,024 OLMoE experts, the first SOMP atom captures about **2×** the
variance of the lens direction; ten atoms capture about **14×** as much. The
absolute EVR nevertheless remains below 2%, reinforcing the main conclusion:
some specialists are clear, but most expert outputs are only weakly aligned
with a small set of vocabulary directions.

## Causal follow-up

The final stage asks whether readable associations also control generation.
Gate attribution patching produces the maps below: countries concentrate in a
few late-layer experts, numbers are more distributed, and the offensive-word
proxy has no strong sparse handle.

{% include figure.liquid path="assets/img/moe_atp_concepts.png" class="img-fluid rounded z-depth-1 my-3" alt="Gate attribution maps for countries, numbers, and an offensive-word concept" zoomable=true %}

This follow-up is intentionally secondary: **Expert Pursuit generates readable
hypotheses; causal gate interventions test which of those hypotheses actually
change model behavior.**

_Repository currently private. Available on request._
