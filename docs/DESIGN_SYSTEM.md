# Korealpha Design System

Last updated: 2026-05-17

## Decision

Korealpha uses a product landing plus working demo app structure:

- `/` is a credible SaaS-style landing page.
- `/markets/seoul-mayor-2026` is the live market-intelligence demo.

The design direction is:

> Credible AI Market Intelligence SaaS.

The goal is not to invent a custom visual identity from scratch. The goal is to
ship a product-quality surface using Tailwind CSS, shadcn/ui, and a stable token
system so AI agents do not drift across pages.

## Why This Direction

Agora Agents Hackathon asks for a live working product, public GitHub repo, and
traction-oriented answers. Judges weigh agency, traction, Circle usage, and
innovation. Korealpha therefore needs both:

- a landing page that explains the product quickly
- a working demo that proves the agent can reason and act

Similar agent and prediction-market hackathon projects commonly present a
polished landing surface plus a usable app or terminal. For a small team, using
existing shadcn/Tailwind patterns is higher leverage than custom art direction.

## Source Of Truth

- Requirements: `docs/brainstorms/design-system-requirements.md`
- Agent-readable visual contract: `DESIGN.md`
- Frontend rules: `.agents/rules/frontend.md`
- Design workflow skill: `.agents/skills/korealpha-design/SKILL.md`

Frontend work should read these before changing layout, colors, typography, or
component composition.

## Page Model

### Landing Page

Route: `/`

Purpose: explain Korealpha and route judges/users into the working demo.

Required sections:

1. Navigation with product name and demo CTA.
2. Hero with `Read Korea before the market does.`
3. Problem section for Korean local-information asymmetry.
4. How-it-works section:
   - collect evidence
   - score credibility and impact
   - estimate probability
   - compare market price
   - commit paper trade on Arc Testnet
5. Live demo preview for the Seoul mayoral market.
6. Agentic proof section with receipt and Arc transfer.
7. Traction metrics.
8. Footer with GitHub/demo/docs links when available.

### Demo App

Primary route: `/markets/seoul-mayor-2026`

Purpose: show the working market-intelligence surface.

Required areas:

- market probability vs korealpha probability
- edge, confidence, action, and suggested exposure
- evidence table
- agent analysis panel
- decision receipt
- Arc Testnet transaction status
- paper-trade and traction metrics where available

## Visual Rules

- Use shadcn/ui components before custom markup.
- Use semantic tokens, not raw color utilities.
- Keep `base-nova` as the shadcn base style.
- Use a neutral graphite surface system with one restrained blue-green accent.
- Keep card radius moderate, generally 8px or less.
- Use borders and subtle contrast instead of heavy shadows.
- Keep landing and app pages visually related.
- Keep dashboards dense and scannable.

Avoid:

- political campaign visuals
- news-magazine styling
- crypto meme or cyberpunk styling
- generic purple AI SaaS gradients
- decorative blobs, bokeh, and glassmorphism
- nested cards
- placeholder marketing copy

## Component Rules

- Links styled as buttons should use `buttonVariants`.
- Use `Button`, `Card`, `Badge`, `Table`, `Tabs`, `Separator`, `Skeleton`, and
  `Tooltip` from shadcn when applicable.
- Use lucide-react icons for compact controls.
- Icons in buttons must use `data-icon`.
- Do not recreate badges, buttons, tables, or status chips with raw `div`/`span`
  styling when a shadcn component fits.

## Verification

For UI changes, run the relevant checks:

```bash
pnpm design:lint
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e
```

When practical, verify both desktop and mobile layouts in a browser. Check that:

- the landing CTA reaches the demo
- text does not overflow
- cards and tables remain scannable
- Arc/receipt proof is visible
- the page does not visually drift from `DESIGN.md`
