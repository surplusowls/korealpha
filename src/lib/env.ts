import { z } from "zod";

const ARC_TESTNET_RPC_URL = "https://rpc.testnet.arc.network";
const ARC_TESTNET_CHAIN_ID = 5_042_002;
const ARC_TESTNET_EXPLORER_URL = "https://testnet.arcscan.app";
const ARC_TESTNET_USDC_ADDRESS = "0x3600000000000000000000000000000000000000";

const evmAddressSchema = z.string().regex(/^0x[a-fA-F0-9]{40}$/);

const envSchema = z
  .object({
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    MARKET_DATA_MODE: z.enum(["live", "seeded"]).default("seeded"),
    AI_MODE: z.enum(["live", "fixture"]).default("fixture"),
    ARC_TRANSFER_MODE: z.enum(["live", "mock"]).default("mock"),
    OPENAI_API_KEY: z.string().optional(),
    ARC_RPC_URL: z.string().url().default(ARC_TESTNET_RPC_URL),
    ARC_CHAIN_ID: z.coerce.number().default(ARC_TESTNET_CHAIN_ID),
    ARC_EXPLORER_URL: z.string().url().default(ARC_TESTNET_EXPLORER_URL),
    ARC_USDC_ADDRESS: evmAddressSchema.default(ARC_TESTNET_USDC_ADDRESS),
    ARC_MAX_EXPOSURE_USDC: z.coerce.number().positive().default(10),
    ARC_AGENT_PRIVATE_KEY: z.string().optional(),
    ARC_POSITION_WALLET_ADDRESS: evmAddressSchema.optional(),
    DATABASE_URL: z.string().default("file:./local.db"),
  })
  .superRefine((env, context) => {
    if (env.ARC_CHAIN_ID !== ARC_TESTNET_CHAIN_ID) {
      context.addIssue({
        code: "custom",
        path: ["ARC_CHAIN_ID"],
        message: `ARC_CHAIN_ID must be ${ARC_TESTNET_CHAIN_ID} for MVP`,
      });
    }

    if (env.ARC_RPC_URL !== ARC_TESTNET_RPC_URL) {
      context.addIssue({
        code: "custom",
        path: ["ARC_RPC_URL"],
        message: `ARC_RPC_URL must be ${ARC_TESTNET_RPC_URL} for MVP`,
      });
    }

    if (env.ARC_EXPLORER_URL !== ARC_TESTNET_EXPLORER_URL) {
      context.addIssue({
        code: "custom",
        path: ["ARC_EXPLORER_URL"],
        message: `ARC_EXPLORER_URL must be ${ARC_TESTNET_EXPLORER_URL} for MVP`,
      });
    }

    if (env.ARC_USDC_ADDRESS.toLowerCase() !== ARC_TESTNET_USDC_ADDRESS) {
      context.addIssue({
        code: "custom",
        path: ["ARC_USDC_ADDRESS"],
        message: `ARC_USDC_ADDRESS must be ${ARC_TESTNET_USDC_ADDRESS} for MVP`,
      });
    }

    if (env.ARC_TRANSFER_MODE === "live") {
      if (!env.ARC_AGENT_PRIVATE_KEY) {
        context.addIssue({
          code: "custom",
          path: ["ARC_AGENT_PRIVATE_KEY"],
          message: "ARC_AGENT_PRIVATE_KEY is required in live Arc mode",
        });
      } else if (!/^0x[a-fA-F0-9]{64}$/.test(env.ARC_AGENT_PRIVATE_KEY)) {
        context.addIssue({
          code: "custom",
          path: ["ARC_AGENT_PRIVATE_KEY"],
          message:
            "ARC_AGENT_PRIVATE_KEY must be a 32-byte hex string prefixed with 0x",
        });
      }

      if (!env.ARC_POSITION_WALLET_ADDRESS) {
        context.addIssue({
          code: "custom",
          path: ["ARC_POSITION_WALLET_ADDRESS"],
          message: "ARC_POSITION_WALLET_ADDRESS is required in live Arc mode",
        });
      }
    }
  });

export const env = envSchema.parse(process.env);
