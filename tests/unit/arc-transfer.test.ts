import { describe, expect, it } from "vitest";

import { validateTransferEligibility } from "@/lib/arc/eligibility";

describe("arc transfer eligibility", () => {
  it("rejects low confidence decisions", () => {
    const result = validateTransferEligibility({
      id: "r1",
      action: "trade",
      confidence: "low",
      suggestedExposureUsdc: 5,
    });

    expect(result.eligible).toBe(false);
    expect(result.code).toBe("TRANSFER_NOT_ELIGIBLE");
  });

  it("rejects non-transfer actions and zero exposures", () => {
    const avoid = validateTransferEligibility({
      id: "r2",
      action: "avoid",
      confidence: "high",
      suggestedExposureUsdc: 5,
    });
    const zeroExposure = validateTransferEligibility({
      id: "r3",
      action: "trade",
      confidence: "high",
      suggestedExposureUsdc: 0,
    });

    expect(avoid.eligible).toBe(false);
    expect(zeroExposure.eligible).toBe(false);
  });

  it("rejects exposure above configured cap", () => {
    const result = validateTransferEligibility({
      id: "r4",
      action: "trade",
      confidence: "high",
      suggestedExposureUsdc: 999,
    });

    expect(result.eligible).toBe(false);
    expect(result.code).toBe("EXPOSURE_LIMIT_EXCEEDED");
  });

  it("accepts trade decisions within cap", () => {
    const result = validateTransferEligibility({
      id: "r5",
      action: "trade",
      confidence: "high",
      suggestedExposureUsdc: 5,
    });

    expect(result.eligible).toBe(true);
  });
});
