import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

import { db } from "@/lib/db/client";
import { agentDecisions } from "@/lib/db/schema";

export async function GET() {
  const decisions = await db
    .select()
    .from(agentDecisions)
    .orderBy(desc(agentDecisions.createdAt));

  return NextResponse.json({ decisions });
}
