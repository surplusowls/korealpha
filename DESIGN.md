---
version: alpha
name: Korealpha
description: Dark-first AI research desk for Korean prediction-market alpha.
colors:
  primary: "#F8FAFC"
  primary-foreground: "#07110F"
  secondary: "#14201D"
  secondary-foreground: "#E5EEF0"
  accent: "#0F766E"
  accent-foreground: "#ECFDF5"
  neutral: "#07110F"
  surface: "#0B1412"
  muted: "#101B18"
  muted-foreground: "#91A5A0"
  border: "#21312D"
  success: "#0F766E"
  warning: "#A16207"
  destructive: "#E5484D"
  chart-positive: "#0F766E"
  chart-negative: "#E5484D"
  chart-neutral: "#91A5A0"
typography:
  display:
    fontFamily: Geist Sans
    fontSize: 3.5rem
    fontWeight: 650
    lineHeight: 1
    letterSpacing: 0
  h1:
    fontFamily: Geist Sans
    fontSize: 2.25rem
    fontWeight: 650
    lineHeight: 1.1
    letterSpacing: 0
  h2:
    fontFamily: Geist Sans
    fontSize: 1.5rem
    fontWeight: 620
    lineHeight: 1.2
    letterSpacing: 0
  body:
    fontFamily: Geist Sans
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  label:
    fontFamily: Geist Sans
    fontSize: 0.8125rem
    fontWeight: 550
    lineHeight: 1.2
    letterSpacing: 0
  mono:
    fontFamily: Geist Mono
    fontSize: 0.875rem
    fontWeight: 450
    lineHeight: 1.45
    letterSpacing: 0
rounded:
  sm: 4px
  md: 8px
  lg: 10px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.md}"
    height: 40px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    rounded: "{rounded.md}"
    height: 40px
  button-accent:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.md}"
    height: 40px
  landing-hero:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.primary}"
  dashboard-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
  table-row:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
  table-border:
    backgroundColor: "{colors.border}"
    textColor: "{colors.primary}"
  receipt:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
  receipt-muted:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.muted-foreground}"
  badge-positive:
    backgroundColor: "{colors.success}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.sm}"
  badge-warning:
    backgroundColor: "{colors.warning}"
    textColor: "{colors.accent-foreground}"
    rounded: "{rounded.sm}"
  badge-negative:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.sm}"
  chart-positive-bar:
    backgroundColor: "{colors.chart-positive}"
    textColor: "{colors.accent-foreground}"
  chart-negative-bar:
    backgroundColor: "{colors.chart-negative}"
    textColor: "{colors.primary-foreground}"
  chart-neutral-bar:
    backgroundColor: "{colors.chart-neutral}"
    textColor: "{colors.primary-foreground}"
---

## Overview

Korealpha is a dark-first AI research desk for prediction markets. It converts
Korean local information into market intelligence, then shows the agent's
reasoning, decision receipt, and Arc Testnet paper-trade commitment.

The product should feel like a commercial research terminal plus a working
market-intelligence application. It should not feel like a political campaign,
news magazine, crypto meme site, cyberpunk demo, or generic purple AI SaaS
template.

## Colors

Use a dark graphite base with a restrained blue-green accent. The dark surface
should feel category-native for prediction markets and Web3 proof, while the
accent marks Korean alpha, positive edge, live agent decisions, and Arc/USDC
proof.

- **Primary:** light foreground for headings, primary actions, and strongest UI
  emphasis on dark surfaces.
- **Neutral and surface:** dark graphite backgrounds for landing and app
  sections.
- **Muted:** low-emphasis dashboard surfaces, helper text, and receipt blocks.
- **Accent:** use sparingly for active states, positive edge, proof, and key
  calls to action.
- **Warning/destructive:** use only for risk, negative edge, failed transfers,
  or explicit caution states.

Do not introduce broad color palettes per page. Do not use dominant purple,
cyberpunk, glassmorphism, meme-coin neon, political party colors, or campaign
branding.

## Typography

Use Geist Sans for product UI and Geist Mono for transaction hashes, receipt
IDs, wallet addresses, structured scores, and compact market metadata.

Headings should be direct and product-like. Avoid oversized expressive type
inside dashboard panels. Use display-scale type only in the landing hero.

## Layout

The product has two surfaces:

1. `/` is the landing page. It explains the product and routes users to the live
   Seoul mayoral demo.
2. `/markets/seoul-mayor-2026` is the working app surface. It shows market
   intelligence, evidence, agent reasoning, action, and Arc transaction proof.

Landing layout should follow commercial SaaS/Web3 structure: nav, hero with a
product dashboard mockup, proof strip, problem, workflow, capabilities,
source-backed evidence, agentic proof, risk FAQ, final CTA, and footer.

App layout should be dense, scannable, and operational. Prioritize probability,
edge, confidence, evidence, decision receipt, and transaction state over
decorative composition.

## Elevation & Depth

Prefer borders and subtle surface contrast over heavy shadows. Use shadows only
when they clarify hierarchy, such as floating nav or modal surfaces. Avoid
layered glass panels, decorative blur effects, gradient blobs, and visual noise
that competes with the product dashboard.

## Shapes

Use moderate radius. Cards and buttons should feel precise and professional, not
pillowy. Default card radius should stay at or under 8px unless inherited from
the shadcn token system.

## Components

Use shadcn/ui components before custom markup. Compose with existing primitives:

- `Button` or `buttonVariants` for actions and links.
- `Card` for repeated items, receipts, and framed tools.
- `Badge` for status, action, confidence, and market labels.
- `Table` for evidence and market rows.
- `Tabs` for mode or view switches.
- `Separator` instead of custom borders where appropriate.
- `Skeleton` for loading states.
- `Tooltip` for compact icon controls.

Use lucide-react icons inside buttons and compact controls. Icons in buttons must
use the local shadcn convention with `data-icon`.

Do not nest cards inside cards. Do not build custom badge/button/table lookalikes
when a shadcn component exists.

## Do's and Don'ts

Do:

- Make the landing page feel like a product a judge can understand in 30
  seconds.
- Keep the live demo CTA visible and concrete.
- Show agentic proof: action, sizing, decision receipt, Arc Testnet transfer.
- Use real Korealpha content instead of placeholder marketing copy.
- Keep landing and app pages visually related.
- Preserve readability on mobile and desktop.
- Use backend-ready seed data so API wiring can replace fixtures without a
  layout redesign.
- Review community UI libraries before installing them; produce a shortlist and
  get approval before adding registry components.

Don't:

- Build an oversized marketing hero that hides the actual demo.
- Make the app feel like a landing page.
- Add unsupported prediction certainty or gambling language.
- Use political campaign visuals or candidate branding.
- Add decorative gradients, orbs, blobs, bokeh, or stock-like abstract imagery.
- Introduce raw Tailwind color utilities when semantic tokens will work.
- Install Tailark, React Bits, Magic UI, Kokonut UI, or similar components
  without reviewing registry output, dependency weight, license, accessibility,
  and base-ui compatibility.
