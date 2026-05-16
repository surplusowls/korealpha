@AGENTS.md

## Claude Code Notes

Use the shared project rules from `AGENTS.md`.

Claude Code officially discovers project skills under `.claude/skills`. This
repo keeps thin adapters there so slash-command discovery works while the
canonical skill content remains under `.agents/skills` for cross-tool reuse.
Claude Code also discovers project subagents under `.claude/agents`; vendored
Compound Engineering agents are copied there because the upstream review skills
delegate to `ce-*` agents.

Use these project skills when appropriate:

- `/ce-strategy`
- `/ce-brainstorm`
- `/ce-plan`
- `/ce-work`
- `/ce-debug`
- `/ce-code-review`
- `/ce-compound`
- `/korealpha-demo`
- `/korealpha-design`

Use vendored `ce-*` subagents from `.claude/agents` when a Compound Engineering
skill asks for specialized review, research, or document-review personas.

For project-specific rules, read:

- frontend work: `.agents/rules/frontend.md`
- frontend design work: `DESIGN.md`, `docs/DESIGN_SYSTEM.md`, and
  `.agents/skills/korealpha-design/SKILL.md`
- agent runtime work: `.agents/rules/agent-runtime.md`
- Arc Testnet work: `.agents/rules/blockchain.md`
- verification work: `.agents/rules/testing.md`
- demo preparation: `.agents/skills/korealpha-demo/SKILL.md`
- frontend design workflow: `.agents/skills/korealpha-design/SKILL.md`
- dependency, tooling, or scaffold work: `docs/PROJECT_SETUP.md`
