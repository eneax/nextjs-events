import * as React from "react";
import Head from "next/head";
import type { NextPage } from "next";

import Empty from "components/Empty";

const NotFound: NextPage = () => (
  <React.Fragment>
    <Head>
      <title>404</title>
      <meta name="description" content="Page not found" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Empty header="404" text="Page not found." />
  </React.Fragment>
);

export default NotFound;
