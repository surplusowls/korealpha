---
name: korealpha-design
description: Use before frontend design, landing page, dashboard, market detail, component, styling, Tailwind, or shadcn/ui work in Korealpha. Keeps AI-generated UI aligned with DESIGN.md and the product landing plus live demo direction.
---

# Korealpha Design Workflow

Use this skill before changing Korealpha frontend UI, including landing pages,
dashboard views, market detail pages, evidence tables, decision receipts,
metrics, styling, Tailwind classes, or shadcn/ui components.

## Required Reading

Read these files before editing UI:

1. `DESIGN.md`
2. `docs/DESIGN_SYSTEM.md`
3. `docs/brainstorms/design-system-requirements.md`
4. `.agents/rules/frontend.md`

If product behavior changes, also read `docs/PRD.md`.

## Product Shape

Korealpha is a dark-first AI research desk for prediction markets.

- `/` is the landing page.
- `/markets/seoul-mayor-2026` is the working live demo.

The landing explains the product in about 30 seconds and routes users into the
demo. The app shows agent reasoning, market edge, decision receipt, and Arc
Testnet action.

## Design Direction

Follow this direction:

> Dark-first AI research desk for prediction markets.

Use production-ready shadcn/Tailwind patterns and reviewed community components
instead of inventing a new visual style. The interface should feel like a real
product a judge could use today.

## Hard Rules

- Use shadcn/ui components before custom markup.
- Use semantic tokens such as `bg-background`, `text-foreground`,
  `text-muted-foreground`, `border-border`, `bg-primary`, and `bg-muted`.
- Do not introduce broad raw Tailwind color palettes.
- Keep `base-nova` as the base style unless explicitly asked to migrate.
- Use lucide-react icons for controls.
- Icons inside buttons or button-like links must use `data-icon`.
- Do not nest cards inside cards.
- Do not use political campaign visuals, crypto meme styling, cyberpunk styling,
  generic purple AI gradients, decorative blobs, bokeh, or glassmorphism.
- Do not make the app page feel like a marketing page.
- Do not use placeholder copy where Korealpha product content exists.
- Do not install Tailark, React Bits, Magic UI, Kokonut UI, or other registry
  components until a shortlist has been reviewed and approved.

## Landing Checklist

When editing `/`, preserve or create:

- product name and demo CTA
- `Read Korea before the market does.`
- Korean local-information alpha thesis
- product dashboard mockup as the primary visual
- problem section
- how-it-works sequence
- Seoul mayoral live demo preview
- source-backed evidence snapshot
- agentic proof with receipt and Arc transfer
- risk FAQ or risk-control section
- traction/proof metrics
- footer links when available

## Demo App Checklist

When editing `/markets/seoul-mayor-2026`, preserve or create:

- market probability vs korealpha probability
- edge, confidence, action, and exposure
- evidence table
- agent analysis panel
- decision receipt
- Arc Testnet transaction state
- paper-trade or traction metrics where available

## Workflow

1. Identify whether the change affects landing, app, shared components, theme
   tokens, or all of them.
2. Read the required files above.
3. Reuse existing components and shadcn primitives.
4. Keep layout and copy aligned with the page model in `docs/DESIGN_SYSTEM.md`.
5. Verify with relevant commands.
6. For UI changes, inspect the result in a browser when practical.

## Verification

Run checks proportional to the change. For meaningful UI work, prefer:

```bash
pnpm design:lint
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm e2e
```

Browser verification should include desktop and mobile when practical. Confirm
that text fits, CTAs work, and the landing and app still feel like the same
product.
