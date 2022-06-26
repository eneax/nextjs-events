import * as React from "react";
import type { AppProps } from "next/app";

import "../styles/globals.css";
import Header from "components/Header";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <React.Fragment>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
    </React.Fragment>
  );
};

export default MyApp;
