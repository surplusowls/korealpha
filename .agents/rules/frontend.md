# korealpha Frontend Rules

Use these rules for dashboard, market detail, evidence, receipt, and portfolio UI work.

## Product Shape

- Build a dark-first commercial landing page at `/` that presents Korealpha as
  an AI research desk and routes users into the live demo.
- Build a serious market-intelligence dashboard, not a marketing landing page.
- Prioritize dense, scannable information over decorative composition.
- Keep the first demo focused on the Seoul mayoral market.
- Do not add unsupported claims about prediction certainty.

## UI Stack

- Use Next.js App Router.
- Use TypeScript.
- Use Tailwind CSS.
- Use shadcn/ui components where they fit.
- Use lucide-react icons for buttons and compact controls.
- Follow `DESIGN.md` and `docs/DESIGN_SYSTEM.md` before changing visual
  direction, theme tokens, page layout, or component composition.
- Before installing community components from Tailark, React Bits, Magic UI,
  Kokonut UI, or similar libraries, produce a shortlist with registry output,
  dependency impact, license notes, accessibility/style concerns, and approval.

## Layout Rules

- Keep cards for individual repeated items, receipts, modals, and framed tools.
- Do not nest cards inside cards.
- Use product dashboard mockups as hero visuals when building the landing page.
- Avoid oversized hero sections that hide the actual product.
- Ensure text fits on mobile and desktop.
- Use stable dimensions for tables, toolbars, metric tiles, and receipt blocks.

## Required MVP Views

- Dark-first commercial landing page
- Market dashboard
- Seoul mayoral market detail
- Evidence table
- Agent analysis panel
- Decision receipt
- Paper portfolio
- Traction metrics
