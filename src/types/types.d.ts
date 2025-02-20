interface TokenURI {
  image: string;
  description?: string;
  website?: string;
  x?: string;
  discord?: string;
  telegram?: string;
}

interface TokenURIs {
  [key: `0x${string}`]: TokenURI;
}

interface TokenInfo {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  priceNative: string;
  priceUsd: string;
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
  labels: string[];
  volume: Record<string, number>;
  priceChange: Record<string, number>;
  baseToken: Token;
  quoteToken: Token;
  liquidity: {
    usd: number;
    base: number;
    quote: number;
  };
  boosts: {
    active: number;
  };
  txns: Record<string, { buys: number; sells: number; }>;
  info: {
    imageUrl: string;
    websites: { url: string }[];
    socials: { platform: string; handle: string }[];
  };
}