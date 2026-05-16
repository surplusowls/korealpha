import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

import { getDb } from "@/lib/db/client";
import { agentDecisions } from "@/lib/db/schema";

export async function GET() {
  const db = getDb();
  const decisions = await db
    .select()
    .from(agentDecisions)
    .orderBy(desc(agentDecisions.createdAt));

  return NextResponse.json({ decisions });
}
