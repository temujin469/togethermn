import { create } from "zustand";

interface NewsStore {
  filter: {
    searchKey?:string;
  } | null;
  result: number;
  setResult: (result: number) => void;
  setFilter: (filter: Partial<{searchKey:string}>) => void;
}

const useNews = create<NewsStore>((set) => ({
  filter: null,
  result: 0,
  setResult: (result) => set({ result }),
  setFilter: (filter) => set({ filter }),
}));

export default useNews;
