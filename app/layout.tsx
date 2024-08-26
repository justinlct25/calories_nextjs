import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/main.scss"
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import GlobalContextProviders from "@/components/GlobalContextProviders";





const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  

  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#252628] text-white`}>
        <GlobalContextProviders>
          <main className='flex flex-col justify-center items-center w-full'>
            <Navbar />
            {children}
            <Toaster />
          </main>
        </GlobalContextProviders>
      </body>
    </html>
  );
}
