export type MockArcTransfer = {
  mode: "mock";
  receiptId: string;
  status: "not_submitted";
};

export function createMockArcTransfer(receiptId: string): MockArcTransfer {
  return {
    mode: "mock",
    receiptId,
    status: "not_submitted",
  };
}
