# Where the Money Goes

How much money will Ireland's auto-enrolment scheme, MyFutureFund, push into the investment system, where could it be invested, and how much of it ends up exposed to the Irish economy?

## The three questions
1. **Flows** — How much will auto-enrolment add each year as contribution rates rise from 3.5% to 14% of pay by 2035, and how big does the fund become?
2. **Allocation** — Under stated what-if allocations, which asset classes receive the money?
3. **Exposure** — Irish-domiciled is not Irish-invested: how much reaches the Irish economy versus global markets?

## Findings
*(In progress.)*

## Design decisions

### Why not machine learning?
I considered machine learning and decided against it for the core model.

- **The model is set by rules, not learned from data.** Contributions follow from members, earnings, the €80,000 cap, the legislated rate schedule and the opt-out rules. There is nothing to learn: the relationship is written into legislation.
- **There is too little data.** MyFutureFund has under a year of history and the Central Bank's quarterly pension series has a few dozen data points. A trained model would mostly fit noise.
- **The questions are what-ifs.** The allocation and exposure analysis asks what follows from stated assumptions. Its value is that every step can be traced, which a black-box model works against.
- **The audience values explainability.** Pension administrators, trustees and regulators work under governance and model-risk requirements. Choosing the simplest method that answers the question is part of the analysis.

### What I did instead: quantify uncertainty
- **Monte Carlo simulation.** Thousands of paths with random investment returns and random opt-out rates at each contribution increase. The fund in 2035 and 2045 is shown as a fan chart with 10th, 50th and 90th percentiles, not a single number.
- **Sensitivity ranking.** A tornado chart shows which assumption moves the 2035 result most. It tests whether opt-outs at the rate increases and wage growth matter more than investment returns over a 10-year horizon.
- **UK evidence.** The UK raised its minimum contributions in 2018 and 2019 and published opt-out rates around those increases. Those figures set the plausible range for Ireland's own step-ups in 2029, 2032 and 2035.

Full reasoning: [`docs/adr-002-uncertainty-not-ml.md`](docs/adr-002-uncertainty-not-ml.md).

## Data sources
*(In progress.)*

## Limitations
*(In progress.)*

## How it was built
Design decisions are recorded as architecture decision records in [`docs/`](docs/). The projection engines are pure, unit-tested TypeScript; the data pipeline is Python and keeps every raw download with its source and retrieval date.

## Running locally
*(In progress.)*
