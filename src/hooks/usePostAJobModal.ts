import { create } from "zustand";

interface DataStore {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const usePostAJobModal = create<DataStore>((set) => ({
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false }),
}));

export default usePostAJobModal;
