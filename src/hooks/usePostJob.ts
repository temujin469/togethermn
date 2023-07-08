import { create } from "zustand";


interface PostJobStore {
  job: Job | null;
  step: number;
  setStep: (step: number) => void;
  setJob: (job: Partial<Job>) => void;
  nextStep: () => void;
  previousStep: () => void;
}

const usePostJob = create<PostJobStore>((set) => ({
  job: null,
  step: 1,
  setStep: (step) => set({ step: step }),
  setJob: (job) => set((state) => ({ job:{...state.job as Job,...job} })),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  previousStep: () => set((state) => ({ step: state.step - 1 })),
}));

export default usePostJob;
