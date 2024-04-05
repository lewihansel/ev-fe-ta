import { Poppins } from "next/font/google";
import type { AppProps } from "next/app";
import Navbar from "@/components/Navbar";
import "@/styles/globals.scss";

const fontFamily = Poppins({
  subsets: ["latin"],
  weight: "400",
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`page-container ${fontFamily.className}`}>
      <Navbar />
      <div className="page-content">
        <Component {...pageProps} />
      </div>
      <footer>
        <p>© 2024 Brown Commerce. All rights reserved.</p>
      </footer>
    </main>
  );
}
