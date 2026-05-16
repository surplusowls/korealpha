# Korealpha Design System Requirements

Created: 2026-05-17
Status: active
Workflow: ce-brainstorm

## Problem Frame

Korealpha needs to look like a credible, usable product before deeper MVP
features are built. The current project already has a working Next.js scaffold,
but AI-generated frontend work can drift quickly: inconsistent colors, generic
AI gradients, decorative sections, oversized cards, and app pages that no longer
feel related to the landing page.

The hackathon context makes presentation quality important. Agora Agents
Hackathon submissions require a live working product and public GitHub repo, and
ask traction-oriented questions. Judging weighs agency and traction heavily, so
the first screen must help judges understand the product quickly and enter the
working demo.

## Target Outcome

Korealpha should present as a credible AI market-intelligence SaaS product with
a live demo-first landing page.

The landing should explain the product in about 30 seconds, then route judges
into the Seoul mayoral prediction-market demo where the agent reasoning,
decision receipt, and Arc Testnet action are visible.

## Primary Audience

- Hackathon judges evaluating agency, traction, Circle/Arc usage, and product
  clarity.
- Early crypto and prediction-market users deciding whether the product is worth
  trying.
- Team members and AI coding agents implementing future frontend work.

## Design Direction

Use a production-ready SaaS and analytics-dashboard style rather than inventing
a custom visual concept from scratch.

Chosen framing:

> Credible AI Market Intelligence SaaS.

This means:

- The first impression should feel like a real startup product, not a raw demo.
- The interface should stay useful and information-dense.
- The visual system should be powered by Tailwind CSS and shadcn/ui tokens.
- The product should avoid crypto-meme, political campaign, generic AI app, and
  news-magazine aesthetics.

## Required Product Surface

### Landing Page

Route: `/`

The landing page must include:

- Hero with product name, concise value proposition, and demo CTA.
- One-sentence explanation of the Korean local-information alpha thesis.
- Problem section explaining why global prediction-market users miss Korean
  local signals.
- How-it-works section:
  1. collect Korean evidence
  2. score credibility and impact
  3. estimate independent probability
  4. compare against market price
  5. commit paper-trade action on Arc Testnet
- Live demo preview for the Seoul mayoral market.
- Agentic proof section showing AI-decided action, sizing, receipt, and Arc
  Testnet transfer.
- Traction metrics section for reports, paper trades, testnet USDC volume, and
  feedback.
- Footer links to GitHub, demo, and docs when available.

### Demo App

Primary route: `/markets/seoul-mayor-2026`

The demo app must keep the current market-intelligence surface:

- Market probability vs korealpha probability.
- Edge, confidence, action, and suggested exposure.
- Korean evidence table.
- Agent analysis panel.
- Decision receipt.
- Arc Testnet transaction status.
- Paper-trade or traction metrics where available.

## Scope Boundaries

### In Scope

- A consistent landing and app visual system.
- shadcn/ui components, blocks, and Tailwind CSS variables.
- A project `DESIGN.md` file that AI agents can use as the frontend design
  contract.
- A `korealpha-design` skill that instructs Codex and Claude to follow the
  design contract before UI changes.
- Lightweight documentation explaining the design direction to teammates.

### Deferred for Later

- Full custom brand identity.
- Custom illustration system.
- shadcn registry publishing.
- Screenshot diff automation.
- Figma design system.
- Multiple marketing pages beyond the landing page.

### Out of Scope

- Political campaign visual language.
- Real-money trading UX.
- Mainnet transaction UX.
- Decorative AI gradients, glassmorphism, cyberpunk, or meme-coin styling.
- Separate visual styles for landing and app.

## Design System Rules

- Use shadcn/ui components before custom markup.
- Use semantic color tokens such as `bg-background`, `text-foreground`,
  `text-muted-foreground`, `border-border`, `bg-primary`, and `bg-muted`.
- Avoid raw color utility classes except for rare data visualization cases where
  semantic tokens are insufficient.
- Keep `base-nova` as the shadcn base style unless the team explicitly decides
  to migrate.
- Prefer neutral graphite surfaces with one restrained blue-green accent family.
- Keep border radius moderate; default cards should not exceed 8px radius unless
  inherited from shadcn tokens.
- Use cards for repeated items, receipts, and framed tools. Do not nest cards.
- Keep dashboards dense and scannable.
- Use real product content, not placeholder marketing copy.
- Use lucide-react icons inside buttons and compact controls.
- Ensure landing and app routes feel like the same product.

## Acceptance Criteria

- A judge opening `/` can understand what Korealpha does and reach the live demo
  quickly.
- The landing communicates the Korean-information advantage, agent reasoning,
  and Arc Testnet proof without requiring a pitch deck.
- The app page remains a usable market-intelligence dashboard, not a marketing
  page.
- Future AI frontend work has a single design contract to follow.
- The repository contains project-local instructions so teammates do not need
  global setup to follow the design system.

## Source Notes

- Agora Agents Hackathon emphasizes live working products, real users, real
  decisions, Circle/Arc usage, and traction.
- Similar agent hackathon projects often present both a polished landing surface
  and a usable app/demo surface.
- shadcn/ui Blocks and ecosystem templates show that production-ready landing
  and dashboard composition should be built from existing Tailwind/shadcn
  patterns instead of bespoke visual invention.
