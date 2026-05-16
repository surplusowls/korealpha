import { z } from "zod";

export const evidenceDirectionSchema = z.enum([
  "favorable",
  "unfavorable",
  "neutral",
]);

export const actionSchema = z.enum(["avoid", "watch", "trade"]);

export const confidenceSchema = z.enum(["low", "medium", "high"]);

export const evidenceScoreSchema = z.object({
  evidenceId: z.string().min(1),
  direction: evidenceDirectionSchema,
  score: z.number().min(0).max(100),
  rationale: z.string().min(1),
});

export const agentDecisionSchema = z.object({
  marketId: z.string().min(1),
  outcome: z.string().min(1),
  marketProbability: z.number().min(0).max(1),
  agentProbability: z.number().min(0).max(1),
  probabilityRange: z.object({
    low: z.number().min(0).max(1),
    high: z.number().min(0).max(1),
  }),
  edge: z.number().min(-1).max(1),
  confidence: confidenceSchema,
  action: actionSchema,
  suggestedExposureUsdc: z.number().min(0),
  rationale: z.string().min(1),
  evidenceScores: z.array(evidenceScoreSchema),
});

export type EvidenceDirection = z.infer<typeof evidenceDirectionSchema>;
export type AgentDecision = z.infer<typeof agentDecisionSchema>;
