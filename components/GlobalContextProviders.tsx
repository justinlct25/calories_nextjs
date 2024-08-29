"use client";

import { SessionProvider } from "next-auth/react"
import { UserStoreProvider } from "@/app/stores/user-store-provider";
import { UserGlobalStateLoader } from "@/app/stores/user-global-state-loader";

import { FC, ReactNode } from 'react';

interface GlobalContextProviderProps {
    children: ReactNode
}

const GlobalContextProviders: FC<GlobalContextProviderProps> = ({ children }) => {
    return (
        <SessionProvider>
            <UserStoreProvider>
                <UserGlobalStateLoader>
                    {children}
                </UserGlobalStateLoader>
            </UserStoreProvider>
        </SessionProvider>
    )
}

export default GlobalContextProviders;