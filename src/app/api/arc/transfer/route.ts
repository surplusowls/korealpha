import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    receiptId?: string;
  } | null;

  if (!body?.receiptId) {
    return NextResponse.json(
      { error: "receiptId is required" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    mode: "mock",
    receiptId: body.receiptId,
    status: "not_submitted",
  });
}
