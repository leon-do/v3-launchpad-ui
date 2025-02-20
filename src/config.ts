import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { createPublicClient, http } from "viem";

if (!process.env.NEXT_PUBLIC_RPC_URL) throw new Error("!NEXT_PUBLIC_RPC_URL");
if (!process.env.NEXT_PUBLIC_CHAIN_ID) throw new Error("!NEXT_PUBLIC_CHAIN_ID");
if (!process.env.NEXT_PUBLIC_CHAIN_SYMBOL)
  throw new Error("!NEXT_PUBLIC_CHAIN_NAME");
if (!process.env.NEXT_PUBLIC_LAUNCHPAD_ADDRESS)
  throw new Error("!NEXT_PUBLIC_LAUNCHPAD_ADDRESS");
if (!process.env.NEXT_PUBLIC_NON_FUNGIBLE_POSITION_MANAGER_ADDRESS)
  throw new Error("!NEXT_PUBLIC_NON_FUNGIBLE_POSITION_MANAGER_ADDRESS");
if (!process.env.NEXT_PUBLIC_EXPLORER_URL)
  throw new Error("!NEXT_PUBLIC_EXPLORER_URL");

export const wagmi = getDefaultConfig({
  appName: "Launchpad",
  projectId: "YOUR_PROJECT_ID",
  // https://www.rainbowkit.com/docs/custom-chains
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
      blockExplorers: {
        default: {
          name: "Explorer",
          url: process.env.NEXT_PUBLIC_EXPLORER_URL,
        },
      },
    },
  ],
});

export const publicClient = createPublicClient({
  chain: wagmi.chains[0],
  transport: http(process.env.NEXT_PUBLIC_RPC_URL),
});
