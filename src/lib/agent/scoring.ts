import type { AgentDecision } from "@/lib/agent/schemas";

export function calculateEdge(
  agentProbability: number,
  marketProbability: number,
) {
  return roundToBasisPoint(agentProbability - marketProbability);
}

export function chooseAction(
  edge: number,
  confidence: AgentDecision["confidence"],
) {
  if (confidence === "high" && edge >= 0.08) {
    return "trade";
  }

  if (edge >= 0.03) {
    return "watch";
  }

  return "avoid";
}

export function suggestExposureUsdc(
  edge: number,
  confidence: AgentDecision["confidence"],
) {
  if (chooseAction(edge, confidence) !== "trade") {
    return 0;
  }

  const confidenceMultiplier = confidence === "high" ? 1 : 0.5;

  return Math.min(100, Math.round(edge * 1_000 * confidenceMultiplier));
}

function roundToBasisPoint(value: number) {
  return Math.round(value * 10_000) / 10_000;
}
