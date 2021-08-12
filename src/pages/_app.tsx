import { AppProps } from "next/app";
import Head from "next/head";

import { AppContext } from "../context/currentOffset";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Head>
        <title>Pokedex</title>
      </Head>
      <Component {...pageProps} />
    </AppContext>
  )
}

export default MyApp
