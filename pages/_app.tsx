import * as React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";
import Header from "components/Header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <Head>
        <title>Next Events</title>
        <meta
          name="description"
          content="The best Next.js Events around you!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </React.Fragment>
  );
};

export default MyApp;
