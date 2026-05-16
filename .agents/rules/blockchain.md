# korealpha Blockchain Rules

Use these rules for Arc Testnet, viem, wallet, USDC transfer, and transaction receipt work.

## Network

Arc Testnet only:

- RPC: `https://rpc.testnet.arc.network`
- Chain ID: `5042002`
- Currency: `USDC`
- Explorer: `https://testnet.arcscan.app`
- USDC ERC-20 interface: `0x3600000000000000000000000000000000000000`

## Hard Rules

- Do not add mainnet support in MVP.
- Do not execute real-money transactions.
- Do not commit private keys.
- Do not expose server wallet secrets to client-side code.
- Do not accept arbitrary transfer instructions directly from the browser.

## Transfer Flow

The transfer endpoint should accept a decision receipt id, not arbitrary transfer parameters.

Required flow:

1. Load the decision receipt server-side.
2. Validate action, confidence, edge, and exposure limits.
3. Confirm Arc Testnet chain id.
4. Convert amount using the USDC ERC-20 interface decimals.
5. Sign server-side.
6. Store tx hash and Arcscan URL.
7. Link transaction to the decision receipt.

## Demo Modes

Support:

- `ARC_TRANSFER_MODE=mock`
- `ARC_TRANSFER_MODE=live`

Default local development should be mock until a testnet wallet is configured.
