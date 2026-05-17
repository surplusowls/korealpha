import { describe, expect, it } from "vitest";

import { toUsdcUnits } from "@/lib/arc/usdc";

describe("USDC unit conversion", () => {
  it("converts decimal usdc to 6-decimal bigint units", () => {
    expect(toUsdcUnits(1)).toBe(BigInt(1_000_000));
    expect(toUsdcUnits(0.5)).toBe(BigInt(500_000));
    expect(toUsdcUnits(10.123456)).toBe(BigInt(10_123_456));
  });

  it("rounds to nearest 6-decimal unit", () => {
    expect(toUsdcUnits(0.0000004)).toBe(BigInt(0));
    expect(toUsdcUnits(0.0000006)).toBe(BigInt(1));
  });
});
