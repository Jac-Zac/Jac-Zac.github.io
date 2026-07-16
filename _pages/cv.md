---
layout: page
permalink: /cv/
title: CV
nav: true
nav_order: 4
description: Curriculum vitae of Jacopo Zacchigna, covering research, education, publications, technical skills, and professional experience.
---

{% assign cv_pdf = "/assets/pdf/CV.pdf" | relative_url %}

<p class="mt-3">
  <a class="btn btn-primary" href="{{ cv_pdf }}" target="_blank" rel="noopener noreferrer">
    <i class="fa-solid fa-file-pdf"></i>&nbsp; Download PDF
  </a>
</p>

<object data="{{ cv_pdf }}" type="application/pdf" width="100%" height="900px" style="border: 1px solid var(--global-divider-color); border-radius: 4px;">
  <p>Your browser can't display the embedded PDF. <a href="{{ cv_pdf }}">Download it instead</a>.</p>
</object>
