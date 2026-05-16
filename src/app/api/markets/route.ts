import { NextResponse } from "next/server";

import { getSeededMarkets } from "@/lib/market-data/seeded-markets";

export function GET() {
  return NextResponse.json({ markets: getSeededMarkets() });
}
