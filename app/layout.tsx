import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/main.scss"
import Navbar from "@/components/Navbar";
// import Provider from "@/components/Provider";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react"
import { CounterStoreProvider } from "./stores/counter-store-provider";
import { UserStoreProvider } from "./stores/user-store-provider";
import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import { useUserStore } from "./stores/user-store-provider";
import { UserGlobalStateLoader } from "./stores/user-global-state-loader";




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
        {/* <Provider> */}
        <SessionProvider>
          <UserStoreProvider>
            <UserGlobalStateLoader>
              <main className='flex flex-col justify-center items-center w-full'>
                <Navbar />
                {children}
              </main>
              <Toaster />
            </UserGlobalStateLoader>
          </UserStoreProvider>
        </SessionProvider>
        {/* </Provider> */}
      </body>
    </html>
  );
}
