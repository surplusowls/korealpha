import { describe, expect, it } from "vitest";

import {
  calculateEdge,
  chooseAction,
  suggestExposureUsdc,
} from "@/lib/agent/scoring";

describe("agent scoring", () => {
  it("calculates probability edge", () => {
    expect(calculateEdge(0.51, 0.42)).toBe(0.09);
  });

  it("chooses trade only for high-confidence material edge", () => {
    expect(chooseAction(0.09, "high")).toBe("trade");
    expect(chooseAction(0.09, "medium")).toBe("watch");
    expect(chooseAction(0.01, "high")).toBe("avoid");
  });

  it("sizes trade exposure with a cap", () => {
    expect(suggestExposureUsdc(0.09, "high")).toBe(90);
    expect(suggestExposureUsdc(0.2, "high")).toBe(100);
    expect(suggestExposureUsdc(0.09, "medium")).toBe(0);
  });
});
