import type { AgentDecision, EvidenceDirection } from "@/lib/agent/schemas";
import { arcTestnet } from "@/lib/arc/chain";

export type DemoEvidenceSourceType =
  | "market"
  | "poll"
  | "news"
  | "official"
  | "context";

export type DemoEvidenceItem = {
  id: string;
  marketId: string;
  title: string;
  sourceName: string;
  sourceType: DemoEvidenceSourceType;
  sourceUrl: string;
  publishedDate: string;
  summary: string;
  direction: EvidenceDirection;
  relevanceScore: number;
  credibilityScore: number;
  recencyScore: number;
  impactScore: number;
  confidenceScore: number;
  probabilityContribution: number;
};

export type DemoDecisionReceipt = {
  id: string;
  project: "korealpha";
  marketId: string;
  marketTitle: string;
  outcome: string;
  marketProbability: number;
  agentProbability: number;
  edge: number;
  action: AgentDecision["action"];
  confidence: AgentDecision["confidence"];
  suggestedExposureUsdc: number;
  createdAt: string;
  rationale: string;
};

export type DemoArcTransfer = {
  receiptId: string;
  fromLabel: string;
  toLabel: string;
  amountUsdc: number;
  status: "mock_ready";
  mode: "paper_testnet";
  chainId: number;
  explorerUrl: string;
  usdcAddress: string;
  txHash: string | null;
};

export type SeoulMayorDemoMarket = {
  id: string;
  title: string;
  description: string;
  platform: "Polymarket";
  outcome: string;
  resolutionCriteria: string;
  source: string;
  polymarketUrl: string;
  endDate: string;
  marketProbability: number;
  agentProbability: number;
  probabilityRange: AgentDecision["probabilityRange"];
  edge: number;
  confidence: AgentDecision["confidence"];
  action: AgentDecision["action"];
  suggestedExposureUsdc: number;
  volumeUsd: number;
  liquidityUsd: number;
  reportCount: number;
  sourceCount: number;
  paperTradeCount: number;
  testnetVolumeUsdc: number;
  rationale: string;
  evidence: DemoEvidenceItem[];
  receipt: DemoDecisionReceipt;
  arcTransfer: DemoArcTransfer;
};

const marketId = "seoul-mayor-2026";

const evidence: DemoEvidenceItem[] = [
  {
    id: "polymarket-oh-price",
    marketId,
    title: "Polymarket prices Oh Se-hoon as a low-probability YES outcome",
    sourceName: "Polymarket",
    sourceType: "market",
    sourceUrl:
      "https://polymarket.com/event/2026-seoul-mayoral-election-winner",
    publishedDate: "2026-05-16",
    summary:
      "The market page lists the 2026 Seoul mayoral winner event and shows Oh Se-hoon trading as a minority outcome while Chong Won-o leads trader consensus.",
    direction: "neutral",
    relevanceScore: 96,
    credibilityScore: 86,
    recencyScore: 94,
    impactScore: 88,
    confidenceScore: 86,
    probabilityContribution: 0,
  },
  {
    id: "may-ksoi-gap-narrows",
    marketId,
    title: "May KSOI/CBS poll narrows the Chong vs Oh gap to 5.1pp",
    sourceName: "Korea Daily / KSOI-CBS",
    sourceType: "poll",
    sourceUrl: "https://www.koreadaily.com/article/20260513201957545",
    publishedDate: "2026-05-13",
    summary:
      "KSOI polling for CBS reported Chong Won-o at 44.9% and Oh Se-hoon at 39.8%, a closer race than the first confirmed-candidate survey.",
    direction: "favorable",
    relevanceScore: 95,
    credibilityScore: 82,
    recencyScore: 98,
    impactScore: 92,
    confidenceScore: 86,
    probabilityContribution: 0.08,
  },
  {
    id: "april-ksoi-chong-lead",
    marketId,
    title: "First confirmed-candidate poll had Chong ahead by 10.2pp",
    sourceName: "KSOI-CBS polling report coverage",
    sourceType: "poll",
    sourceUrl:
      "https://www.reddit.com/r/Living_in_Korea/comments/1su2qg6/%EC%A0%95%EC%9B%90%EC%98%A4_456_%EC%98%A4%EC%84%B8%ED%9B%88_354_first_polling_results_for_seoul/",
    publishedDate: "2026-04-24",
    summary:
      "The first public survey after both parties confirmed candidates put Chong Won-o at 45.6% and Oh Se-hoon at 35.4%, keeping the bearish base case visible.",
    direction: "unfavorable",
    relevanceScore: 92,
    credibilityScore: 72,
    recencyScore: 82,
    impactScore: 88,
    confidenceScore: 74,
    probabilityContribution: -0.07,
  },
  {
    id: "ppp-nominates-oh",
    marketId,
    title: "People Power Party selects incumbent Oh Se-hoon as candidate",
    sourceName: "Korea JoongAng Daily",
    sourceType: "news",
    sourceUrl:
      "https://koreajoongangdaily.joins.com/news/2026-04-18/national/politics/Seoul-Mayor-Oh-Sehoon-selected-as-People-Power-Partys-candidate-for-mayoral-election/2572243",
    publishedDate: "2026-04-18",
    summary:
      "The PPP nomination removed a primary-path uncertainty and confirmed the incumbent as the conservative candidate for the June 3 race.",
    direction: "favorable",
    relevanceScore: 87,
    credibilityScore: 88,
    recencyScore: 80,
    impactScore: 76,
    confidenceScore: 82,
    probabilityContribution: 0.04,
  },
  {
    id: "oh-registers-candidate",
    marketId,
    title: "Oh officially registers and campaign enters active phase",
    sourceName: "Korea JoongAng Daily",
    sourceType: "official",
    sourceUrl:
      "https://koreajoongangdaily.joins.com/news/2026-04-27/national/politics/PPPs-Oh-Sehoon-registers-as-candidates-heat-up-Seoul-mayoral-race-/2579084",
    publishedDate: "2026-04-27",
    summary:
      "Oh's official prospective-candidate registration moved the race from party selection into direct campaign execution.",
    direction: "favorable",
    relevanceScore: 78,
    credibilityScore: 86,
    recencyScore: 86,
    impactScore: 64,
    confidenceScore: 76,
    probabilityContribution: 0.02,
  },
  {
    id: "late-campaign-uncertainty",
    marketId,
    title: "Late campaign period still carries debate and turnout uncertainty",
    sourceName: "Korealpha local context model",
    sourceType: "context",
    sourceUrl:
      "https://polymarket.com/event/2026-seoul-mayoral-election-winner",
    publishedDate: "2026-05-16",
    summary:
      "The narrowed polling gap is meaningful, but early voting, debate timing, and national party mood keep the confidence range wide.",
    direction: "neutral",
    relevanceScore: 80,
    credibilityScore: 68,
    recencyScore: 90,
    impactScore: 70,
    confidenceScore: 66,
    probabilityContribution: 0.01,
  },
];

export const seoulMayorDemo: SeoulMayorDemoMarket = {
  id: marketId,
  title: "2026 Seoul Mayoral Election Winner",
  description:
    "Korealpha research-desk demo for whether Oh Se-hoon is underpriced in the 2026 Seoul mayoral winner market.",
  platform: "Polymarket",
  outcome: "Oh Se-hoon YES",
  resolutionCriteria:
    "Resolves to the official winner of the June 3, 2026 Seoul mayoral election as reported by South Korea's National Election Commission.",
  source: "Polymarket + Korean local evidence snapshot",
  polymarketUrl:
    "https://polymarket.com/event/2026-seoul-mayoral-election-winner",
  endDate: "2026-06-03",
  marketProbability: 0.12,
  agentProbability: 0.23,
  probabilityRange: {
    low: 0.17,
    high: 0.29,
  },
  edge: 0.11,
  confidence: "medium",
  action: "trade",
  suggestedExposureUsdc: 10,
  volumeUsd: 185000,
  liquidityUsd: 42000,
  reportCount: 38,
  sourceCount: evidence.length,
  paperTradeCount: 12,
  testnetVolumeUsdc: 125,
  rationale:
    "Oh remains the underdog because Chong leads polling, but the market appears slow to price the narrowed May polling gap, confirmed PPP nomination, incumbent visibility, and campaign-registration momentum. The action remains a conservative paper trade because polling still favors Chong and late-campaign uncertainty is high.",
  evidence,
  receipt: {
    id: "ka-seoul-2026-oh-yes-001",
    project: "korealpha",
    marketId,
    marketTitle: "2026 Seoul Mayoral Election Winner",
    outcome: "Oh Se-hoon YES",
    marketProbability: 0.12,
    agentProbability: 0.23,
    edge: 0.11,
    action: "trade",
    confidence: "medium",
    suggestedExposureUsdc: 10,
    createdAt: "2026-05-17T09:00:00+09:00",
    rationale:
      "Positive edge is large enough for a paper trade, but exposure stays conservative because the base polling leader is still Chong Won-o.",
  },
  arcTransfer: {
    receiptId: "ka-seoul-2026-oh-yes-001",
    fromLabel: "korealpha agent wallet",
    toLabel: "Oh YES paper position wallet",
    amountUsdc: 10,
    status: "mock_ready",
    mode: "paper_testnet",
    chainId: arcTestnet.id,
    explorerUrl: arcTestnet.explorerUrl,
    usdcAddress: arcTestnet.usdcAddress,
    txHash: null,
  },
};

export function getSeoulMayorDemoMarket() {
  return seoulMayorDemo;
}
