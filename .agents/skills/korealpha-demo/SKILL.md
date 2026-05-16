---
name: korealpha-demo
description: Use when preparing, implementing, or verifying the korealpha hackathon MVP demo flow for the Seoul mayoral prediction-market analysis and Arc Testnet paper-trade escrow.
---

# korealpha Demo Skill

This skill keeps the hackathon demo focused.

## Demo Flow

1. Show the korealpha dashboard.
2. Open the `2026 Seoul Mayoral Election Winner` market.
3. Focus on `Oh Se-hoon YES`.
4. Show live or seeded market probability.
5. Show balanced Korean evidence.
6. Score evidence.
7. Estimate agent probability and uncertainty range.
8. Compare market probability vs agent probability.
9. Recommend `avoid`, `watch`, or `trade`.
10. Generate a decision receipt.
11. If risk checks pass, trigger Arc Testnet paper-trade escrow.
12. Show tx hash, Arcscan link, paper portfolio entry, and traction metrics.

## Non-Negotiables

- No real-money order execution.
- No mainnet transaction support.
- No private key in source control.
- No unsupported prediction certainty.
- No hidden contrary evidence.

## Verification

Before calling the demo ready:

- Verify the dashboard and market detail path.
- Verify agent output schema validation.
- Verify action threshold behavior.
- Verify `avoid` does not transfer.
- Verify mock Arc transfer path.
- Verify live Arc transfer only when testnet wallet env vars are configured.
