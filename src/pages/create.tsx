import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import { useWriteContract } from "wagmi";
import { launchpadAbi } from "../abis/launchpadAbi";
import { uploadImage } from "../utils/uploadImage";

const Create: NextPage = () => {
  const { data: hash, error, writeContract } = useWriteContract();

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const imageUrl = await uploadImage(formData.get("image") as File);
    const metadata: TokenURI = {
      image: imageUrl,
      description: formData.get("description") as string,
      website: formData.get("website") as string,
      x: formData.get("x") as string,
      discord: formData.get("discord") as string,
      telegram: formData.get("telegram") as string,
    };
    const tokenURI =
      "data:application/json;base64," + btoa(JSON.stringify(metadata));
    // https://wagmi.sh/react/guides/write-to-contract#_4-hook-up-the-usewritecontract-hook
    writeContract({
      address: process.env.NEXT_PUBLIC_LAUNCHPAD_ADDRESS as `0x${string}`,
      abi: launchpadAbi,
      functionName: "launchToken",
      args: [
        process.env
          .NEXT_PUBLIC_NON_FUNGIBLE_POSITION_MANAGER_ADDRESS as `0x${string}`,
        formData.get("name"),
        formData.get("symbol"),
        tokenURI,
      ],
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
          <input type="text" name="name" placeholder="Name" required />
          <input type="text" name="symbol" placeholder="Symbol" required />
          <input type="text" name="description" placeholder="Description" />
          <input type="url" name="website" placeholder="https://token.com/" />
          <input type="url" name="x" placeholder="http://x.com/username" />
          <input
            type="url"
            name="discord"
            placeholder="https://discord.gg/abc123"
          />
          <input
            type="url"
            name="telegram"
            placeholder="https://t.me/+abc123"
          />
          <input type="file" name="image" required />
          <button type="submit">Create</button>
          {hash && (
            <div>
              {process.env.NEXT_PUBLIC_EXPLORER_URL}/tx/{hash}
            </div>
          )}
          {error && <div>{error.message}</div>}
        </form>
      </main>
    </div>
  );
};

export default Create;
