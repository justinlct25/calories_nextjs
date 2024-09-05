import { createStore } from 'zustand/vanilla'

export type UserState = {
  user: any
}

export type UserActions = {
  setUser: (user: any) => void
}

export type UserStore = UserState & UserActions

export const defaultInitState: UserState = {
  user: {

  },
}

export const createUserStore = (
  initState: UserState = defaultInitState,
) => {
  return createStore<UserStore>()((set) => ({
    ...initState,
    setUser: (user) => set((state) => ({ ...state, user: user })),
  }))
}