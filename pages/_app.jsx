// pages/_app.jsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import "../styles/globals.css";

// Google Analytics helper
const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // Add to .env.local

function pageview(url) {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_ID, { page_path: url });
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // SXO: Track page views for analytics
  useEffect(() => {
    const handleRouteChange = (url) => pageview(url);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  // SXO: Scroll to top on navigation
  useEffect(() => {
    const handleStart = () => window.scrollTo(0, 0);
    router.events.on("routeChangeStart", handleStart);
    return () => router.events.off("routeChangeStart", handleStart);
  }, [router.events]);

  return <Component {...pageProps} />;
}
