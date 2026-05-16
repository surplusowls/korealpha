import { randomUUID } from "node:crypto";

import { NextResponse } from "next/server";

import { agentDecisionSchema } from "@/lib/agent/schemas";
import { getDb } from "@/lib/db/client";
import { agentDecisions } from "@/lib/db/schema";
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

  const decisionId = randomUUID();
  const db = getDb();
  await db.insert(agentDecisions).values({
    id: decisionId,
    marketId: decision.marketId,
    outcome: decision.outcome,
    confidence: decision.confidence,
    action: decision.action,
    marketProbability: decision.marketProbability,
    agentProbability: decision.agentProbability,
    edge: decision.edge,
    suggestedExposureUsdc: decision.suggestedExposureUsdc,
    transferRationale:
      decision.action === "trade" || decision.action === "watch"
        ? decision.rationale
        : "Transfer not allowed for avoid action",
    noTransferReason:
      decision.action === "avoid"
        ? "Avoid action disables Arc transfer"
        : null,
    createdAt: new Date(),
  });

  return NextResponse.json({
    decision: {
      id: decisionId,
      ...decision,
    },
  });
}
