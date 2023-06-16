import "../styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider, MutationCache } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { Hydrate } from "react-query/hydration";

import { useEffect, useState } from "react";
import LayoutComponents from "../src/shared/components/Layout";
import { CheckIsPrivateRoute } from "../src/shared/helpers/route";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // 1m
            retry: false,
          },
        },
        mutationCache: new MutationCache({
          onError: (err) => {
            console.log(err);
          },
        }),
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <LayoutComponents isShow={CheckIsPrivateRoute(router.route)}>
          <Component {...pageProps} />
        </LayoutComponents>
      </Hydrate>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
