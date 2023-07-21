import { create } from "zustand";

interface DataStore {
  type: "update" | "create";
  // isCreatedProfile:boolean
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useCreateProfileModal = create<DataStore>((set) => ({
  type:"create",
  // isCreatedProfile:false,
  open: false,
  onOpen: () => set({ open: true }),
  onClose: () => set({ open: false})
}));

export default useCreateProfileModal;
