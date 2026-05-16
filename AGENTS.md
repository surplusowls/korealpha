# korealpha Agent Instructions

## Project Context

korealpha converts Korean local information into prediction-market intelligence.

The first hackathon demo analyzes the `2026 Seoul Mayoral Election Winner`
Polymarket event, focused on:

> Will Oh Se-hoon win the 2026 Seoul Mayoral Election?

The product shows Korean evidence, evidence scores, market probability, agent
probability, edge, action, suggested paper exposure, decision receipt, and Arc
Testnet paper-trade escrow.

## Required Reading

- Product strategy and discovery: `docs/PRODUCT_DISCOVERY.md`
- Product requirements: `docs/PRD.md`
- AI development harness: `docs/AI_DEVELOPMENT_HARNESS.md`
- Runtime stack: `docs/RUNTIME_STACK.md`

Read the PRD before product behavior changes. Read the runtime stack before
architecture, dependency, or scaffold changes.

## Harness Contract

This file is the canonical project instruction file.

- Codex reads `AGENTS.md` natively.
- Claude Code reads `CLAUDE.md`, which imports this file.
- Canonical project skills live in `.agents/skills`.
- Claude Code discovery adapters live in `.claude/skills`.
- korealpha role overlays live in `.agents/agents`.
- Vendored Compound Engineering agents live in `.agents/agents/compound-engineering`
  and `.claude/agents`.
- Project rules live in `.agents/rules`.

Do not require teammates to install a global Compound Engineering plugin before
they can use this repo. Optional local installs are personal accelerators only.

## Compound Engineering Workflow

Use the vendored Compound Engineering skills when the task shape fits:

- Strategy/product alignment: `.agents/skills/ce-strategy/SKILL.md`
- Feature clarification: `.agents/skills/ce-brainstorm/SKILL.md`
- Implementation planning: `.agents/skills/ce-plan/SKILL.md`
- Execution: `.agents/skills/ce-work/SKILL.md`
- Debugging: `.agents/skills/ce-debug/SKILL.md`
- Code review: `.agents/skills/ce-code-review/SKILL.md`
- Durable learning: `.agents/skills/ce-compound/SKILL.md`

The vendored Compound Engineering review and research agents are available at:

- Cross-tool reference copies: `.agents/agents/compound-engineering/*.agent.md`
- Claude Code project subagents: `.claude/agents/*.agent.md`

Default loop:

1. Confirm strategy and scope.
2. Clarify requirements.
3. Write a short file-level implementation plan.
4. Implement.
5. Verify with relevant checks.
6. Review the diff.
7. Document durable learnings when useful.

## Non-Goals

- Do not execute real-money Polymarket orders.
- Do not support mainnet transactions in MVP.
- Do not bypass legal, geographic, or platform restrictions.
- Do not present election predictions as certainty.
- Do not hide evidence that weakens the demo thesis.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- lucide-react
- Vercel AI SDK
- zod
- viem
- Drizzle ORM
- SQLite for local MVP, Postgres-compatible schema for deployment
- Vitest
- Playwright

## Implementation Rules

- Keep MVP work scoped to the Seoul mayoral demo unless explicitly asked otherwise.
- Prefer typed schemas and structured outputs over free-form JSON.
- Validate model outputs with zod before using them.
- Never trigger an Arc transfer from unvalidated model output.
- Keep Arc transactions testnet-only.
- Tie every Arc transaction to a decision receipt.
- Keep private keys and wallet secrets out of source control.
- Do not add broad abstractions before the MVP flow works.

## Arc Testnet Safety

Use Arc Testnet only:

- RPC: `https://rpc.testnet.arc.network`
- Chain ID: `5042002`
- Explorer: `https://testnet.arcscan.app`
- USDC ERC-20 interface: `0x3600000000000000000000000000000000000000`

Rules:

- Do not add mainnet RPC configuration in MVP.
- Do not expose `ARC_AGENT_PRIVATE_KEY` to browser code.
- Use ERC-20 USDC interface amounts for transfers.
- Enforce max exposure before signing.
- Store `from`, `to`, `amount`, `txHash`, `receiptId`, and `status`.

## Project-Specific Rules

- Frontend rules: `.agents/rules/frontend.md`
- Agent runtime rules: `.agents/rules/agent-runtime.md`
- Blockchain rules: `.agents/rules/blockchain.md`
- Testing rules: `.agents/rules/testing.md`
- Demo skill: `.agents/skills/korealpha-demo/SKILL.md`

## Verification

Before reporting work as complete:

- Run relevant lint/type/unit/e2e checks.
- If a check does not exist yet, say so clearly.
- For UI work, verify the page in a browser when practical.
- For agent work, test schema validation and action thresholds.
- For Arc work, verify testnet-only config and amount conversion.
- Review the diff for regressions and unrelated edits.

Expected commands after scaffold exists:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm e2e
```

## Git

- Use Conventional Commits.
- Stage only files relevant to the current task.
- Do not revert unrelated user changes.
- Do not use destructive git commands unless explicitly requested.
