import type { EvidenceDirection } from "@/lib/agent/schemas";

export type SeededEvidence = {
  id: string;
  marketId: string;
  title: string;
  direction: EvidenceDirection;
  score: number;
  source: string;
};

const seededEvidence: SeededEvidence[] = [
  {
    id: "incumbency",
    marketId: "seoul-mayor-2026",
    title: "Incumbency and Seoul administrative visibility",
    direction: "favorable",
    score: 82,
    source: "Local political context",
  },
  {
    id: "name-recognition",
    marketId: "seoul-mayor-2026",
    title: "High recognition from prior Seoul mayoral campaigns",
    direction: "favorable",
    score: 76,
    source: "Election history fixture",
  },
  {
    id: "party-primary",
    marketId: "seoul-mayor-2026",
    title: "Nomination path can change before campaign season",
    direction: "unfavorable",
    score: 61,
    source: "Party process fixture",
  },
  {
    id: "national-mood",
    marketId: "seoul-mayor-2026",
    title: "National approval swings can dominate local fundamentals",
    direction: "unfavorable",
    score: 58,
    source: "Macro politics fixture",
  },
];

export function getSeededEvidenceForMarket(marketId: string) {
  return seededEvidence.filter((item) => item.marketId === marketId);
}
