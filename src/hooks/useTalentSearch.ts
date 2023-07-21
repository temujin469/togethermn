import { create } from "zustand";

interface TalentStore {
  filter?: FilterTalent;
  result: number;
  setResult: (result: number) => void;
  setFilter: (filter: Partial<FilterJob>) => void;
}

const useSearchTalent = create<TalentStore>((set) => ({
  result: 0,
  setResult: (result) => set({ result }),
  setFilter: (filter) => set({ filter }),
}));

export default useSearchTalent;
