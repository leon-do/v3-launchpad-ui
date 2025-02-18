import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useWriteContract } from "wagmi";
import { launchpadAbi } from "../abis/launchpadAbi";

const Create: NextPage = () => {
  const { data: hash, writeContract } = useWriteContract();

  const handleCreate = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("name");
    const symbol = formData.get("symbol");
    const website = formData.get("website");
    const metadata = JSON.stringify({
      website,
      // TODO add more links
    });
    // https://wagmi.sh/react/guides/write-to-contract#_4-hook-up-the-usewritecontract-hook
    // https://explorer-pepe-unchained-test-ypyaeq1krb.t.conduit.xyz/address/0xB641e4920774e83C812f30134b01Ed1d55146236?tab=read_write_contract#0x19f2d255
    writeContract({
      address: process.env.NEXT_PUBLIC_LAUNCHPAD_ADDRESS as `0x${string}`,
      abi: launchpadAbi,
      functionName: "launchToken",
      args: [name, symbol, metadata],
      value: BigInt("10000000000000"),
    });
  };
  return (
    <div>
      <Head>
        <title>Create</title>
        <meta content="Create" name="Create" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <h1>CreatePage</h1>
        <ConnectButton />
        <form onSubmit={handleCreate}>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="symbol" placeholder="Symbol" />
          <input type="url" name="website" placeholder="https://token.com/" />
          <button type="submit">Create</button>
          {hash && (
            <div>
              {process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/{hash}
            </div>
          )}
        </form>
      </main>
    </div>
  );
};

export default Create;
