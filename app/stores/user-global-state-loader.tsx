'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'

import { useSession } from "next-auth/react"
import { useState, useEffect } from "react";
import { useUserStore } from './user-store-provider';


export interface UserGlobalStateLoaderProps {
    children: ReactNode
  }
  
  export const UserGlobalStateLoader = ({
    children,
  }: UserGlobalStateLoaderProps) => {
    const { data: session, status } = useSession()
    const { user, setUser } = useUserStore(
      (state: any) => state,
    )
  
    useEffect(() => {
      if (session) {
        setUser(session.user);
      }
    }, [session])

    return (
        <div>
          {children}
        </div>
      )

  }