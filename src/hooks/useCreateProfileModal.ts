import { create } from "zustand";

interface DataStore {
  type: "update" | "create";
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateProfileModal = create<DataStore>((set) => ({
  type:"create",
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false})
}));

export default useCreateProfileModal;
