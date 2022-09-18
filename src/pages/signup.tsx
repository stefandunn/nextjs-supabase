import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { UserState } from "../global-states/auth.state";
import { auth } from "../supabase";

const Signup: NextPage = () => {
  const setUser = useSetRecoilState(UserState);
  const [invalid, setInvalid] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const router = useRouter();

  const handleSignup = (e: FormEvent) => {
    e.preventDefault();
    setInvalid(false);
    setError(null);
    if (!email || email.length < 4 || !password || password.length === 0) {
      setInvalid(true);
    }

    auth
      .signUp({
        email: email as string,
        password: password as string,
      })
      .then(({ data, error }) => {
        if (error) {
          setError(error.message);
        } else {
          setUser(data.user);
          router.replace("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        console.log("Complete request");
      });
  };

  return (
    <form method="post" onSubmit={handleSignup}>
      <h1>Sign up</h1>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email address"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </div>

      {invalid && <div>Email or password is invalid.</div>}
      {error && <div>{error}</div>}

      <div>
        <button type="submit">Sign up</button>
      </div>

      <Link href="/login">
        <a>Already have account?</a>
      </Link>
    </form>
  );
};

export default Signup;
