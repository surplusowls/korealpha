# korealpha AI Development Harness

Last updated: 2026-05-16

## 1. Purpose

This document defines the repository-local AI development harness for korealpha.

The harness must work from the project itself. Team members should not need the
author's private Claude Code, Codex, or global skill setup to get the core
project instructions and workflows.

Goal:

> Any coding agent opened in this repository should understand the product,
> constraints, workflow, verification rules, and korealpha-specific safety
> boundaries from committed files.

## 2. Sources Checked

Official and upstream sources used for this setup:

- OpenAI Codex `AGENTS.md` guide:
  https://developers.openai.com/codex/guides/agents-md
- Anthropic Claude Code memory and `CLAUDE.md` guide:
  https://docs.anthropic.com/en/docs/claude-code/memory
- Anthropic Claude Code skills guide:
  https://docs.anthropic.com/en/docs/claude-code/skills
- Anthropic Claude Code plugins guide:
  https://docs.anthropic.com/en/docs/claude-code/plugins
- Compound Engineering upstream repo:
  https://github.com/EveryInc/compound-engineering-plugin

Compound Engineering was cloned and inspected locally:

```bash
git clone --depth 1 https://github.com/EveryInc/compound-engineering-plugin.git /tmp/compound-engineering-plugin
```

## 3. Correct Setup Decision

Use a repo-local harness with official tool entry points:

- `AGENTS.md` is the canonical cross-tool instruction file and is natively read
  by Codex.
- `CLAUDE.md` is a Claude Code adapter and imports `AGENTS.md` with
  `@AGENTS.md`.
- `.claude/skills/<skill>/SKILL.md` exists because Anthropic documents this as
  the project-local skill discovery path for Claude Code.
- `.claude/agents/*.agent.md` exists because Anthropic documents this as the
  project-local subagent discovery path for Claude Code.
- `.agents/skills/<skill>/SKILL.md` stores canonical project skill content so
  non-Claude tools can read the same workflow files from the repo.
- `.agents/rules` stores reusable project rules.
- `.agents/agents` stores role overlays for korealpha-specific subagent work.

We are not relying on global plugin installation. A teammate can open the repo
with Codex or Claude Code and still get the committed instructions.

## 4. Why Not Only Install Compound Engineering?

The Compound Engineering plugin is useful, but a global install is not a
project artifact. If one developer installs it in `~/.claude` or `~/.codex`,
other teammates do not automatically get it.

For this hackathon repo, the right setup is:

1. Clone and inspect Compound Engineering.
2. Vendor the core workflow skills we need into this repository.
3. Vendor the upstream `ce-*` agents required by those workflow skills.
4. Preserve upstream license attribution.
5. Add official Codex and Claude Code entry points around those files.

Optional local plugin installs are allowed, but they are personal accelerators,
not requirements for contributing.

## 5. Vendored Compound Engineering Skills

The following upstream skills were copied with their support files:

| Workflow | Canonical File |
| --- | --- |
| Strategy | `.agents/skills/ce-strategy/SKILL.md` |
| Brainstorm | `.agents/skills/ce-brainstorm/SKILL.md` |
| Plan | `.agents/skills/ce-plan/SKILL.md` |
| Work | `.agents/skills/ce-work/SKILL.md` |
| Debug | `.agents/skills/ce-debug/SKILL.md` |
| Code review | `.agents/skills/ce-code-review/SKILL.md` |
| Compound learning | `.agents/skills/ce-compound/SKILL.md` |

Attribution and license:

- `.agents/vendor/compound-engineering/README.md`
- `.agents/vendor/compound-engineering/LICENSE`

The upstream plugin is MIT licensed. License text is included because these are
substantial copied portions.

## 6. Vendored Compound Engineering Agents

Compound Engineering review and research workflows invoke specialized `ce-*`
agents. Copying the skills without these agents makes workflows like
`ce-code-review` incomplete.

The upstream `agents/*.agent.md` files were therefore copied into:

```txt
.agents/agents/compound-engineering/
.claude/agents/
```

The `.agents` copy is the cross-tool reference copy. The `.claude/agents` copy
is present because Anthropic documents `.claude/agents/` as the project-local
subagent discovery path.

## 7. Claude Code Skill Adapters

Claude Code discovers project skills at:

```txt
.claude/skills/<skill-name>/SKILL.md
```

This repo therefore includes thin adapter skills:

```txt
.claude/skills/ce-strategy/SKILL.md
.claude/skills/ce-brainstorm/SKILL.md
.claude/skills/ce-plan/SKILL.md
.claude/skills/ce-work/SKILL.md
.claude/skills/ce-debug/SKILL.md
.claude/skills/ce-code-review/SKILL.md
.claude/skills/ce-compound/SKILL.md
.claude/skills/korealpha-demo/SKILL.md
```

Each adapter points Claude Code to the canonical project skill in
`.agents/skills`. This avoids maintaining two divergent copies of the same
workflow.

## 8. Repository Structure

```txt
AGENTS.md
CLAUDE.md
.claude/
  agents/
    ce-*.agent.md
  skills/
    ce-strategy/
    ce-brainstorm/
    ce-plan/
    ce-work/
    ce-debug/
    ce-code-review/
    ce-compound/
    korealpha-demo/
.agents/
  rules/
    frontend.md
    agent-runtime.md
    blockchain.md
    testing.md
  agents/
    compound-engineering/
      ce-*.agent.md
    korealpha-product-lead.md
    korealpha-agent-engineer.md
    korealpha-arc-engineer.md
  skills/
    ce-strategy/
    ce-brainstorm/
    ce-plan/
    ce-work/
    ce-debug/
    ce-code-review/
    ce-compound/
    korealpha-demo/
  vendor/
    compound-engineering/
      README.md
      LICENSE
docs/
  PRODUCT_DISCOVERY.md
  PRD.md
  AI_DEVELOPMENT_HARNESS.md
  RUNTIME_STACK.md
```

## 9. File Responsibilities

| File | Purpose |
| --- | --- |
| `AGENTS.md` | Canonical project instructions. Codex reads this natively. |
| `CLAUDE.md` | Claude Code adapter that imports `AGENTS.md`. |
| `.claude/skills/*/SKILL.md` | Claude Code project skill discovery adapters. |
| `.claude/agents/*.agent.md` | Claude Code project subagents vendored from Compound Engineering. |
| `.agents/skills/ce-*` | Vendored Compound Engineering workflow skills. |
| `.agents/skills/korealpha-demo/SKILL.md` | korealpha hackathon demo skill. |
| `.agents/rules/*.md` | Domain-specific project rules. |
| `.agents/agents/*.md` | korealpha role overlays and cross-tool copies of vendored agents. |
| `.agents/vendor/compound-engineering/*` | Attribution and license for vendored upstream content. |

## 10. Working Loop

Default development loop:

1. Strategy: use `ce-strategy` when product direction is unclear.
2. Brainstorm: use `ce-brainstorm` when requirements are not crisp.
3. Plan: use `ce-plan` before multi-file implementation.
4. Work: use `ce-work` for planned execution.
5. Debug: use `ce-debug` for broken behavior or unknown root cause.
6. Review: use `ce-code-review` before reporting risky changes complete.
7. Compound: use `ce-compound` after solving reusable or non-obvious problems.

For hackathon demo work, also read `.agents/skills/korealpha-demo/SKILL.md`.

## 11. Security Rules

Hard rules:

- Never commit private keys.
- Never commit `.env.local`.
- Never enable Arc mainnet in MVP.
- Never execute real-money Polymarket orders.
- Never store user secrets in client-side code.
- Never expose server wallet private keys to the browser.

Arc-specific rules:

- use `ARC_RPC_URL=https://rpc.testnet.arc.network`
- use `ARC_CHAIN_ID=5042002`
- use ERC-20 USDC interface for transfer amounts
- store tx hash, from, to, amount, receipt id, and status
- every tx must be tied to a decision receipt

## 12. Verification Standards

Before reporting a feature as done:

- TypeScript compiles.
- Lint passes or known issues are documented.
- Relevant unit tests pass.
- UI changes are browser-verified when practical.
- Arc changes are testnet-only.
- Agent changes include schema validation.

Minimum commands after product scaffold:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm e2e
```

If a command does not exist yet, the agent should say so clearly.

## 13. How To Verify Harness Loading

Codex:

```bash
codex exec --cd . "Summarize the current project instructions."
```

Expected result: Codex should mention the Seoul mayoral demo,
Arc Testnet-only constraints, and the vendored Compound Engineering skills.

The OpenAI docs also show the interactive form:
`codex --ask-for-approval never "Summarize the current instructions."`.
Use whichever form matches the installed Codex CLI version.

Claude Code:

```bash
claude
/ce-plan
```

Expected result: Claude Code should list or load the project skill adapter from
`.claude/skills/ce-plan/SKILL.md`, then follow the canonical skill in
`.agents/skills/ce-plan/SKILL.md`.

To verify subagent discovery in Claude Code, run `/agents` and confirm the
vendored `ce-*` project subagents are listed.

## 14. Maintenance Policy

When updating the harness:

- Keep `AGENTS.md` concise.
- Keep `CLAUDE.md` as an adapter instead of duplicating all project rules.
- Keep canonical reusable skill content under `.agents/skills`.
- Keep Claude Code discovery adapters under `.claude/skills`.
- Keep Compound Engineering subagent copies in `.agents/agents/compound-engineering`
  and `.claude/agents` in sync when refreshing from upstream.
- Preserve Compound Engineering attribution for copied upstream content.
- Do not add local-user setup steps as project requirements.
