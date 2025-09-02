import {create} from 'zustand'
import {createJSONStorage, persist } from 'zustand/middleware'
import AsyncStorag from '@react-native-async-storage/async-storage'

export const useAuth = create((set) => (
    persist ((set) => ({
         user: null,
  token: null,

  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
}), {
    name: 'auth-store',
    storage: createJSONStorage(() => AsyncStorag)
})
 
));
