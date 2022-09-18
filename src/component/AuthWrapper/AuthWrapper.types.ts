import { PropsWithChildren } from "react";

export type AuthWrapperProps = PropsWithChildren<{
  guestRoutes?: string[];
  redirectIfAuthedRoutes?: string[];
}>;
