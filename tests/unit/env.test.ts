import { describe, expect, it, vi } from "vitest";

describe("environment validation", () => {
  it("allows mock Arc mode without private keys", async () => {
    vi.stubEnv("ARC_TRANSFER_MODE", "mock");
    vi.resetModules();

    const { env } = await import("@/lib/env");

    expect(env.ARC_TRANSFER_MODE).toBe("mock");
  });
});
