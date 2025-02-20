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
          <h1>HomePage</h1>
          <button>CreateButton</button>
        </Link>
        <NewTokens />
      </main>
    </div>
  );
};

export default Home;
