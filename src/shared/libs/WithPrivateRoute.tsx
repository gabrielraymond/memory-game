/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cookie from "js-cookie";
import dynamic from "next/dynamic";
import { DASHBOARD_HOME, DASHBOARD_LOGIN } from "../constants/Path";

import { CheckIsAuthRoute, CheckIsPrivateRoute } from "../helpers/route";
// import Login from "../../features/login/ui/components/Login";

/**
 *
 * @param WrappedComponent
 * @returns
 * Component with additonal props auth
 * and checking of authentication
 */

export default function withPrivateRoute(WrappedComponent: any) {
  return (props: any) => {
    const router = useRouter();
    const token = cookie.get("token");
    const [isNull, setIsNull] = useState(false);

    useEffect(() => {
      // token not authenticated & accessing private route
      if (!token && CheckIsPrivateRoute(router.route)) {
        router.replace(DASHBOARD_LOGIN);
        setIsNull(true);
        return;
      }
      // token authenticated accessing private route then redirect to dashboard home
      if (token && CheckIsAuthRoute(router.route)) {
        router.replace(DASHBOARD_HOME);
        setIsNull(true);
      }
    }, []);

    // if not authenticated & token accessing private route, render nothing
    // render nothing to wait redirection
    // if (!token && CheckIsPrivateRoute(router.route)) {
    //   return null;
    // }

    // if authenticated & token accessing auth route, render nothing
    // render nothing to wait redirection
    // if (token && CheckIsAuthRoute(router.route)) {
    //   return null;
    // }

    return <WrappedComponent {...props} auth={token} />;
  };
}
