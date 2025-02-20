import { publicClient } from "../config";
import { launchpadAbi } from "../abis/launchpadAbi";

export async function getTokenUris(): Promise<TokenURIs> {
  // get all logs emitted from launchpad
  const logs: any = await publicClient.getLogs({
    address: process.env.NEXT_PUBLIC_LAUNCHPAD_ADDRESS as `0x${string}`,
    event: launchpadAbi[3] as any,
    fromBlock: BigInt(0),
    toBlock: "latest",
  });
  // map token address to TokenURI
  const tokenUris: TokenURIs = {};
  logs.forEach((log: any) => {
    tokenUris[log.args._token] = JSON.parse(
      atob(log.args._tokenURI.split(",")[1])
    );
  });
  return tokenUris;
}
