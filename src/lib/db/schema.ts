import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const markets = sqliteTable("markets", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  outcome: text("outcome").notNull(),
  marketProbability: real("market_probability").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const agentDecisions = sqliteTable("agent_decisions", {
  id: text("id").primaryKey(),
  marketId: text("market_id").notNull(),
  action: text("action").notNull(),
  agentProbability: real("agent_probability").notNull(),
  suggestedExposureUsdc: real("suggested_exposure_usdc").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});
