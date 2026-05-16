import type { AgentDecision } from "@/lib/agent/schemas";
import { seoulMayorDemo } from "@/lib/market-data/seoul-mayor-demo";

export type SeededMarket = {
  id: string;
  title: string;
  description: string;
  outcome: string;
  source: string;
  polymarketUrl: string;
  marketProbability: number;
  agentProbability: number;
  probabilityRange: AgentDecision["probabilityRange"];
  edge: number;
  confidence: AgentDecision["confidence"];
  action: AgentDecision["action"];
  suggestedExposureUsdc: number;
  rationale: string;
};

const seededMarkets: SeededMarket[] = [
  {
    id: seoulMayorDemo.id,
    title: seoulMayorDemo.title,
    description: seoulMayorDemo.description,
    outcome: seoulMayorDemo.outcome,
    source: seoulMayorDemo.source,
    polymarketUrl: seoulMayorDemo.polymarketUrl,
    marketProbability: seoulMayorDemo.marketProbability,
    agentProbability: seoulMayorDemo.agentProbability,
    probabilityRange: seoulMayorDemo.probabilityRange,
    edge: seoulMayorDemo.edge,
    confidence: seoulMayorDemo.confidence,
    action: seoulMayorDemo.action,
    suggestedExposureUsdc: seoulMayorDemo.suggestedExposureUsdc,
    rationale: seoulMayorDemo.rationale,
  },
];

export function getSeededMarkets() {
  return seededMarkets;
}

export function getSeededMarket(marketId: string) {
  return seededMarkets.find((market) => market.id === marketId) ?? null;
}
