import { create } from "zustand";

interface RegisterModalStore {
  isOpen: boolean;
  afterUrl?: string;
  onOpen: () => void;
  onClose: () => void;
  setAfterUrl: (url: string) => void;
}

const useRegisterModal = create<RegisterModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setAfterUrl: (url) => set({ afterUrl: url }),
}));

export default useRegisterModal;
