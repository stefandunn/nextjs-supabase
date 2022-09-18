import type { NextPage } from "next";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { UserState } from "../global-states/auth.state";

const Home: NextPage = () => {
  const user = useRecoilValue(UserState);

  return (
    <div>
      <Head>
        <title>Supabase NextJS App</title>
        <meta name="description" content="A Supabase powered NextJS app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Hello {user?.email}</h1>
    </div>
  );
};

export default Home;
