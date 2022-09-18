import { useRouter } from "next/router";
import { FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { UserState } from "../../global-states/auth.state";
import { auth } from "../../supabase";
import { Timeout } from "../../types/window.types";
import { AuthWrapperProps } from "./AuthWrapper.types";
import globMatch from "wildcard-match";

const AuthWrapper: FC<AuthWrapperProps> = ({
  children,
  guestRoutes = [],
  redirectIfAuthedRoutes = [],
}) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState<boolean>(true);
  const userChecking = useRef<boolean>(false);
  const timeout = useRef<Timeout>(null);

  useEffect(() => {
    if (!userChecking.current) {
      userChecking.current = true;
      auth.getUser().then(({ data: { user }, error }) => {
        if (!error && user) {
          setUser(user);
        }
        setLoading(false);
        userChecking.current = false;
      });

      auth.onAuthStateChange((_event, session) => {
        setUser(session?.user || null);
        userChecking.current = false;
      });
    }
  }, [setUser]);

  const belongsInRoute = (routes: string[]) => {
    let matchedRoute = false;
    const path = router.asPath;
    routes.forEach((route) => {
      const routeMatch = globMatch(route);
      if (routeMatch(path) || path === route) {
        matchedRoute = true;
      }
    });

    return matchedRoute;
  };
  const isGuestRoute = belongsInRoute(guestRoutes);
  const isRedirectIfAuthedRoute = belongsInRoute(redirectIfAuthedRoutes);

  const shouldRedirectBackBasedOnAuth =
    isRedirectIfAuthedRoute && !loading && user;
  const shouldRedirectAsGuest = !isGuestRoute && !loading && !user;

  useEffect(() => {
    let mounted = true;

    const authCheck = async () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      if (shouldRedirectBackBasedOnAuth || shouldRedirectAsGuest) {
        if (shouldRedirectBackBasedOnAuth) {
          router.replace("/");
        }
        if (shouldRedirectAsGuest) {
          router.replace("/login");
        }
      }
    };

    authCheck();

    return () => {
      mounted = false;
    };
  }, [router, shouldRedirectBackBasedOnAuth, shouldRedirectAsGuest]);

  if (loading || (!isGuestRoute && !user)) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
