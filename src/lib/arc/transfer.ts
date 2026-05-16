import { randomUUID } from "node:crypto";

import { and, desc, eq } from "drizzle-orm";
import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, getAddress, http } from "viem";

import { arcTestnet } from "@/lib/arc/chain";
import { validateTransferEligibility } from "@/lib/arc/eligibility";
import { toUsdcUnits } from "@/lib/arc/usdc";
import { db } from "@/lib/db/client";
import { agentDecisions, arcTransactions } from "@/lib/db/schema";
import { env } from "@/lib/env";

export type ArcTransferMode = "mock" | "live";

export type ArcTransferStatus =
  | "not_submitted"
  | "submitted"
  | "confirmed"
  | "failed"
  | "risk_rejected";

export type ArcErrorCode =
  | "RECEIPT_NOT_FOUND"
  | "TRANSFER_NOT_ELIGIBLE"
  | "EXPOSURE_LIMIT_EXCEEDED"
  | "LIVE_CONFIG_INVALID"
  | "SUBMISSION_FAILED";

export type ArcTransferError = {
  code: ArcErrorCode;
  message: string;
  httpStatus: 404 | 422 | 500;
};

export type ArcTransferQuote = {
  eligible: boolean;
  reason?: string;
  amountUsdc: number;
  amountUnits: string;
  maxExposureUsdc: number;
  mode: ArcTransferMode;
};

export type ArcTransferResult = {
  receiptId: string;
  status: ArcTransferStatus;
  mode: ArcTransferMode;
  txHash?: string;
  explorerUrl?: string;
  amountUsdc: number;
};

type DecisionForTransfer = {
  id: string;
  action: string;
  confidence: string;
  suggestedExposureUsdc: number;
};

type TransferContext = {
  mode: ArcTransferMode;
  decision: DecisionForTransfer;
  amountUsdc: number;
  amountUnits: bigint;
  fromAddress: string;
  toAddress: string;
};

const usdcAbi = [
  {
    type: "function",
    name: "transfer",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "value", type: "uint256" },
    ],
    outputs: [{ name: "", type: "bool" }],
  },
] as const;

function createArcError(
  code: ArcErrorCode,
  message: string,
  httpStatus: 404 | 422 | 500,
): ArcTransferError {
  return { code, message, httpStatus };
}

export async function getDecisionByReceiptId(receiptId: string) {
  const rows = await db
    .select({
      id: agentDecisions.id,
      action: agentDecisions.action,
      confidence: agentDecisions.confidence,
      suggestedExposureUsdc: agentDecisions.suggestedExposureUsdc,
    })
    .from(agentDecisions)
    .where(eq(agentDecisions.id, receiptId))
    .limit(1);

  return rows[0] ?? null;
}

export async function getLatestArcTransactionByReceiptId(receiptId: string) {
  const rows = await db
    .select()
    .from(arcTransactions)
    .where(eq(arcTransactions.decisionReceiptId, receiptId))
    .orderBy(desc(arcTransactions.createdAt))
    .limit(1);

  return rows[0] ?? null;
}

function validateArcRuntimeConfig() {
  if (
    env.ARC_CHAIN_ID !== arcTestnet.id ||
    env.ARC_RPC_URL !== arcTestnet.rpcUrl ||
    env.ARC_EXPLORER_URL !== arcTestnet.explorerUrl ||
    env.ARC_USDC_ADDRESS.toLowerCase() !== arcTestnet.usdcAddress
  ) {
    throw createArcError(
      "LIVE_CONFIG_INVALID",
      "Arc runtime config is not aligned with Arc Testnet",
      500,
    );
  }
}

export function buildTransferContext(
  decision: DecisionForTransfer,
): TransferContext {
  validateArcRuntimeConfig();

  const eligibility = validateTransferEligibility(decision);
  if (!eligibility.eligible) {
    throw createArcError(
      eligibility.code ?? "TRANSFER_NOT_ELIGIBLE",
      eligibility.reason ?? "Transfer is not eligible",
      422,
    );
  }

  const amountUsdc = decision.suggestedExposureUsdc;
  const amountUnits = toUsdcUnits(amountUsdc);

  const fromAddress =
    env.ARC_TRANSFER_MODE === "live" && env.ARC_AGENT_PRIVATE_KEY
      ? getAddress(privateKeyToAccount(env.ARC_AGENT_PRIVATE_KEY as `0x${string}`).address)
      : "0x0000000000000000000000000000000000000000";

  const toAddress =
    env.ARC_POSITION_WALLET_ADDRESS &&
    /^0x[a-fA-F0-9]{40}$/.test(env.ARC_POSITION_WALLET_ADDRESS)
      ? getAddress(env.ARC_POSITION_WALLET_ADDRESS)
      : "0x0000000000000000000000000000000000000000";

  return {
    mode: env.ARC_TRANSFER_MODE,
    decision,
    amountUsdc,
    amountUnits,
    fromAddress,
    toAddress,
  };
}

async function persistTx(
  params: {
    receiptId: string;
    mode: ArcTransferMode;
    status: ArcTransferStatus;
    fromAddress: string;
    toAddress: string;
    amountUsdc: number;
    amountUnits: bigint;
    txHash?: string;
    failureReason?: string;
  },
) {
  const now = new Date();
  const explorerUrl = params.txHash
    ? `${env.ARC_EXPLORER_URL}/tx/${params.txHash}`
    : null;

  await db.insert(arcTransactions).values({
    id: randomUUID(),
    decisionReceiptId: params.receiptId,
    mode: params.mode,
    fromAddress: params.fromAddress,
    toAddress: params.toAddress,
    amountUsdc: params.amountUsdc,
    amountUnits: params.amountUnits.toString(),
    chainId: env.ARC_CHAIN_ID,
    txHash: params.txHash ?? null,
    explorerUrl,
    status: params.status,
    failureReason: params.failureReason ?? null,
    createdAt: now,
    updatedAt: now,
  });
}

function deterministicMockHash(receiptId: string) {
  const hex = Buffer.from(receiptId).toString("hex").slice(0, 64).padEnd(64, "0");
  return `0x${hex}`;
}

export async function submitMockTransfer(context: TransferContext) {
  const txHash = deterministicMockHash(context.decision.id);
  await persistTx({
    receiptId: context.decision.id,
    mode: "mock",
    status: "submitted",
    fromAddress: context.fromAddress,
    toAddress: context.toAddress,
    amountUsdc: context.amountUsdc,
    amountUnits: context.amountUnits,
    txHash,
  });

  return {
    receiptId: context.decision.id,
    status: "submitted" as const,
    mode: "mock" as const,
    txHash,
    explorerUrl: `${env.ARC_EXPLORER_URL}/tx/${txHash}`,
    amountUsdc: context.amountUsdc,
  };
}

export async function submitLiveTransfer(context: TransferContext) {
  if (!env.ARC_AGENT_PRIVATE_KEY) {
    throw createArcError(
      "LIVE_CONFIG_INVALID",
      "ARC_AGENT_PRIVATE_KEY is required in live mode",
      500,
    );
  }

  try {
    const account = privateKeyToAccount(env.ARC_AGENT_PRIVATE_KEY as `0x${string}`);
    const walletClient = createWalletClient({
      account,
      chain: {
        id: arcTestnet.id,
        name: arcTestnet.name,
        nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 },
        rpcUrls: { default: { http: [arcTestnet.rpcUrl] } },
      },
      transport: http(env.ARC_RPC_URL),
    });

    const txHash = await walletClient.writeContract({
      address: getAddress(env.ARC_USDC_ADDRESS),
      abi: usdcAbi,
      functionName: "transfer",
      args: [context.toAddress as `0x${string}`, context.amountUnits],
    });

    await persistTx({
      receiptId: context.decision.id,
      mode: "live",
      status: "submitted",
      fromAddress: getAddress(account.address),
      toAddress: context.toAddress,
      amountUsdc: context.amountUsdc,
      amountUnits: context.amountUnits,
      txHash,
    });

    return {
      receiptId: context.decision.id,
      status: "submitted" as const,
      mode: "live" as const,
      txHash,
      explorerUrl: `${env.ARC_EXPLORER_URL}/tx/${txHash}`,
      amountUsdc: context.amountUsdc,
    };
  } catch (error) {
    await persistTx({
      receiptId: context.decision.id,
      mode: "live",
      status: "failed",
      fromAddress: context.fromAddress,
      toAddress: context.toAddress,
      amountUsdc: context.amountUsdc,
      amountUnits: context.amountUnits,
      failureReason:
        error instanceof Error ? error.message : "Unknown live transfer error",
    });

    throw createArcError(
      "SUBMISSION_FAILED",
      error instanceof Error ? error.message : "Live transfer failed",
      500,
    );
  }
}

function isArcTransferError(value: unknown): value is ArcTransferError {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    "message" in value &&
    "httpStatus" in value
  );
}

export function toTransferError(error: unknown): ArcTransferError {
  if (isArcTransferError(error)) {
    return error;
  }

  return createArcError("SUBMISSION_FAILED", "Unexpected transfer error", 500);
}

export async function getArcTransferQuote(
  receiptId: string,
): Promise<ArcTransferQuote> {
  const decision = await getDecisionByReceiptId(receiptId);
  if (!decision) {
    throw createArcError("RECEIPT_NOT_FOUND", "Decision receipt not found", 404);
  }

  const eligibility = validateTransferEligibility(decision);
  const amountUsdc = Math.max(0, decision.suggestedExposureUsdc);
  const amountUnits = toUsdcUnits(amountUsdc);

  return {
    eligible: eligibility.eligible,
    reason: eligibility.reason,
    amountUsdc,
    amountUnits: amountUnits.toString(),
    maxExposureUsdc: env.ARC_MAX_EXPOSURE_USDC,
    mode: env.ARC_TRANSFER_MODE,
  };
}

export async function executeArcTransfer(
  receiptId: string,
): Promise<ArcTransferResult> {
  const decision = await getDecisionByReceiptId(receiptId);
  if (!decision) {
    throw createArcError("RECEIPT_NOT_FOUND", "Decision receipt not found", 404);
  }

  const existingSubmitted = await db
    .select()
    .from(arcTransactions)
    .where(
      and(
        eq(arcTransactions.decisionReceiptId, receiptId),
        eq(arcTransactions.status, "submitted"),
      ),
    )
    .orderBy(desc(arcTransactions.createdAt))
    .limit(1);

  if (existingSubmitted[0]) {
    return {
      receiptId,
      status: "submitted",
      mode: existingSubmitted[0].mode as ArcTransferMode,
      txHash: existingSubmitted[0].txHash ?? undefined,
      explorerUrl: existingSubmitted[0].explorerUrl ?? undefined,
      amountUsdc: existingSubmitted[0].amountUsdc,
    };
  }

  try {
    const context = buildTransferContext(decision);
    if (context.mode === "mock") {
      return await submitMockTransfer(context);
    }
    return await submitLiveTransfer(context);
  } catch (error) {
    const transferError = toTransferError(error);
    if (transferError.httpStatus === 422) {
      const context = {
        mode: env.ARC_TRANSFER_MODE,
        amountUsdc: Math.max(0, decision.suggestedExposureUsdc),
        amountUnits: toUsdcUnits(Math.max(0, decision.suggestedExposureUsdc)),
        fromAddress: "0x0000000000000000000000000000000000000000",
        toAddress: env.ARC_POSITION_WALLET_ADDRESS ?? "0x0000000000000000000000000000000000000000",
      };

      await persistTx({
        receiptId,
        mode: context.mode,
        status: "risk_rejected",
        fromAddress: context.fromAddress,
        toAddress: context.toAddress,
        amountUsdc: context.amountUsdc,
        amountUnits: context.amountUnits,
        failureReason: transferError.message,
      });
    }

    throw transferError;
  }
}
