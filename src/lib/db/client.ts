import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";

import { env } from "@/lib/env";

const sqlite = new Database(env.DATABASE_URL.replace("file:", ""));
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS agent_decisions (
    id TEXT PRIMARY KEY,
    market_id TEXT NOT NULL,
    outcome TEXT NOT NULL,
    confidence TEXT NOT NULL,
    action TEXT NOT NULL,
    market_probability REAL NOT NULL,
    agent_probability REAL NOT NULL,
    edge REAL NOT NULL,
    suggested_exposure_usdc REAL NOT NULL,
    transfer_rationale TEXT NOT NULL,
    no_transfer_reason TEXT,
    created_at INTEGER NOT NULL
  );
`);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS arc_transactions (
    id TEXT PRIMARY KEY,
    decision_receipt_id TEXT NOT NULL,
    mode TEXT NOT NULL,
    from_address TEXT NOT NULL,
    to_address TEXT NOT NULL,
    amount_usdc REAL NOT NULL,
    amount_units TEXT NOT NULL,
    chain_id INTEGER NOT NULL,
    tx_hash TEXT,
    explorer_url TEXT,
    status TEXT NOT NULL,
    failure_reason TEXT,
    created_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL
  );
`);

export const db = drizzle(sqlite);
