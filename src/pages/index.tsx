import Image from "next/image";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const pass = "PatrioBimasuci";
  return (
    <div className={`${geistSans.variable} font-bold text-3xl text-center`}>
      <h1>Hello world, My name is Patrio Bimasuci, i'm a software developer</h1>
    </div>
  );
}
