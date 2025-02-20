import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import NewTokens from "../components/NewTokens";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Launchpad</title>
        <meta content="Launchpad" name="Launchpad" />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main>
        <Link href="/create">
          <div className="text-4xl">HomePage</div>
          <button className="bg-blue-500 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-xl">
            Create Button
          </button>
        </Link>
        <NewTokens />
      </main>
    </div>
  );
};

export default Home;
