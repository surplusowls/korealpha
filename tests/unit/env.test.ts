import { describe, expect, it, vi } from "vitest";

describe("environment validation", () => {
  it("allows mock Arc mode without private keys", async () => {
    vi.stubEnv("ARC_TRANSFER_MODE", "mock");
    vi.resetModules();

    const { env } = await import("@/lib/env");

    expect(env.ARC_TRANSFER_MODE).toBe("mock");
  });

  it("enforces Arc testnet chain settings", async () => {
    vi.stubEnv("ARC_TRANSFER_MODE", "mock");
    vi.stubEnv("ARC_CHAIN_ID", "1");
    vi.resetModules();

    await expect(import("@/lib/env")).rejects.toThrow(
      /ARC_CHAIN_ID must be 5042002 for MVP/,
    );
  });

  it("requires valid private key in live mode", async () => {
    vi.stubEnv("ARC_TRANSFER_MODE", "live");
    vi.stubEnv("ARC_AGENT_PRIVATE_KEY", "bad-key");
    vi.stubEnv(
      "ARC_POSITION_WALLET_ADDRESS",
      "0x1111111111111111111111111111111111111111",
    );
    vi.resetModules();

    await expect(import("@/lib/env")).rejects.toThrow(
      /ARC_AGENT_PRIVATE_KEY must be a 32-byte hex string prefixed with 0x/,
    );
  });
});
