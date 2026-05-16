# korealpha Testing Rules

Use these rules when adding checks, reviewing work, or deciding whether a task is complete.

## Completion Standard

Do not report a task as complete without fresh verification evidence.

If a check cannot run because the project is not scaffolded yet or the command does not exist, report that explicitly.

## Expected Commands After Scaffold

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm e2e
```

## Unit Test Targets

- evidence score normalization
- probability calculation
- action threshold rules
- sizing rules
- zod schema validation
- Arc amount conversion

## E2E Test Targets

- dashboard loads
- market detail opens
- analysis can be generated
- decision receipt appears
- avoid action does not transfer
- trade action shows transaction status in mocked mode

## Review Standard

Review findings first:

- bugs
- security risks
- behavioral regressions
- missing tests
- demo flow failures

Summaries come after findings.
