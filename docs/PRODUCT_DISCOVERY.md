# korealpha Product Discovery

Last updated: 2026-05-16

## 1. Confirmed Decisions

| Decision | Choice |
| --- | --- |
| Project name | korealpha |
| Product category | AI market intelligence agent for prediction markets |
| First demo market | 2026 Seoul Mayoral Election Winner |
| Product tone | Serious research and market intelligence tool |
| Execution scope | Paper trading plus agent-initiated Arc Testnet wallet transactions for demo settlement |
| Hackathon fit | Agora Agents Hackathon, primarily RFB 02: Prediction Market Trader Intelligence |

## 2. Product Definition

korealpha converts Korean local information into prediction-market intelligence and agent-initiated testnet settlement actions.

It scans Korea-related prediction markets, reads Korean-language evidence, scores the evidence, estimates independent event probabilities, compares them against market-implied probabilities, detects possible information asymmetry, recommends trade/watch/avoid actions, logs decision receipts, and can trigger Arc Testnet wallet-to-wallet transactions that represent paper-trade settlement or agent decision commitment.

korealpha is not:

- a generic Korean news summarizer
- a generic Polymarket dashboard
- an automatic gambling bot
- a model that claims certainty about future events
- a tool for bypassing legal, geographic, or platform restrictions

## 3. One-Liner

> korealpha finds prediction-market alpha hidden in Korean local information.

Alternative demo tagline:

> Read Korea before the market does.

## 4. Lean Canvas

| Section | Current Answer |
| --- | --- |
| Problem | Global prediction-market participants have difficulty reading and interpreting Korean-language local information, so Korea-related markets may misprice local signals. |
| Customer | Primary: global prediction-market traders. Hackathon traction user: crypto, AI, and prediction-market users who can generate reports, save watchlist items, and create paper trades. |
| Current alternatives | English-language news, manual translation, Polymarket comments, X/Twitter, Discord rumors, and intuition. |
| Solution | Collect Korean local evidence, score its credibility and market impact, estimate an independent probability, compare it to market price, produce an action plus decision receipt, and execute a testnet USDC transfer that represents the agent's paper-trade commitment. |
| Unique value proposition | Korean-language local context becomes structured prediction-market intelligence. |
| Channels | Hackathon demo, X/Discord, prediction-market communities, crypto/AI friends, direct onboarding of early users. |
| Revenue/incentive | Hackathon: traction and product usage. Later: premium intelligence, USDC subscription, builder fee, or analyst workflows. |
| Costs | LLM calls, market-data fetching, source ingestion, storage, Arc/Circle integration. |
| Key metrics | Reports generated, paper trades created, decision receipts logged, watchlist saves, feedback votes, demo users. |
| Unfair advantage | Korean-language and Korea-context fluency combined with agentic probability analysis for global prediction markets. |

## 5. Jobs To Be Done

Primary JTBD:

> When I see a Korea-related prediction market, I want to understand whether Korean local information is already priced in, so I can decide whether to trade, watch, or avoid.

Korean version:

> 내가 한국 관련 예측시장 가격을 볼 때, 한국어 로컬 정보가 이미 가격에 반영됐는지 알고 싶다. 그래서 거래할지, 지켜볼지, 피할지 결정하고 싶다.

Secondary JTBD:

> When I read Korean news about a market-moving event, I want to translate that information into probability, edge, and risk, so I can make a structured prediction-market decision.

## 6. Riskiest Assumptions

| Priority | Assumption | Why It Matters | Validation Method |
| ---: | --- | --- | --- |
| 1 | Korea-related prediction markets have enough volume and interest. | If there are no meaningful markets, the product is too narrow. | Build a Korea market scanner and show active markets with price, volume, and deadline. |
| 2 | Korean local information can create a differentiated probability estimate. | Without this, korealpha is only a summarizer. | Analyze the Seoul mayoral market with at least 5 Korean evidence items and show probability adjustments. |
| 3 | LLMs can score evidence in a useful, auditable way. | Agentic sophistication depends on structured judgment, not generic summaries. | Output evidence scores for relevance, credibility, recency, direction, impact, and confidence. |
| 4 | Users find the report actionable enough to save or track. | Hackathon traction requires usage, not just a demo. | Add report generation, feedback, watchlist, and paper trade logs. |
| 5 | Arc/Circle can be integrated naturally. | Circle tool usage is 20% of judging. | Let the agent initiate an Arc Testnet wallet-to-wallet USDC transaction after a decision receipt is generated. |

## 7. Opportunity Solution Tree

### Desired Outcome

Help users make better Korea-related prediction-market decisions by converting Korean local evidence into structured probability intelligence.

### Opportunities

- Users cannot easily read Korean-language sources.
- Users do not know which Korean sources are credible.
- Users struggle to translate local news into probability changes.
- Users need to compare local evidence against current market prices.
- Users need a record of why the agent recommended a decision.

### Solutions

- Korea-related Polymarket scanner.
- Korean evidence collector.
- Evidence scoring system.
- Probability estimator.
- Edge detector.
- Risk/action recommender.
- Decision receipt, Arc Testnet transaction, and paper portfolio.

## 8. MVP Slice

The MVP must prove one thing:

> korealpha can analyze one Korea-related prediction market end-to-end and show how Korean local evidence changes the probability estimate compared to the market price.

MVP flow:

1. User opens the market dashboard.
2. User selects `2026 Seoul Mayoral Election Winner`.
3. korealpha shows current market probabilities.
4. korealpha shows Korean local evidence.
5. korealpha scores each evidence item.
6. korealpha estimates its own probability.
7. korealpha compares market probability vs agent probability.
8. korealpha recommends trade/watch/avoid.
9. korealpha creates a decision receipt.
10. The agent initiates an Arc Testnet wallet-to-wallet transaction representing the paper-trade commitment.
11. User can save the recommendation as a paper trade.

## 9. Must / Should / Won't

### Must

- Market dashboard with Korea-related markets
- Deep analysis page for the Seoul mayoral market
- Evidence table with scores
- Market probability vs agent probability
- Edge and action output
- Decision receipt
- Agent-initiated Arc Testnet wallet transaction
- Demo-ready UI

### Should

- Paper portfolio with USDC-denominated balance
- Feedback buttons
- Report generation logs
- Arc/Circle decision receipt integration
- Mock fallback data for demo reliability

### Won't

- Automatic real-money betting
- Mainnet transactions
- Every Korea-related market
- Complex ML model training
- Mobile app
- Legal or geographic restriction bypassing
- Unqualified certainty or aggressive gambling language

## 10. Demo Narrative

Core demo story:

> Global traders can see the Polymarket price. But they cannot easily read Korean local signals. korealpha reads Korean-language evidence, scores credibility and impact, estimates an independent probability, compares it with market price, and shows the gap as possible alpha.

Demo structure:

1. Show the Seoul mayoral market and current market probability.
2. Explain why this market has Korean local information asymmetry.
3. Show Korean evidence items and scores.
4. Show probability adjustment.
5. Show market vs korealpha gap.
6. Show action and conservative sizing.
7. Show the agent initiating an Arc Testnet USDC transfer.
8. Show decision receipt, transaction hash, and paper portfolio entry.

## 11. Resolved Product Choices

| Question | Decision |
| --- | --- |
| Which market should be the first demo? | `2026 Seoul Mayoral Election Winner` |
| Which outcome should be the primary demo outcome? | `Will Oh Se-hoon win the 2026 Seoul Mayoral Election?` |
| What is the demo thesis? | The market may be underpricing incumbent comeback risk. |
| What evidence strategy should the first demo use? | Balanced Evidence Bundle: polling momentum, candidate status, campaign risk, debate timing, and market-price movement. |
| What traction target should the project use? | Minimum: 10 users, 25 reports, 10 paper trades, 10 Arc Testnet transactions, 100 testnet USDC volume, 15 feedback votes. Stretch: 25 users, 75 reports, 40 paper trades, 40 Arc Testnet transactions, 500 testnet USDC volume, 50 feedback votes. |
| How should Arc Testnet be used? | Paper Trade Escrow on Arc Testnet |
| What does the transaction represent? | The agent commits its suggested paper-trade exposure by transferring testnet USDC into a market position wallet. |
| Should korealpha execute real Polymarket orders? | No. MVP uses paper-trade escrow and decision receipts only. |
| Should the first version use live evidence retrieval? | Prefer seeded Korean evidence plus live market data for demo reliability. |
| What is the product's agentic action? | AI chooses side/action/sizing, then triggers an Arc Testnet transfer if the action passes risk checks. |

## 12. Open Questions

No core product-discovery blockers remain. Next step is PRD.

## 13. Arc Testnet Agent Action

The Arc/Circle demo should not be a decorative integration. It should show the agent taking a concrete testnet action after it makes a market decision.

Recommended framing:

> The agent does not place a real Polymarket bet. Instead, it commits to its recommendation by moving testnet USDC into a market position wallet on Arc Testnet and logging the transaction hash in the decision receipt.

Possible transaction meanings:

| Option | Meaning | Demo Quality | Complexity |
| --- | --- | ---: | ---: |
| Agent confidence stake | Agent transfers testnet USDC from an agent wallet into a decision wallet when confidence is high enough. | High | Medium |
| Paper-trade escrow | Agent transfers the suggested exposure amount into a market-specific paper escrow wallet. | Highest | Medium |
| Receipt notarization payment | Agent sends a tiny testnet USDC payment when a decision receipt is generated. | Medium | Low |
| User confirmation transfer | User approves the transfer after the agent recommends action. | Medium | Medium |

Chosen MVP:

> Paper Trade Escrow: if korealpha outputs `trade` or strong `watch`, the backend signs and sends an Arc Testnet USDC transaction from the agent wallet to a market-specific position wallet. The receipt stores `from`, `to`, `amount`, `txHash`, `market`, `outcome`, `agentProbability`, `edge`, and `confidence`.

This makes the AI's action visible without making the product a real-money betting bot.

Risk checks before transfer:

- Only testnet transactions.
- No mainnet transfer support in MVP.
- Max exposure per decision.
- No transfer when action is `avoid`.
- No transfer when confidence is low.
- Receipt must include the reason for the transfer.

## 14. Seeded Evidence Bundle

The first demo should use seeded Korean evidence plus live market data. This keeps the demo reliable while still showing how korealpha turns Korean local information into structured market intelligence.

Primary outcome:

> Will Oh Se-hoon win the 2026 Seoul Mayoral Election?

Demo thesis:

> korealpha does not claim Oh will win. It detects that Oh's comeback probability may be underpriced because Korean polling momentum and campaign-risk signals are moving faster than global market consensus.

Seed evidence:

| Evidence | Direction for Oh YES | Impact | Notes |
| --- | --- | --- | --- |
| April KSOI/CBS poll: Chong 45.6%, Oh 35.4% | Down | High | Establishes that Chong had a clear lead after candidate confirmation. |
| May KSOI/CBS poll: Chong 44.9%, Oh 39.8% | Up | High | Shows the race tightening to within a narrower margin. |
| Polling gap narrowed from 10.2pp to 5.1pp | Up | High | Core quantitative momentum signal. |
| Oh confirmed as PPP candidate and officially registered | Up | Medium | Confirms binary race structure and campaign kickoff for the incumbent. |
| Opposition scrutiny of Chong controversies | Up | Medium | Represents campaign-risk signal that may not be fully legible to non-Korean traders. |
| Limited TV debate near early voting | Uncertainty | Medium | Adds late-campaign volatility and information risk. |
| Live Polymarket price movement for Oh YES | Market context | Medium | Used as market-implied baseline and momentum comparison. |

Evidence scoring must remain balanced. Evidence that hurts Oh's probability should be shown clearly; korealpha should not look like a candidate-promotion tool.

## 15. Hackathon Traction Targets

Agora's RFB 02 traction metrics include active users, prediction accuracy rate, total volume wagered, and documented returns. Because the demo uses paper trading and Arc Testnet instead of real betting, korealpha maps these to product-safe equivalents.

| Agora-style metric | korealpha MVP metric |
| --- | --- |
| Active users | Users who generate or view reports |
| Prediction accuracy rate | Deferred until resolution; show prediction log and later Brier/PnL tracking |
| Total volume wagered | Arc Testnet paper-trade escrow volume |
| Documented returns | Unrealized paper PnL from live Polymarket price movement |
| Real transactions | Arc Testnet wallet-to-wallet transfers |

Minimum target before submission:

| Metric | Target |
| --- | ---: |
| Users onboarded | 10 |
| Reports generated | 25 |
| Paper trades created | 10 |
| Arc Testnet transactions | 10 |
| Testnet USDC escrow volume | 100 |
| Feedback votes | 15 |

Stretch target before submission:

| Metric | Target |
| --- | ---: |
| Users onboarded | 25 |
| Reports generated | 75 |
| Paper trades created | 40 |
| Arc Testnet transactions | 40 |
| Testnet USDC escrow volume | 500 |
| Feedback votes | 50 |

Traction dashboard should show:

- users onboarded
- reports generated
- paper trades created
- Arc Testnet transaction count
- testnet USDC escrow volume
- feedback votes
- current paper PnL

Submission framing:

> During the hackathon, korealpha onboarded users who generated market intelligence reports, accepted or rejected AI recommendations, and triggered Arc Testnet paper-trade escrow transactions. We track agent decisions, testnet USDC volume, and paper PnL from live Polymarket prices.
