export const usdcDecimals = 6;

export function toUsdcUnits(amount: number) {
  return BigInt(Math.round(amount * 10 ** usdcDecimals));
}
