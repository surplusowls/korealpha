import { NextResponse } from "next/server";

import { getLatestArcTransactionByReceiptId } from "@/lib/arc/transfer";

type RouteContext = {
  params: Promise<{ receiptId: string }>;
};

export async function GET(_: Request, context: RouteContext) {
  const { receiptId } = await context.params;

  if (!receiptId) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "receiptId is required" } },
      { status: 400 },
    );
  }

  const transaction = await getLatestArcTransactionByReceiptId(receiptId);

  return NextResponse.json({
    data: {
      receiptId,
      transaction,
    },
  });
}
