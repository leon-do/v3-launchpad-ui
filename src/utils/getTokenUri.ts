import { publicClient } from "../wagmi";
import { erc20Abi } from "../abis/erc20Abi";

export async function getTokenUri(
  tokenAddress: `0x${string}`
): Promise<TokenURI> {
  const uri = (await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "tokenURI",
  })) as string;
  const tokenUri: TokenURI = JSON.parse(atob(uri.split(",")[1]));
  return tokenUri;
}
