import { useEffect, useState } from "react";
import { getNewTokens } from "../utils/getNewTokens";
import { formatNumber } from "../utils/formatNumber";

export default function NewTokens() {
  const [newTokens, setNewTokens] = useState<TokenInfo[]>([]);

  useEffect(() => {
    getNewTokens().then((newTokens) => {
      setNewTokens(newTokens);
    });
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>Volume</th>
            <th>1H</th>
            <th>6H</th>
            <th>24H</th>
            <th>Liquidity</th>
            <th>Market Cap</th>
            <th>Trade</th>
          </tr>
        </thead>
        <tbody>
          {newTokens.map((token) => (
            <tr>
              <td>{token.baseToken.name}</td>
              <td>{token.baseToken.symbol}</td>
              <td>${formatNumber(token.priceUsd)}</td>
              <td>{formatNumber(token.volume.h24)}</td>
              <td>
                {token.priceChange.h1
                  ? formatNumber(token.priceChange.h1) + "%"
                  : ""}
              </td>
              <td>
                {token.priceChange.h6
                  ? formatNumber(token.priceChange.h6) + "%"
                  : ""}
              </td>
              <td>
                {token.priceChange.h24
                  ? formatNumber(token.priceChange.h24) + "%"
                  : ""}
              </td>
              <td>{formatNumber(token.liquidity.usd)}</td>
              <td>{formatNumber(token.marketCap)}</td>
              <td>
                <a
                  href={`https://dexscreener.com/base/${token.baseToken.address}`}
                  target="_blank"
                >
                  Buy
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
