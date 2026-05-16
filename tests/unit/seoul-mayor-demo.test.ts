import { describe, expect, it } from "vitest";

import { arcTestnet } from "@/lib/arc/chain";
import { seoulMayorDemo } from "@/lib/market-data/seoul-mayor-demo";
import { getSeededEvidenceForMarket } from "@/lib/market-data/seeded-evidence";
import { getSeededMarket } from "@/lib/market-data/seeded-markets";

describe("seoul mayor demo data", () => {
  it("keeps the seeded market aligned with the backend-ready demo model", () => {
    const seededMarket = getSeededMarket(seoulMayorDemo.id);

    expect(seededMarket).toMatchObject({
      id: seoulMayorDemo.id,
      title: seoulMayorDemo.title,
      outcome: "Oh Se-hoon YES",
      marketProbability: seoulMayorDemo.marketProbability,
      agentProbability: seoulMayorDemo.agentProbability,
      action: seoulMayorDemo.action,
    });
  });

  it("contains source-backed evidence for the Seoul mayor market", () => {
    const seededEvidence = getSeededEvidenceForMarket(seoulMayorDemo.id);

    expect(seoulMayorDemo.evidence.length).toBeGreaterThanOrEqual(5);
    expect(seededEvidence).toHaveLength(seoulMayorDemo.evidence.length);
    expect(
      seoulMayorDemo.evidence.every((item) =>
        item.sourceUrl.startsWith("https://"),
      ),
    ).toBe(true);
    expect(
      seoulMayorDemo.evidence.some((item) => item.sourceType === "poll"),
    ).toBe(true);
  });

  it("keeps Arc action paper/testnet only", () => {
    expect(seoulMayorDemo.arcTransfer).toMatchObject({
      mode: "paper_testnet",
      status: "mock_ready",
      chainId: arcTestnet.id,
      txHash: null,
    });
    expect(seoulMayorDemo.receipt.suggestedExposureUsdc).toBeLessThanOrEqual(
      10,
    );
  });
});
