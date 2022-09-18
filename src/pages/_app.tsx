import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import { AuthWrapper } from "../component/AuthWrapper";

function MyApp({ Component, pageProps }: AppProps) {
  const guestRoutes = ["/login/", "/signup/"];

  return (
    <RecoilRoot>
      <AuthWrapper
        guestRoutes={guestRoutes}
        redirectIfAuthedRoutes={guestRoutes}
      >
        <Component {...pageProps} />
      </AuthWrapper>
    </RecoilRoot>
  );
}

export default MyApp;
