import create from "zustand";
import { UserModel } from "../models/UserModel";

interface IUserState
{
   user: UserModel | null,
   refreshToken: string|null,
   setUser: (user: UserModel) => void,
   unsetUser: () => void,
   setRefreshToken: (token : string) => void
}

const useUserStore = create<IUserState>((set) =>({
    user: null,
    refreshToken: null,
    setUser: (newUser) => set((state) => ({user:newUser})),
    unsetUser: () => set((state) => ({user:null})),
    setRefreshToken: (token) => set((state) =>({refreshToken:token}))
}));

export default useUserStore;