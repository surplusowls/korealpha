# korealpha Agent Runtime Rules

Use these rules for evidence scoring, probability estimation, action generation, and decision receipts.

## Agent Output

- Use zod schemas for structured outputs.
- Fail closed when output validation fails.
- Include both favorable and unfavorable evidence.
- Include uncertainty and confidence.
- Do not present model output as factual certainty.

## Required Decision Fields

- market id
- outcome
- market probability
- agent probability
- probability range
- edge
- confidence
- action: `avoid`, `watch`, or `trade`
- suggested exposure in testnet USDC
- rationale
- evidence scores
- Arc transfer rationale or no-transfer reason

## Action Rules

- Low confidence means `avoid`.
- Absolute edge below 3 percentage points means `avoid`.
- Edge from 3 to 7 points with medium or high confidence means `watch`.
- Edge from 7 to 12 points with medium or high confidence means `trade`.
- Edge above 12 points requires high confidence for `trade`.

## Evidence Rules

- Treat seeded Korean evidence as demo-stability input.
- Use live Polymarket price when available.
- Never hide evidence that hurts the Oh YES thesis.
- Log source name, source URL, source type, published date, summary, direction, and scores.
