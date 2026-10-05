# ADR-001 — Architecture

*Framework Step 2 · Status: Accepted · 4 October 2026*

## Context
A public, read-only research app. A small number of datasets updated quarterly, a projection model with a handful of sliders, and around 15 charts. No users, no writes except optional shared scenarios (Phase 2).

## Decisions

### 1. Platform: web only
Read on desktop by recruiters and interviewers. Basic responsiveness is enough.

### 2. Stack (locked)
```
Frontend:   Next.js (App Router), TypeScript strict, Tailwind CSS, shadcn/ui
Data:       Supabase (PostgreSQL) — read-only via RLS for the app
ETL:        Python 3.11+ (pandas, openpyxl, requests) in /pipeline
Charts:     Recharts (including Sankey)
Tests:      Vitest
Hosting:    Vercel
```
Use the latest stable Next.js at scaffold time and record the exact versions in the table below after Prompt 01. Do not upgrade major versions during Phase 1.

### 3. The model runs client-side as pure TypeScript
The engines are small and deterministic. Running them in the browser makes sliders respond instantly, removes server cost, and keeps the model unit-testable in isolation. Supabase supplies inputs only.

### 4. ETL is offline and separate
Python loads source data into Supabase. It never runs during a page request. Raw downloads are kept with date stamps so every number can be traced to a file.

### 5. Provenance is built into the schema
Every data row links to a `sources` row. Every model assumption carries source, date and verified status. This is a product requirement, not just good practice: traceability is what makes the analysis credible.

### 6. Static fallback
The pipeline also writes `/public/snapshot.json`. If Supabase is unavailable, the app renders from the snapshot. A paused free-tier database must never break the site during an interview.

### 7. Rejected alternatives
| Option | Why rejected |
|---|---|
| Streamlit / Dash | Doesn't deploy to Vercel; looks like a notebook, not a product |
| Model as Postgres functions | Harder to test; every slider move becomes a network round trip |
| Second chart library (D3, ECharts) | Recharts covers every chart needed, including Sankey |
| Supabase Auth | No user accounts in scope |

## Locked versions (fill in after Prompt 01)
| Package | Version |
|---|---|
| next | |
| react | |
| recharts | |
| @supabase/supabase-js | |
| vitest | |
| python | |
