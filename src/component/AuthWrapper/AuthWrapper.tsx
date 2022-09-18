import { useRouter } from "next/router";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { UserState } from "../../global-states/auth.state";
import { auth } from "../../supabase";
import { Timeout } from "../../types/window.types";
import { AuthWrapperProps } from "./AuthWrapper.types";

const AuthWrapper: FC<AuthWrapperProps> = ({
  children,
  guestRoutes = [],
  redirectIfAuthedRoutes = [],
}) => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(UserState);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(true);
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

  const isGuestRoute = useMemo(() => {
    let guestRoute = false;
    const path = router.asPath;
    guestRoutes.forEach((route) => {
      if (path === route) {
        guestRoute = true;
      }
    });

    return guestRoute;
  }, [router, guestRoutes]);

  const isRedirectIfAuthedRoute = useMemo(() => {
    let authRoute = false;
    const path = router.asPath;
    redirectIfAuthedRoutes.forEach((route) => {
      if (path === route) {
        authRoute = true;
      }
    });

    return authRoute;
  }, [router, redirectIfAuthedRoutes]);

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
          await router.replace("/");
        }
        if (shouldRedirectAsGuest) {
          await router.replace("/login");
        }
      }
      // Prevent flash in browser
      timeout.current = setTimeout(() => {
        if (mounted) {
          setIsRedirecting(false);
        }
      }, 250);
    };

    authCheck();

    return () => {
      mounted = false;
    };
  }, [router, shouldRedirectBackBasedOnAuth, shouldRedirectAsGuest]);

  if (loading || isRedirecting) {
    return null;
  }

  return <>{children}</>;
};

export default AuthWrapper;
