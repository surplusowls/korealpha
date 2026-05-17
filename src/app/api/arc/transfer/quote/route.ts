import { NextResponse } from "next/server";

import { getArcTransferQuote, toTransferError } from "@/lib/arc/transfer";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    receiptId?: string;
  } | null;

  if (!body?.receiptId) {
    return NextResponse.json(
      { error: { code: "BAD_REQUEST", message: "receiptId is required" } },
      { status: 400 },
    );
  }

  try {
    const quote = await getArcTransferQuote(body.receiptId);
    return NextResponse.json({ data: quote });
  } catch (error) {
    const transferError = toTransferError(error);
    return NextResponse.json(
      {
        error: {
          code: transferError.code,
          message: transferError.message,
        },
      },
      { status: transferError.httpStatus },
    );
  }
}
