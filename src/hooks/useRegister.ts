import { create } from "zustand";

interface RegisterStore {
  step: number;
  userDetail?: any;
  isCompleted: boolean;
  setDetail: (detail: any) => void;
  setIsCompleted: (isCompleted: boolean) => void;
  setStep: (step: number) => void;
}

const useRegister = create<RegisterStore>((set) => ({
  step:1,
  isCompleted:false,
  setDetail: (detail) => set(state=>({userDetail:{...state.userDetail,...detail}})),
  setIsCompleted:(isCompleted) => set({isCompleted}),
  setStep:(step) => set({step})
}));

export default useRegister;
