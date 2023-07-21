import { create } from "zustand";

interface AuthStore {
  token?: string;
  isAuth: boolean;
  user?:User;
  setUser: (user: any) => void;
  setToken: (token?: string) => void;
  setIsAuth: (isAuth: boolean) => void;
}

const useAuth = create<AuthStore>((set) => ({
  isAuth: false,
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setIsAuth: (isAuth) => set({ isAuth }),
}));


export default useAuth;
