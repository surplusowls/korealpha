import type { AgentDecision } from "@/lib/agent/schemas";

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
    id: "seoul-mayor-2026",
    title: "2026 Seoul Mayoral Election Winner",
    description:
      "Demo market focused on whether Oh Se-hoon wins the next Seoul mayoral election.",
    outcome: "Oh Se-hoon YES",
    source: "Seeded Polymarket fixture",
    polymarketUrl: "https://polymarket.com/",
    marketProbability: 0.42,
    agentProbability: 0.51,
    probabilityRange: {
      low: 0.45,
      high: 0.57,
    },
    edge: 0.09,
    confidence: "high",
    action: "trade",
    suggestedExposureUsdc: 90,
    rationale:
      "Incumbency and Seoul-specific name recognition create a positive edge, but party nomination and national approval remain material risks.",
  },
];

export function getSeededMarkets() {
  return seededMarkets;
}

export function getSeededMarket(marketId: string) {
  return seededMarkets.find((market) => market.id === marketId) ?? null;
}
