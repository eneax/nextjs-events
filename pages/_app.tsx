import * as React from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../styles/globals.css";

import { NotificationProvider } from "context/NotificationContext";

import Layout from "components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <NotificationProvider>
    <Layout>
      <Head>
        <title>Next Events</title>
        <meta
          name="description"
          content="The best Next.js Events around you!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  </NotificationProvider>
);

export default MyApp;
