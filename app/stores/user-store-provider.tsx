'use client'

import { type ReactNode, createContext, useRef, useContext } from 'react'
import { useStore } from 'zustand'

import { type UserStore, createUserStore } from './user-store'

export type UserStoreApi = ReturnType<typeof createUserStore>

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined,
)

export interface UserStoreProviderProps {
  children: ReactNode
}

export const UserStoreProvider = ({
  children,
}: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi>()
  if (!storeRef.current) {
    storeRef.current = createUserStore()
  }

  return (
    <UserStoreContext.Provider value={storeRef.current}>
      {children}
    </UserStoreContext.Provider>
  )
}

export const useUserStore = <T,>(
  selector: (store: UserStore) => T,
): T => {
  const counterStoreContext = useContext(UserStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}