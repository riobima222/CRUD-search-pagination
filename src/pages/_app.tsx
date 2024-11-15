import ContactContextProvider from "@/context/contacts";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <ContactContextProvider>
        <Component {...pageProps} />
      </ContactContextProvider>
    </div>
  );
}
