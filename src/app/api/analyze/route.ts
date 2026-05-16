import { NextResponse } from "next/server";

import { agentDecisionSchema } from "@/lib/agent/schemas";
import { getSeededMarket } from "@/lib/market-data/seeded-markets";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    marketId?: string;
  } | null;

  if (!body?.marketId) {
    return NextResponse.json(
      { error: "marketId is required" },
      { status: 400 },
    );
  }

  const market = getSeededMarket(body.marketId);

  if (!market) {
    return NextResponse.json({ error: "market not found" }, { status: 404 });
  }

  const decision = agentDecisionSchema.parse({
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

  return NextResponse.json({ decision });
}
