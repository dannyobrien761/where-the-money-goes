# ADR-002 — Quantify uncertainty; do not use machine learning

*Status: Accepted · 5 October 2026*

## Context
A common expectation for data projects is that they include a machine-learning model. This project considered ML and rejected it for the core analysis. The effort goes into quantifying uncertainty instead.

## Decision 1 — No machine learning in the core model
**The model is set by rules, not learned from data.** MyFutureFund contributions follow from members, earnings, the €80,000 cap, the legislated rate schedule and the opt-out rules. There is nothing to learn: the relationship is written into the Automatic Enrolment Retirement Savings System Act 2024.

**There is too little data to learn from.** MyFutureFund has under a year of history. The Central Bank's quarterly pension fund series has a few dozen observations. A trained model on this would mostly fit noise and give a false sense of precision.

**The questions are what-ifs, not predictions.** Allocation and exposure ask what follows from stated assumptions. Their value is that every step can be traced. A black-box model works against that.

**The audience values explainability.** Pension administrators, trustees, consultants and regulators operate under governance and explainability requirements (IORP II, Central Bank expectations on model risk). Choosing the simplest method that answers the question is the appropriate standard for this audience.

## Decision 2 — Quantify uncertainty with transparent statistical methods
1. **Monte Carlo simulation of the fund.** Thousands of paths with random annual returns and random opt-out rates at each rate increase. Results are shown as a fan chart (10th / 50th / 90th percentiles) rather than three fixed scenarios. Seeded random numbers make every run reproducible.
2. **Sensitivity ranking (tornado chart).** Each assumption moved across its plausible range, one at a time, to show which drives the 2035 result most. The working hypothesis is that step-up opt-outs and wage growth matter more than investment returns at a 10-year horizon; the chart tests this rather than assumes it.
3. **UK auto-enrolment evidence for opt-out ranges.** The UK raised minimum contributions in April 2018 and April 2019 and the Department for Work and Pensions published opt-out and cessation rates around those increases. These set the plausible range for Irish step-up opt-outs. A range grounded in published evidence is more defensible than a fitted model with no Irish step-up history to fit.

## Consequences
- The Low / Central / High presets remain for quick comparison; the fan chart becomes the main view of uncertainty on the Flows page.
- Opt-out assumptions cite UK evidence and are marked unverified until checked against the DWP reports.
- The README carries a short "Why not machine learning?" section.
- Possible future ML use (not in scope): text-mining Oireachtas debates and parliamentary answers to track MyFutureFund figures and the policy debate over time. This would be a separate project.
