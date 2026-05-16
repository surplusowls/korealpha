# korealpha PRD v0.1

Last updated: 2026-05-16

## 1. Product Summary

korealpha is an AI market intelligence agent that converts Korean local information into prediction-market alpha.

The first demo analyzes the `2026 Seoul Mayoral Election Winner` Polymarket event, focusing on the outcome:

> Will Oh Se-hoon win the 2026 Seoul Mayoral Election?

korealpha reads Korean local evidence, scores the evidence, estimates an independent probability, compares it against Polymarket's market-implied probability, recommends `trade`, `watch`, or `avoid`, and commits qualifying paper-trade recommendations by transferring testnet USDC into a market position wallet on Arc Testnet.

## 2. Goals

### Product Goals

- Show how Korean local information can change prediction-market probability estimates.
- Make the agent's reasoning auditable through structured evidence scores and decision receipts.
- Demonstrate agentic action by executing Arc Testnet paper-trade escrow transfers.
- Collect hackathon traction metrics through report generation, paper trades, feedback, and testnet transactions.

### Hackathon Goals

- Align with Agora RFB 02: Prediction Market Trader Intelligence.
- Score well on Agentic Sophistication by letting AI decide evidence weighting, probability, action, and sizing.
- Score well on Circle tool usage by using Arc Testnet wallet-to-wallet testnet USDC transfers.
- Score well on Traction by showing usage logs and paper-trade volume.

## 3. Non-Goals

- No real-money Polymarket order execution.
- No mainnet transactions.
- No legal or geographic restriction bypassing.
- No claim that the model can predict elections with certainty.
- No full coverage of all Korea-related prediction markets in MVP.
- No complex ML model training.

## 4. Target Users

### Primary User

Global prediction-market traders who can access Polymarket prices but cannot easily read Korean-language news, polls, and local political context.

### Secondary User

Korean-speaking users who understand local information but need help translating that information into market probabilities, edge, action, and risk sizing.

### Hackathon User

Judges, mentors, and early testers who need to understand the agent's reasoning, see a working product, and trigger observable Arc Testnet transactions.

## 5. Core User Story

> As a prediction-market user, when I see a Korea-related market, I want korealpha to tell me whether Korean local information is already priced in, so I can decide whether to trade, watch, or avoid.

## 6. MVP User Flow

1. User opens the korealpha dashboard.
2. User sees Korea-related prediction markets and traction metrics.
3. User selects `2026 Seoul Mayoral Election Winner`.
4. User opens the `Oh Se-hoon YES` analysis.
5. korealpha displays live Polymarket market price.
6. korealpha displays seeded Korean evidence.
7. Agent scores each evidence item.
8. Agent estimates its own probability and uncertainty range.
9. Agent compares market probability vs agent probability.
10. Agent recommends `trade`, `watch`, or `avoid`.
11. If risk checks pass, agent creates a paper-trade recommendation.
12. Agent transfers testnet USDC from the agent wallet to the Oh YES position wallet on Arc Testnet.
13. User sees decision receipt, tx hash, Arcscan link, and paper portfolio entry.
14. User gives thumbs up/down feedback.

## 7. Demo Thesis

The demo does not claim Oh Se-hoon will win.

The demo asks:

> Is Oh Se-hoon's comeback probability underpriced by the market?

The agent should show balanced evidence:

- Chong Won-oh led clearly in the first confirmed-candidate poll.
- The gap later narrowed.
- Oh has incumbent and campaign-launch advantages.
- Chong faces campaign scrutiny.
- Debate timing and early voting create late-campaign uncertainty.
- The market price has moved but may still lag Korean local signals.

## 8. Functional Requirements

### 8.1 Market Dashboard

Must show:

- project name: `korealpha`
- one-line description
- Korea-related market list
- market title
- platform
- primary outcome
- current market probability
- volume
- liquidity
- end date
- analysis status
- traction metrics panel

MVP can use one deep market plus several shallow market cards.

### 8.2 Market Detail Page

Must show:

- event title
- outcome: `Oh Se-hoon YES`
- resolution criteria summary
- live market price
- volume/liquidity
- agent probability
- probability range
- edge
- confidence
- recommended action
- suggested exposure
- latest decision receipt
- paper-trade escrow transaction status

### 8.3 Evidence Table

Must show each evidence item with:

- title
- source name
- source type
- published date
- source URL
- summary
- direction for Oh YES
- relevance score
- credibility score
- recency score
- impact score
- confidence score

Seed evidence:

| Evidence | Direction | Impact |
| --- | --- | --- |
| April KSOI/CBS poll: Chong 45.6%, Oh 35.4% | Down | High |
| May KSOI/CBS poll: Chong 44.9%, Oh 39.8% | Up | High |
| Polling gap narrowed from 10.2pp to 5.1pp | Up | High |
| Oh confirmed as PPP candidate and officially registered | Up | Medium |
| Opposition scrutiny of Chong controversies | Up | Medium |
| Limited TV debate near early voting | Uncertainty | Medium |
| Live Polymarket price movement for Oh YES | Market context | Medium |

### 8.4 Agent Analysis

Agent must produce:

- market summary
- resolution criteria
- evidence score table
- probability adjustment explanation
- market probability
- agent probability
- uncertainty range
- edge
- confidence
- action: `trade`, `watch`, or `avoid`
- suggested exposure in testnet USDC
- rationale for Arc Testnet transfer or no-transfer decision

### 8.5 Action Rules

Default action thresholds:

| Condition | Action |
| --- | --- |
| confidence low | avoid |
| absolute edge < 3pp | avoid |
| edge 3-7pp and confidence medium/high | watch |
| edge 7-12pp and confidence medium/high | trade |
| edge > 12pp and confidence high | trade |

For MVP, `watch` can still create a smaller paper-trade escrow only if explicitly marked as `strong watch`.

### 8.6 Sizing Rules

MVP sizing should be simple and conservative.

Suggested exposure:

| Action | Exposure |
| --- | ---: |
| avoid | 0 testnet USDC |
| watch | 0-2 testnet USDC |
| strong watch | 5 testnet USDC |
| trade | 10 testnet USDC |

Future versions can use conservative Kelly sizing.

### 8.7 Decision Receipt

Each analysis should generate a receipt.

Receipt fields:

```ts
type DecisionReceipt = {
  id: string;
  project: "korealpha";
  marketId: string;
  marketTitle: string;
  outcome: string;
  marketProbability: number;
  agentProbability: number;
  probabilityRange: [number, number];
  edge: number;
  confidence: "low" | "medium" | "high";
  action: "trade" | "watch" | "avoid";
  suggestedExposureUsdc: number;
  evidenceIds: string[];
  reasoningSummary: string;
  createdAt: string;
  receiptHash: string;
  arcTxHash?: string;
};
```

### 8.8 Arc Testnet Paper-Trade Escrow

The agent should execute a testnet transfer only when:

- action is `trade` or `strong watch`
- suggested exposure is greater than 0
- confidence is not low
- network is Arc Testnet
- agent wallet has enough testnet USDC
- transfer amount is below max exposure limit

Transfer meaning:

> Agent Wallet -> Oh YES Position Wallet

This transfer represents a paper-trade escrow commitment, not a real bet.

Transaction receipt must store:

- from wallet
- to wallet
- amount
- chain: `Arc Testnet`
- tx hash
- explorer URL
- status
- linked decision receipt ID

Arc Testnet parameters:

- RPC: `https://rpc.testnet.arc.network`
- Chain ID: `5042002`
- Gas currency: `USDC`
- Faucet: Circle Faucet

### 8.9 Paper Portfolio

Must show:

- starting paper balance
- open paper positions
- market
- outcome
- side
- entry market probability
- agent probability at entry
- exposure
- current market probability
- unrealized paper PnL
- linked decision receipt
- linked Arc transaction

### 8.10 Feedback

Must allow user to mark an analysis:

- useful
- not useful

Optional feedback text can be added later.

## 9. Data Model

### Market

```ts
type Market = {
  id: string;
  platform: "polymarket";
  title: string;
  slug: string;
  url: string;
  outcomes: string[];
  prices: Record<string, number>;
  volume: number;
  liquidity: number;
  endDate: string;
  resolutionCriteria: string;
  updatedAt: string;
};
```

### Evidence

```ts
type Evidence = {
  id: string;
  marketId: string;
  title: string;
  sourceName: string;
  sourceType: "poll" | "news" | "official" | "market" | "manual";
  url?: string;
  language: "ko" | "en";
  publishedAt?: string;
  summary: string;
  direction: "up" | "down" | "neutral" | "uncertainty";
  relevanceScore: number;
  credibilityScore: number;
  recencyScore: number;
  impactScore: number;
  confidenceScore: number;
};
```

### Analysis

```ts
type Analysis = {
  id: string;
  marketId: string;
  outcome: string;
  marketProbability: number;
  agentProbability: number;
  probabilityRange: [number, number];
  edge: number;
  confidence: "low" | "medium" | "high";
  action: "trade" | "watch" | "avoid";
  suggestedExposureUsdc: number;
  evidenceIds: string[];
  reasoning: string;
  createdAt: string;
};
```

### PaperTrade

```ts
type PaperTrade = {
  id: string;
  analysisId: string;
  marketId: string;
  outcome: string;
  side: "yes" | "no";
  exposureUsdc: number;
  entryPrice: number;
  currentPrice: number;
  unrealizedPnl: number;
  arcTxHash?: string;
  createdAt: string;
};
```

### TractionMetrics

```ts
type TractionMetrics = {
  usersOnboarded: number;
  reportsGenerated: number;
  paperTradesCreated: number;
  arcTestnetTransactions: number;
  testnetUsdcEscrowVolume: number;
  feedbackVotes: number;
  currentPaperPnl: number;
};
```

## 10. Agent Pipeline

```text
MarketDataAgent
  -> ResolutionCriteriaAgent
  -> EvidenceScoringAgent
  -> ProbabilityEstimationAgent
  -> ActionSizingAgent
  -> DecisionReceiptAgent
  -> ArcEscrowAgent
  -> PortfolioTrackerAgent
```

### Agent Responsibilities

| Agent | Responsibility |
| --- | --- |
| MarketDataAgent | Fetch live Polymarket price, volume, liquidity, and market metadata. |
| ResolutionCriteriaAgent | Summarize what resolves the market. |
| EvidenceScoringAgent | Score seeded Korean evidence. |
| ProbabilityEstimationAgent | Estimate independent probability and uncertainty range. |
| ActionSizingAgent | Decide action and suggested exposure. |
| DecisionReceiptAgent | Generate receipt JSON and receipt hash. |
| ArcEscrowAgent | Execute testnet USDC transfer when risk checks pass. |
| PortfolioTrackerAgent | Track paper position and unrealized PnL. |

## 11. Traction Requirements

Minimum target before submission:

| Metric | Target |
| --- | ---: |
| Users onboarded | 10 |
| Reports generated | 25 |
| Paper trades created | 10 |
| Arc Testnet transactions | 10 |
| Testnet USDC escrow volume | 100 |
| Feedback votes | 15 |

Stretch target:

| Metric | Target |
| --- | ---: |
| Users onboarded | 25 |
| Reports generated | 75 |
| Paper trades created | 40 |
| Arc Testnet transactions | 40 |
| Testnet USDC escrow volume | 500 |
| Feedback votes | 50 |

## 12. Acceptance Criteria

MVP is acceptable when:

- Dashboard loads with at least one deep market.
- Market detail shows live Polymarket price for Oh YES.
- Evidence table shows at least 7 evidence rows.
- Agent analysis outputs probability, edge, confidence, action, and exposure.
- Decision receipt is generated with stable hash.
- Arc Testnet transfer can be executed from agent wallet to position wallet.
- UI displays tx hash and explorer link.
- Paper portfolio shows the created position.
- Traction metrics update after report, paper trade, feedback, and transfer events.
- Demo can run reliably with seeded evidence even if live search fails.

## 13. Demo Script

```text
Global traders can see the Polymarket price for the 2026 Seoul mayoral election.

The market gives Oh Se-hoon roughly a low double-digit to sub-20% chance.

But most global traders cannot easily read Korean local signals: polling momentum, candidate confirmation, local campaign controversies, debate timing, and early-voting dynamics.

korealpha reads these signals, scores their credibility and impact, and estimates its own probability.

If korealpha sees a gap, it recommends trade/watch/avoid and sizes exposure.

Then the agent commits to the recommendation by moving testnet USDC into an Arc Testnet paper-trade escrow wallet.

The result is a verifiable decision receipt: reasoning, probability, exposure, and transaction hash in one place.
```

## 14. Implementation Priority

### P0

- Market detail for Oh YES
- Seeded evidence table
- Agent analysis JSON
- Decision receipt
- Arc Testnet transfer
- Paper portfolio entry

### P1

- Dashboard market scanner
- Traction metrics panel
- Feedback buttons
- Arcscan link

### P2

- Multiple Korea-related markets
- Live search evidence ingestion
- Conservative Kelly sizing
- Brier score tracking after market resolution
