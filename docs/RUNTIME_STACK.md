# korealpha Runtime Stack

Last updated: 2026-05-16

## 1. Purpose

This document defines the product runtime stack for korealpha.

The runtime stack is separate from the AI development harness. The harness explains how humans and AI agents should build the project. This document explains what the actual product should run on.

## 2. Recommended MVP Stack

| Layer | Choice | Reason |
| --- | --- | --- |
| Web app | Next.js App Router | Fast full-stack product development with colocated UI and route handlers. |
| Language | TypeScript | Strong typing across UI, agent schemas, API routes, and blockchain code. |
| UI | Tailwind CSS, shadcn/ui, lucide-react | Fast, polished, dashboard-quality UI. |
| AI runtime | Vercel AI SDK | Good TypeScript support for structured output and tool calling. |
| Schema validation | zod | Shared validation for agent outputs, API inputs, receipts, and fixtures. |
| Chain client | viem | Typed EVM client for Arc Testnet reads and transactions. |
| Database | Drizzle ORM with SQLite for local MVP | Simple local persistence, Postgres-compatible migration path. |
| Deployment | Vercel | Natural Next.js deployment path. |
| Unit tests | Vitest | Fast TypeScript test runner. |
| E2E tests | Playwright | Browser-level verification for demo flow. |
| Formatting | Prettier | Consistent code formatting. |
| Linting | ESLint | Static checks for Next.js and TypeScript. |

## 3. Product Runtime Responsibilities

The runtime must support:

- market dashboard
- market detail page
- seeded Korean evidence bundle
- live Polymarket market data adapter
- agent evidence scoring
- agent probability estimate
- action and sizing recommendation
- decision receipt generation
- paper-trade portfolio entry
- Arc Testnet USDC transfer
- Arcscan transaction link
- feedback logging
- traction metrics

## 4. Proposed App Structure

```txt
app/
  page.tsx
  markets/
    page.tsx
    [marketId]/
      page.tsx
  api/
    markets/
      route.ts
    analyze/
      route.ts
    decisions/
      route.ts
    arc/
      transfer/
        route.ts
components/
  dashboard/
  evidence/
  market/
  receipt/
  portfolio/
lib/
  agent/
    schemas.ts
    prompts.ts
    analyze-market.ts
    scoring.ts
  arc/
    chain.ts
    usdc.ts
    transfer.ts
  market-data/
    polymarket.ts
    seeded-markets.ts
    seeded-evidence.ts
  db/
    schema.ts
    client.ts
  metrics/
    traction.ts
tests/
  unit/
  e2e/
```

## 5. AI Runtime

MVP should use Vercel AI SDK with zod schemas.

Primary agent output:

```ts
type AgentDecision = {
  marketId: string;
  outcome: string;
  marketProbability: number;
  agentProbability: number;
  probabilityRange: {
    low: number;
    high: number;
  };
  edge: number;
  confidence: "low" | "medium" | "high";
  action: "avoid" | "watch" | "trade";
  suggestedExposureUsdc: number;
  rationale: string;
  evidenceScores: EvidenceScore[];
};
```

Rules:

- use structured outputs
- validate every model output with zod
- fail closed if output is invalid
- never trigger Arc transfer from unvalidated output
- include both favorable and unfavorable evidence

## 6. Arc Testnet Runtime

Arc Testnet config:

```txt
ARC_RPC_URL=https://rpc.testnet.arc.network
ARC_CHAIN_ID=5042002
ARC_EXPLORER_URL=https://testnet.arcscan.app
ARC_USDC_ADDRESS=0x3600000000000000000000000000000000000000
```

Transaction behavior:

- server-side only
- initiated only after a valid decision receipt
- testnet only
- ERC-20 USDC interface for transfer amounts
- max exposure enforced before signing
- transaction hash stored in receipt

Environment variables:

```txt
ARC_RPC_URL=
ARC_CHAIN_ID=
ARC_AGENT_PRIVATE_KEY=
ARC_POSITION_WALLET_ADDRESS=
ARC_USDC_ADDRESS=
```

Do not expose `ARC_AGENT_PRIVATE_KEY` to the browser.

## 7. Data Model

Core tables:

- `markets`
- `evidence_items`
- `agent_decisions`
- `arc_transactions`
- `paper_positions`
- `feedback_votes`
- `usage_events`

MVP can seed the market and evidence data in code, then persist decisions, transactions, feedback, and usage events.

## 8. API Routes

| Route | Method | Purpose |
| --- | --- | --- |
| `/api/markets` | `GET` | List market cards and dashboard metrics. |
| `/api/analyze` | `POST` | Run agent analysis for a market outcome. |
| `/api/decisions` | `GET` | List previous decision receipts. |
| `/api/arc/transfer` | `POST` | Execute Arc Testnet paper-trade escrow transfer. |

The transfer route must not accept arbitrary transfer instructions from the browser. It should accept a decision receipt id, load the server-side decision, validate risk rules, and then transfer.

## 9. Testing Strategy

Unit tests:

- evidence score normalization
- probability calculation
- action threshold rules
- sizing rules
- zod schema validation
- Arc amount conversion

E2E tests:

- dashboard loads
- market detail opens
- analysis can be generated
- decision receipt appears
- avoid action does not transfer
- trade action shows tx status in mocked mode

## 10. Demo Mode

The MVP should support demo reliability.

Recommended modes:

```txt
MARKET_DATA_MODE=live|seeded
AI_MODE=live|fixture
ARC_TRANSFER_MODE=live|mock
```

Default local development can use:

```txt
MARKET_DATA_MODE=seeded
AI_MODE=fixture
ARC_TRANSFER_MODE=mock
```

Hackathon demo can use:

```txt
MARKET_DATA_MODE=live
AI_MODE=live
ARC_TRANSFER_MODE=live
```

## 11. Implementation Order

Build in this order:

1. Next.js scaffold.
2. Tailwind and shadcn setup.
3. Static dashboard using seeded market data.
4. Market detail page.
5. Evidence table and score display.
6. Agent schemas and fixture decision output.
7. Vercel AI SDK live analysis route.
8. Decision receipt persistence.
9. Arc Testnet transfer module with mock mode.
10. Live Arc Testnet transfer route.
11. Feedback and traction metrics.
12. Playwright demo flow.

## 12. Open Runtime Decisions

These can be finalized during scaffold:

- SQLite only vs immediate Postgres.
- Whether to use Next.js Server Actions for feedback and watchlist saves.
- Whether to deploy with Vercel Postgres, Neon, or Supabase.
- Whether to add OpenAI Agents SDK for tracing before the demo.

Recommended MVP decision:

Start with SQLite and Vercel AI SDK. Add Postgres or OpenAI Agents SDK only if the MVP flow is already working.
