# korealpha Project Setup

Last updated: 2026-05-16

## 1. Purpose

This document fixes the initial project scaffold for korealpha.

It answers:

- which package manager and framework options to use
- which dependencies to install first
- which folders and files should exist after scaffold
- which scripts should be available
- which environment variables should be templated
- which setup choices are intentionally deferred

This is separate from `docs/RUNTIME_STACK.md`, which explains the product
runtime architecture.

## 2. Scaffold Decision

Use a single-app Next.js project at the repository root.

Do not create a monorepo for the MVP. The hackathon demo needs speed,
simple deployment, and fewer toolchain seams.

| Decision         | Choice             |
| ---------------- | ------------------ |
| Package manager  | `pnpm`             |
| App framework    | Next.js App Router |
| Language         | TypeScript         |
| Styling          | Tailwind CSS       |
| UI system        | shadcn/ui          |
| Icons            | lucide-react       |
| Source directory | `src/`             |
| Route directory  | `src/app/`         |
| Import alias     | `@/*`              |
| Linter           | ESLint             |
| Formatter        | Prettier           |
| Unit tests       | Vitest             |
| E2E tests        | Playwright         |
| Local database   | SQLite             |
| ORM              | Drizzle ORM        |
| Chain client     | viem               |
| AI SDK           | Vercel AI SDK      |

## 3. Required Tooling

Use current LTS Node.js and pnpm.

Recommended local versions:

```txt
node >= 22
pnpm >= 10
```

Commit these files after scaffold:

```txt
.nvmrc
package.json
pnpm-lock.yaml
tsconfig.json
next.config.ts
eslint.config.mjs
postcss.config.mjs
components.json
drizzle.config.ts
vitest.config.ts
playwright.config.ts
.env.example
```

## 4. Initial Create Command

Use `create-next-app` with explicit options instead of relying on interactive
defaults.

Because this repository already exists, scaffold into a temporary directory and
copy the generated app files into the repo root.

```bash
pnpm create next-app@latest /tmp/korealpha-next \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*" \
  --use-pnpm
```

Then copy the generated files into the repository root, preserving the existing
docs and harness files.

Do not overwrite:

```txt
AGENTS.md
CLAUDE.md
docs/
.agents/
.claude/
```

If `create-next-app` generates its own `AGENTS.md`, merge only useful Next.js
guidance into the existing root `AGENTS.md`; do not replace the korealpha
project instructions.

## 5. Dependency Plan

Install product dependencies:

```bash
pnpm add ai @ai-sdk/openai zod viem drizzle-orm better-sqlite3 lucide-react
```

Install UI dependencies through shadcn/ui:

```bash
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button card badge table tabs separator input textarea skeleton tooltip
```

Install development dependencies:

```bash
pnpm add -D prettier vitest @vitejs/plugin-react jsdom @playwright/test playwright drizzle-kit @types/better-sqlite3
```

After Playwright install:

```bash
pnpm exec playwright install
```

## 6. package.json Scripts

The scaffolded `package.json` must include:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write . --ignore-unknown",
    "format:check": "prettier --check . --ignore-unknown",
    "test": "vitest run",
    "test:watch": "vitest",
    "e2e": "playwright test",
    "db:generate": "drizzle-kit generate",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```

Next.js 16 uses the ESLint CLI directly for this scaffold, so `lint` is
`eslint`.

## 7. Target Folder Structure

After scaffold, the repository should converge on:

```txt
src/
  app/
    page.tsx
    layout.tsx
    globals.css
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
    ui/
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
    env.ts
    utils.ts
tests/
  unit/
  e2e/
drizzle/
```

Rules:

- `src/components/ui` is owned by shadcn/ui.
- product-specific UI goes in `src/components/<domain>`.
- server-only blockchain code goes in `src/lib/arc`.
- agent schemas live in `src/lib/agent/schemas.ts` and are shared by tests.
- seeded demo data lives in `src/lib/market-data`.

## 8. Environment Template

Create `.env.example` with:

```txt
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Modes
MARKET_DATA_MODE=seeded
AI_MODE=fixture
ARC_TRANSFER_MODE=mock

# OpenAI / Vercel AI SDK
OPENAI_API_KEY=

# Arc Testnet
ARC_RPC_URL=https://rpc.testnet.arc.network
ARC_CHAIN_ID=5042002
ARC_EXPLORER_URL=https://testnet.arcscan.app
ARC_USDC_ADDRESS=0x3600000000000000000000000000000000000000
ARC_AGENT_PRIVATE_KEY=
ARC_POSITION_WALLET_ADDRESS=

# Database
DATABASE_URL=file:./local.db
```

Rules:

- Commit `.env.example`.
- Do not commit `.env`, `.env.local`, private keys, or local database files.
- `ARC_AGENT_PRIVATE_KEY` must never be exposed to client-side code.

## 9. Initial Config Files

Create `src/lib/env.ts` and validate environment variables with zod.

Required behavior:

- parse modes as enums
- parse `ARC_CHAIN_ID` as number
- fail fast on invalid live Arc config
- allow mock/fixture local development without private keys

Create Drizzle config:

```txt
drizzle.config.ts
```

Use SQLite for local MVP:

```txt
DATABASE_URL=file:./local.db
```

Keep the schema compatible with a later Postgres migration where practical, but
do not add Postgres during the initial scaffold.

## 10. Initial shadcn/ui Settings

Use the shadcn CLI to generate `components.json`.

Preferred choices:

```txt
style: base-nova
base color: neutral
css variables: yes
components alias: @/components
utils alias: @/lib/utils
ui alias: @/components/ui
```

Do not build a marketing landing page as the first screen. The first screen
should be the usable korealpha dashboard.

## 11. First Vertical Slice

The first scaffold milestone is not "all dependencies installed." It is:

1. `pnpm dev` starts.
2. Dashboard route renders.
3. `/markets/seoul-mayor-2026` renders a static market detail page.
4. Seeded evidence data is displayed.
5. `pnpm lint`, `pnpm typecheck`, and `pnpm test` run.

Only after this should live AI and Arc transfer work begin.

## 12. Deferred Decisions

Defer these until the MVP path works:

- Postgres provider choice: Vercel Postgres, Neon, or Supabase.
- auth
- user accounts
- watchlists
- real Polymarket order execution
- Arc mainnet support
- OpenAI Agents SDK tracing
- background jobs
- monorepo split
