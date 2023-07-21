import { create } from "zustand";

interface JobStore {
  filter: FilterJob | null;
  result: number;
  setResult: (result: number) => void;
  setFilter:(filter:Partial<FilterJob>)=>void
}

const useSearchJob = create<JobStore>((set) => ({
  filter:null,
  result: 0,
  setResult: (result) => set({ result }),
  setFilter: (filter) =>set({ filter})
}));

export default useSearchJob;
