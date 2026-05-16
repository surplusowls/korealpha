export type PolymarketMarketSnapshot = {
  marketId: string;
  probability: number;
  updatedAt: string;
};

export async function getPolymarketSnapshot() {
  return null satisfies PolymarketMarketSnapshot | null;
}
