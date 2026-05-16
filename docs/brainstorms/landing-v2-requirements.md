---
title: Landing V2 Commercial Redesign Requirements
created: 2026-05-17
status: draft
---

# Landing V2 Commercial Redesign Requirements

## Problem Frame

The current Korealpha landing page is functional but too thin. It explains the
demo, but it does not yet feel like a commercial AI/Web3 market-intelligence
product. The design reads as a small project because it lacks a strong product
visual, a dark-first market-intelligence tone, enough proof sections, and a
clear landing-page composition.

The next frontend pass should rebuild the landing and demo surfaces around a
stronger product presentation instead of incrementally editing the existing
layout.

## Product Direction

Korealpha should present as:

> AI research desk for prediction markets.

The product's core promise is Korean local-information alpha for prediction
markets. Web3 and Arc Testnet are proof/action layers, not the whole product
identity.

## Decisions

- Use a dark-first visual direction. Do not add a light/dark toggle for this
  pass.
- Keep shadcn/ui and Tailwind CSS as the primary implementation surface.
- Research shadcn-compatible block/component libraries before planning exact
  additions.
- Use Magic UI, shadcn-compatible registries, or motion components only where
  they materially improve commercial polish.
- Rebuild `/` and `/markets/seoul-mayor-2026` together so they feel like the
  same product.
- Do not implement backend logic, live agent execution, or real transaction
  flows in this pass.
- Keep frontend data structures realistic enough that backend/API wiring can
  replace seed data without redesigning the page.

## Scope

### In Scope

- Full redesign of `/` as a dark-first commercial landing page.
- Full redesign of `/markets/seoul-mayor-2026` as the matching research-desk
  demo surface.
- A new hero centered on a product dashboard mockup.
- Section architecture that feels like a real SaaS/Web3 product, not a short
  explanation page.
- Source-backed snapshot evidence for a small number of prominent evidence
  items.
- Seeded market, evidence, agent, receipt, and Arc transaction data shaped for
  later backend replacement.
- Updates to `DESIGN.md`, `docs/DESIGN_SYSTEM.md`, and project frontend rules
  if required to align the harness with the new dark-first direction.

### Out Of Scope

- Real Polymarket trading.
- Mainnet transactions.
- Real Arc signing from AI output.
- Backend/API/database implementation.
- Multi-market product expansion beyond the Seoul mayoral demo.
- Political campaign styling or candidate branding.
- A light/dark theme switch.

## Required Page Model

### Landing Page

The landing page should include:

1. Navigation with Korealpha identity and demo CTA.
2. Dark-first hero with the headline `Read Korea before the market does.`
3. Product dashboard mockup showing market probability, Korealpha probability,
   edge, evidence, decision receipt, and Arc Testnet proof.
4. Trust or proof strip using concrete demo metrics, source counts, report
   counts, or hackathon proof points.
5. Problem section explaining Korean local-information asymmetry.
6. Workflow section showing evidence collection, scoring, probability estimate,
   market comparison, and testnet action.
7. Feature or capability grid for the research desk.
8. Agentic proof section showing decision receipt and Arc Testnet paper-trade
   escrow.
9. Source-backed evidence snapshot section.
10. FAQ or risk-control section clarifying paper trading, testnet-only action,
    and prediction uncertainty.
11. Final CTA into the Seoul mayoral demo.

### Demo Page

The demo page should feel like the product behind the landing mockup. It should
include:

- Market identity and current market state.
- Market probability vs Korealpha probability.
- Edge, confidence, recommended action, and suggested paper exposure.
- Evidence stream/table with credibility and impact scores.
- Agent analysis panel.
- Decision receipt.
- Arc Testnet transaction state.
- Clear indicators that the transaction is paper/testnet only.

## Data Requirements

Use a hybrid data approach:

- Keep core market/action/receipt/Arc structures as typed seed data.
- Use actual public sources for a small number of prominent evidence items.
- Preserve fields that later backend logic will need: source, timestamp,
  credibility, impact, polarity, probability contribution, receipt id,
  action, amount, chain id, tx hash, and status.
- Avoid placeholder marketing copy where domain data should appear.

The frontend should be able to render the same layout when seed data is replaced
with backend/API responses.

## External Research Findings

### Landing Structure

Reference landing templates consistently use more than a hero plus a short
feature list. Strong examples layer hero, logos/proof, features, workflow,
testimonials or credibility, pricing/CTA, FAQ, and footer.

Useful references:

- `https://github.com/leoMirandaa/shadcn-landing-page`
- `https://github.com/akash3444/shadcn-ui-landing-page`
- `https://github.com/shadcnblocks/mainline-nextjs-template`
- `https://github.com/GetNextjsTemplates/Crypgo-nextjs-tailwind`
- `https://github.com/web3templates/nextly-template`

### Component And Block Libraries

Primary candidates to evaluate in planning:

- shadcn/ui official components and registry patterns.
- Tailark for shadcn-native marketing block structure, especially dark landing
  kits, hero sections, features, stats, FAQ, integrations, and CTA sections.
- React Bits for high-impact animated React components, especially text,
  counters, logo/source loops, product-card motion, and selected backgrounds.
- Magic UI for limited visual effects such as background grid, marquee, number
  ticker, and subtle motion.
- shadcnblocks / Mainline-style block architecture as a general reference for
  route-level section composition.
- Kokonut UI for individual AI/search/card interaction ideas, not as the
  primary landing-page system.
- Aceternity UI only if a specific component solves a visible section need
  better than Tailark/React Bits/Magic UI.
- Origin UI / coss UI is relevant because it is Base UI oriented, but its
  repository has mixed licensing and should not be copied broadly without
  per-file license review.

Magic UI is especially relevant because it follows the shadcn registry install
model and can copy source into the project through the shadcn CLI.

React Bits is also relevant in 2026 because the public project provides 110+
animated components, shadcn and jsrepo install paths, TypeScript + Tailwind
variants, and strong community traction. The free project uses MIT + Commons
Clause, so using components inside the Korealpha application appears aligned,
but redistributing the components as a component bundle is not allowed.

Tailark is relevant because it focuses directly on shadcn marketing blocks
rather than isolated visual effects. Its Dusk kit is a closer match for a
dark-first commercial landing page than generic SaaS templates.

Do not treat popularity as approval to install blindly. Every registry item
must still be inspected for dependency weight, license, raw styling, client
component boundaries, accessibility, and compatibility with the project's
base-ui shadcn setup.

### Seoul Mayoral Snapshot Sources

Prominent source-backed evidence can draw from:

- Polymarket event page for `2026 Seoul Mayoral Election Winner`.
- April 2026 reporting that Oh Se-hoon was nominated as the People Power Party
  Seoul mayor candidate.
- April and May 2026 Seoul mayoral polling articles showing the Oh Se-hoon vs
  Chong Won-o race and shifting margins.
- Public reporting on campaign issues such as housing, incumbency, and Seoul
  city projects.

These sources should be treated as evidence inputs, not as claims of certainty.

## Success Criteria

- The landing reads as a commercial AI/Web3 research product within the first
  viewport.
- The product dashboard mockup is the first visual anchor, not decorative art.
- The demo page matches the landing's dark-first product identity.
- The page contains enough sections and proof layers to avoid a toy-project
  impression.
- Existing Korealpha product constraints remain visible: evidence, probability,
  edge, receipt, and Arc Testnet paper action.
- Backend wiring can replace seed data without redesigning the page.
- `DESIGN.md` and related harness docs align with the new direction.
- Browser QA covers desktop and mobile for landing and demo pages.

## Open Questions For Planning

- Which shadcn-compatible library components should be added after compatibility
  and maintenance review?
- Should the dark-first theme be global, or should only the landing and demo
  routes opt into the dark surface?
- Which exact source-backed evidence items should be locked into seed data?
- Should the redesigned demo page share the same data module as the landing
  dashboard mockup, or should the landing use a smaller derived view model?
