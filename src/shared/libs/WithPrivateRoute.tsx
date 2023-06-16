import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { DASHBOARD_HOME, LOGIN } from "../constants/Path";
import { CheckIsAuthRoute, CheckIsPrivateRoute } from "../helpers/route";

/**
 *
 * @param WrappedComponent
 * @returns
 * Component with additional props auth
 * and checking of authentication
 */

export default function withPrivateRoute(WrappedComponent: any) {
  return (props: any) => {
    const router = useRouter();
    const token = Cookies.get("token");

    useEffect(() => {
      // token not authenticated & accessing private route
      if (!token && CheckIsPrivateRoute(router.route)) {
        router.replace(LOGIN);
        return;
      }
      // token authenticated accessing private route then redirect to dashboard home
      if (token && CheckIsAuthRoute(router.route)) {
        router.replace(DASHBOARD_HOME);
      }
    }, []);

    // if not authenticated & token accessing private route, render nothing
    // render nothing to wait redirection
    if (token && CheckIsPrivateRoute(router.route)) {
      return null;
    }

    // if authenticated & token accessing auth route, render nothing
    // render nothing to wait redirection
    if (token && CheckIsAuthRoute(router.route)) {
      return null;
    }

    return <WrappedComponent {...props} auth={token} />;
  };
}
