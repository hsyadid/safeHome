import type { Metadata } from "next";
import "./globals.css";

import { Navbar } from "../../components/elements/navbar";
import { Footer } from "../../components/elements/footer";


export const metadata: Metadata = {
  title: "SafeHome",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`w-full min-h-screen`}
      >
        <Navbar/>
        {children}
        <Footer/>

      </body>
    </html>
  );
}
