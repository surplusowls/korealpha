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
  outcome: text("outcome").notNull(),
  confidence: text("confidence").notNull(),
  action: text("action").notNull(),
  marketProbability: real("market_probability").notNull(),
  agentProbability: real("agent_probability").notNull(),
  edge: real("edge").notNull(),
  suggestedExposureUsdc: real("suggested_exposure_usdc").notNull(),
  transferRationale: text("transfer_rationale").notNull(),
  noTransferReason: text("no_transfer_reason"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const arcTransactions = sqliteTable("arc_transactions", {
  id: text("id").primaryKey(),
  decisionReceiptId: text("decision_receipt_id").notNull(),
  mode: text("mode").notNull(),
  fromAddress: text("from_address").notNull(),
  toAddress: text("to_address").notNull(),
  amountUsdc: real("amount_usdc").notNull(),
  amountUnits: text("amount_units").notNull(),
  chainId: integer("chain_id").notNull(),
  txHash: text("tx_hash"),
  explorerUrl: text("explorer_url"),
  status: text("status").notNull(),
  failureReason: text("failure_reason"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
