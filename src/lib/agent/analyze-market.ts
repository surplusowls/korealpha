import { agentDecisionSchema } from "@/lib/agent/schemas";
import { getSeededMarket } from "@/lib/market-data/seeded-markets";

export function analyzeSeededMarket(marketId: string) {
  const market = getSeededMarket(marketId);

  if (!market) {
    return null;
  }

  return agentDecisionSchema.parse({
    marketId: market.id,
    outcome: market.outcome,
    marketProbability: market.marketProbability,
    agentProbability: market.agentProbability,
    probabilityRange: market.probabilityRange,
    edge: market.edge,
    confidence: market.confidence,
    action: market.action,
    suggestedExposureUsdc: market.suggestedExposureUsdc,
    rationale: market.rationale,
    evidenceScores: [],
  });
}
