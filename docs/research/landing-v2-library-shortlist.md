# Landing V2 Library Shortlist

Created: 2026-05-17

## Decision

Do not install any external community registry component in this execution pass.

The plan requires a human-in-the-loop approval gate before installing Tailark,
React Bits, Magic UI, Kokonut UI, or similar community components. This report
narrows the candidate set and records why no component is approved for automatic
installation yet. The landing and demo rebuild should proceed with shadcn/ui,
Tailwind CSS, lucide-react, and local components only.

## Evaluation Criteria

- Fit for dark-first AI research desk positioning.
- shadcn/Tailwind compatibility.
- Next.js 16, React 19, and Tailwind v4 compatibility.
- Dependency weight.
- License and redistribution constraints.
- Accessibility and semantic HTML risk.
- Compatibility with this project's base-ui shadcn setup.
- Whether the component improves Korealpha's product surface enough to justify
  adoption.

## Candidates

### 1. Tailark Dusk Hero / Landing Blocks

- **Use case:** Landing section structure: hero, features, stats, FAQ, CTA.
- **Source:** `https://tailark.com/`, `https://github.com/tailark/blocks`
- **Fit:** High. Tailark is built for marketing blocks and includes dark-mode
  oriented Dusk kit patterns.
- **Concerns:** Blocks can leave a template-like feel if copied too directly.
  Individual block registry output still needs review against the local
  `base-nova` and base-ui rules.
- **Recommendation:** Defer install. Use as structural inspiration only in this
  pass.

### 2. React Bits `BlurText-TS-TW`

- **Use case:** Hero headline or one restrained section reveal.
- **Source:** `https://reactbits.dev/`, `https://github.com/DavidHDev/react-bits`
- **Registry check:** `pnpm dlx shadcn@latest view @react-bits/BlurText-TS-TW`
  returned a TypeScript/Tailwind component using `motion@^12.23.12`.
- **Fit:** Medium. It can improve polish, but the hero headline must remain
  semantic and readable without animation.
- **Concerns:** Adds motion dependency if not already selected through another
  approved component. React Bits uses MIT + Commons Clause; app use is aligned,
  but component redistribution is restricted.
- **Recommendation:** Defer install until human approval.

### 3. React Bits `Counter-TS-TW`

- **Use case:** Animated metrics for probability, source counts, or paper
  exposure.
- **Source:** `https://reactbits.dev/`
- **Registry check:** `pnpm dlx shadcn@latest view @react-bits/Counter-TS-TW`
  returned a TypeScript/Tailwind component using `motion@^12.23.12`.
- **Fit:** Medium. Metrics are visible in this product, but static tabular
  values are safer and simpler for the first rebuild.
- **Concerns:** Inline style-heavy implementation and motion dependency.
- **Recommendation:** Defer install. Reconsider after the static product surface
  is accepted.

### 4. Magic UI `animated-grid-pattern`

- **Use case:** Restrained background depth for the landing hero.
- **Source:** `https://magicui.design/`
- **Registry check:** `pnpm dlx shadcn@latest view @magicui/animated-grid-pattern`
  returned a client SVG component using `motion`.
- **Fit:** Medium. It could support the dark research-desk feel.
- **Concerns:** Animated backgrounds can compete with dashboard content and add
  client-side work. The design contract avoids decorative effects unless they
  clearly support product hierarchy.
- **Recommendation:** Defer install. Use static borders and product UI first.

### 5. Magic UI `marquee`

- **Use case:** Source/proof rail or credibility strip.
- **Source:** `https://magicui.design/`
- **Registry check:** `pnpm dlx shadcn@latest view @magicui/marquee` returned a
  lightweight component plus marquee keyframes.
- **Fit:** Medium. A moving source rail could add energy.
- **Concerns:** Continuous movement can reduce readability and may need pause
  behavior. Static proof metrics are clearer for judges.
- **Recommendation:** Defer install. Use static proof/source sections now.

### 6. Magic UI `number-ticker`

- **Use case:** Probability and traction metrics.
- **Source:** `https://magicui.design/`
- **Registry check:** `pnpm dlx shadcn@latest view @magicui/number-ticker`
  returned a client component using `motion`.
- **Fit:** Medium. Similar use case to React Bits Counter.
- **Concerns:** Motion dependency and client boundary for non-essential polish.
- **Recommendation:** Defer install.

### 7. Kokonut UI AI / Search Widgets

- **Use case:** Research-input or AI prompt-like affordance.
- **Source:** `https://kokonutui.com/`, `https://github.com/kokonut-labs/kokonutui`
- **Fit:** Low for this pass. Korealpha needs a product dashboard and research
  desk, not an input-heavy AI prompt surface.
- **Concerns:** Components skew toward isolated visual widgets rather than full
  landing architecture. Some effects would push the design toward novelty.
- **Recommendation:** Reject for this pass.

### 8. Origin UI / coss UI

- **Use case:** Base UI-oriented components.
- **Source:** `https://github.com/origin-space/originui`
- **Fit:** Low for this pass. Interesting because coss UI uses Base UI, but the
  current need is landing/demo composition.
- **Concerns:** Repository has mixed licensing, including AGPL at the repository
  level with MIT-scoped subdirectories. Requires per-file license review.
- **Recommendation:** Reject for this pass.

## Outcome For This Execution

- Approved installs: none.
- Structural inspiration: Tailark Dusk-style section composition.
- Motion inspiration: React Bits, but no component installed.
- Implementation path: shadcn/ui primitives, Tailwind semantic tokens,
  lucide-react, and local section components.

This satisfies the plan's approval gate without silently adding unapproved
dependencies.
