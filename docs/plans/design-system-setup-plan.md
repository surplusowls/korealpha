---
title: Korealpha Design System Setup Plan
created: 2026-05-17
status: completed
origin: docs/brainstorms/design-system-requirements.md
---

# Korealpha Design System Setup Plan

## Scope

Set up the project-local design contract and agent workflow before implementing
the landing page redesign.

This plan does not implement the landing page itself. It prepares the documents
and harness rules that future frontend work must follow.

## Decisions

- Use a credible SaaS-style landing page at `/`.
- Keep the working demo at `/markets/seoul-mayor-2026`.
- Use shadcn/ui and Tailwind CSS tokens instead of a bespoke visual system.
- Treat `DESIGN.md` as the agent-readable design contract.
- Add a project-local `korealpha-design` skill for Codex and Claude Code.

## Implementation Units

### U1: Requirements

Files:

- `docs/brainstorms/design-system-requirements.md`

Goal:

- Capture the market-research-backed design direction, page model, scope
  boundaries, and acceptance criteria.

Verification:

- Requirements describe landing, demo app, design rules, and non-goals.

### U2: Design Contract

Files:

- `DESIGN.md`
- `docs/DESIGN_SYSTEM.md`

Goal:

- Add a Google DESIGN.md-style contract for AI agents.
- Add a teammate-readable design system explanation.

Verification:

- `pnpm design:lint`
- `pnpm format:check`

### U3: Harness Integration

Files:

- `.agents/skills/korealpha-design/SKILL.md`
- `.claude/skills/korealpha-design/SKILL.md`
- `AGENTS.md`
- `CLAUDE.md`
- `.agents/rules/frontend.md`

Goal:

- Make the design workflow discoverable by Codex and Claude Code.
- Link frontend rules and project instructions to the design contract.

Verification:

- Skill files exist in both `.agents` and `.claude`.
- `AGENTS.md` and `CLAUDE.md` reference the design system and skill.

## Result

Completed. The repository now has a CE requirements document, implementation
plan, DESIGN.md contract, team design guide, and project-local design skill.

Review findings resolved:

- Added `pnpm design:lint` to the design workflow after the first review found
  that DESIGN.md validation was not part of the project scripts.
- Updated the Claude Code adapter to match existing project adapter conventions
  with `disable-model-invocation: true` and a repo-relative canonical skill
  reference.

Final verification:

- `pnpm design:lint`
- `pnpm format:check`
- `pnpm lint`
- `pnpm typecheck`
