"use strict";
import Layout from "../src/components/Layout";
import "../src/app/globals.css";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Load Mapbox stylesheet conditionally if on a map-related page
    if (router.pathname.includes("/map")) {
      const mapboxLink = document.createElement("link");
      mapboxLink.rel = "stylesheet";
      mapboxLink.href =
        "https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css";
      document.head.appendChild(mapboxLink);
    }
  }, [router.pathname]);

  return (
    <Layout>
      <Head>
        <title>My App</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
