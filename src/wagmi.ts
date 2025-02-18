import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createPublicClient, http } from "viem";

if (!process.env.NEXT_PUBLIC_RPC_URL)
  throw new Error("NEXT_PUBLIC_RPC_URL is not set");
if (!process.env.NEXT_PUBLIC_CHAIN_ID)
  throw new Error("NEXT_PUBLIC_CHAIN_ID is not set");
if (!process.env.NEXT_PUBLIC_CHAIN_SYMBOL)
  throw new Error("NEXT_PUBLIC_CHAIN_NAME is not set");

export const config = getDefaultConfig({
  appName: "Launchpad",
  projectId: "YOUR_PROJECT_ID",
  chains: [
    {
      id: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
      name: process.env.NEXT_PUBLIC_CHAIN_SYMBOL,
      rpcUrls: {
        default: { http: [process.env.NEXT_PUBLIC_RPC_URL] },
      },
      nativeCurrency: {
        name: process.env.NEXT_PUBLIC_CHAIN_SYMBOL,
        symbol: process.env.NEXT_PUBLIC_CHAIN_SYMBOL,
        decimals: 18,
      },
    },
  ],
});

export const publicClient = createPublicClient({
  chain: config.chains[0],
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});
