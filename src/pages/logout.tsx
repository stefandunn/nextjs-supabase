import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { UserState } from "../global-states/auth.state";
import { auth } from "../supabase";

const Logout: NextPage = () => {
  const setUser = useSetRecoilState(UserState);
  const router = useRouter();

  useEffect(() => {
    auth.signOut().then(({ error }) => {
      if (error) {
        alert("Could not log out!");
        router.push("/");
      } else {
        setUser(null);
        router.push("/login");
      }
    });
  }, [router, setUser]);

  return null;
};

export default Logout;
