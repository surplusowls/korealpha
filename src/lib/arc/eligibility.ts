import { env } from "@/lib/env";

export type DecisionEligibilityInput = {
  id: string;
  action: string;
  confidence: string;
  suggestedExposureUsdc: number;
};

export type EligibilityResult = {
  eligible: boolean;
  reason?: string;
  code?: "TRANSFER_NOT_ELIGIBLE" | "EXPOSURE_LIMIT_EXCEEDED";
};

export function validateTransferEligibility(
  decision: DecisionEligibilityInput,
): EligibilityResult {
  if (decision.confidence === "low") {
    return {
      eligible: false,
      reason: "Low confidence decisions cannot trigger transfers",
      code: "TRANSFER_NOT_ELIGIBLE",
    };
  }

  const isTrade = decision.action === "trade";
  const isTransferEligibleWatch = decision.action === "watch";

  if (!isTrade && !isTransferEligibleWatch) {
    return {
      eligible: false,
      reason: "Only trade or transfer-eligible watch decisions can transfer",
      code: "TRANSFER_NOT_ELIGIBLE",
    };
  }

  if (decision.suggestedExposureUsdc <= 0) {
    return {
      eligible: false,
      reason: "Suggested exposure must be greater than zero",
      code: "TRANSFER_NOT_ELIGIBLE",
    };
  }

  if (decision.suggestedExposureUsdc > env.ARC_MAX_EXPOSURE_USDC) {
    return {
      eligible: false,
      reason: "Suggested exposure exceeds max exposure cap",
      code: "EXPOSURE_LIMIT_EXCEEDED",
    };
  }

  return { eligible: true };
}
