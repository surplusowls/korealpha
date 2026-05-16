import type { EvidenceDirection } from "@/lib/agent/schemas";
import { seoulMayorDemo } from "@/lib/market-data/seoul-mayor-demo";

export type SeededEvidence = {
  id: string;
  marketId: string;
  title: string;
  direction: EvidenceDirection;
  score: number;
  source: string;
};

const seededEvidence: SeededEvidence[] = [
  ...seoulMayorDemo.evidence.map((item) => ({
    id: item.id,
    marketId: item.marketId,
    title: item.title,
    direction: item.direction,
    score: Math.round(
      (item.relevanceScore +
        item.credibilityScore +
        item.recencyScore +
        item.impactScore +
        item.confidenceScore) /
        5,
    ),
    source: item.sourceName,
  })),
];

export function getSeededEvidenceForMarket(marketId: string) {
  return seededEvidence.filter((item) => item.marketId === marketId);
}
