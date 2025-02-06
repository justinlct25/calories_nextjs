'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import { useUserStore } from './user-store-provider';


export interface UserGlobalStateLoaderProps {
    children: ReactNode
  }

  export interface UserGlobalState {
    id: string;
    name: string;
    email: string;
    emailVerified: string | null;
    image: string | null;
    donor: any;
    admin: any;
    isAdmin: boolean;
}
  
  export const UserGlobalStateLoader = ({
    children,
  }: UserGlobalStateLoaderProps) => {
    const { data: session, status } = useSession()
    const { setUser } = useUserStore(
      (state: any) => state,
    )
  
    useEffect(() => {
      if (session) {
        fetch(`/api/user`)
        .then((res) => res.json())
        .then((data) => {
            setUser(data.user as UserGlobalState)
        })
      }
    }, [session])

    return (
        <>
          {children}
        </>
      )

  }