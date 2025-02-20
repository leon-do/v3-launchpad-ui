export async function getNewTokens(): Promise<TokenInfo[]> {
  const subgraphUrl =
    "https://gateway.thegraph.com/api/1124160e294feb0810e9eab14d14904e/subgraphs/id/GqzP4Xaehti8KSfQmv3ZctFSjnSUYZ4En5NRsiTbvZpz";

  const positionQuery = `
    query GetPositions {
      positions(
        # where: {owner: "${process.env.NEXT_PUBLIC_LAUNCHPAD_ADDRESS}"}
        first: 1000
      ) {
        id
        token1 {
          name
          id
        }
        token0 {
          name
          id
        }
      }
    }
  `;
  const positions = await fetch(subgraphUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query: positionQuery }),
  })
    .then((res) => res.json())
    .then((res) => res.data.positions);

  // sort by id desc and filter where token0.name contains "wrapped"
  const filteredTokens = positions
    .sort((a: any, b: any) => b.id - a.id)
    .map(
      (position: {
        token0: { name: string; id: string };
        token1: { name: string; id: string };
      }) => {
        return position.token0.name.toLowerCase().includes("wrapped")
          ? position.token1.id
          : position.token0.id;
      }
    );

  const dexScreenerUrl = `https://api.dexscreener.com/tokens/v1/base/${Array.from(
    new Set(filteredTokens)
  )}`;
  const tokenInfo: TokenInfo[] = await fetch(dexScreenerUrl).then((res) =>
    res.json()
  );
  return tokenInfo;
}
