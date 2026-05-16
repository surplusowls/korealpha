import { z } from "zod";

const envSchema = z
  .object({
    NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
    MARKET_DATA_MODE: z.enum(["live", "seeded"]).default("seeded"),
    AI_MODE: z.enum(["live", "fixture"]).default("fixture"),
    ARC_TRANSFER_MODE: z.enum(["live", "mock"]).default("mock"),
    OPENAI_API_KEY: z.string().optional(),
    ARC_RPC_URL: z.string().url().default("https://rpc.testnet.arc.network"),
    ARC_CHAIN_ID: z.coerce.number().default(5042002),
    ARC_EXPLORER_URL: z.string().url().default("https://testnet.arcscan.app"),
    ARC_USDC_ADDRESS: z
      .string()
      .regex(/^0x[a-fA-F0-9]{40}$/)
      .default("0x3600000000000000000000000000000000000000"),
    ARC_AGENT_PRIVATE_KEY: z.string().optional(),
    ARC_POSITION_WALLET_ADDRESS: z.string().optional(),
    DATABASE_URL: z.string().default("file:./local.db"),
  })
  .superRefine((env, context) => {
    if (env.ARC_TRANSFER_MODE === "live") {
      if (!env.ARC_AGENT_PRIVATE_KEY) {
        context.addIssue({
          code: "custom",
          path: ["ARC_AGENT_PRIVATE_KEY"],
          message: "ARC_AGENT_PRIVATE_KEY is required in live Arc mode",
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
