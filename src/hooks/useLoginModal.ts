import { create } from "zustand";

interface LoginModalStore {
  isOpen: boolean;
  afterUrl?:string
  setAfterUrl:(url:string) => void;
  onOpen: () => void;
  onClose: () => void;
}

const useLoginModal = create<LoginModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setAfterUrl:(url)=>set({ afterUrl:url})
}));

export default useLoginModal;
