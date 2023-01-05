import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>Weather - Subham Karmakar</title>
        <meta name="description" content="Check weather of your current location." />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://weather.subhamk.com" />
        <meta name="twitter:title" content="Weather - Subham Karmakar" />
        <meta name="twitter:description" content="Check weather of your current location." />
        <meta name="twitter:image" content="https://weather.subhamk.com/android-chrome-192x192.png" />
        <meta name="twitter:creator" content="@SubhamK108" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Weather - Subham Karmakar" />
        <meta property="og:description" content="Check weather of your current location." />
        <meta property="og:site_name" content="Weather - Subham Karmakar" />
        <meta property="og:url" content="https://weather.subhamk.com" />
        <meta property="og:image" content="https://weather.subhamk.com/android-chrome-192x192.png" />
      </Head>

      <Script src="https://maxdow.github.io/skycons/skycons.js" />

      <Component {...pageProps} />
    </>
  );
}
