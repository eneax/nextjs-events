import * as React from "react";
import Head from "next/head";
import type { NextPage } from "next";

import Header from "components/Header";
import Empty from "components/Empty";

const NotFound: NextPage = () => (
  <React.Fragment>
    <Head>
      <title>404</title>
      <meta name="description" content="Page not found" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header heading="404" />

    <Empty
      header="Not Found"
      text="You just hit a route that doesn't exist... the sadness."
    />
  </React.Fragment>
);

export default NotFound;
