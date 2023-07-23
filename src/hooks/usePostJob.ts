import { create } from "zustand";

interface PostJobStore {
  job: Partial<Job | ResponseJob> | null;
  step: number;
  type: "create" | "upadate";
  setType: (type: "create" | "update") => void;
  setStep: (step: number) => void;
  setJob: (job: Partial<Job | ResponseJob>) => void;
  nextStep: () => void;
  previousStep: () => void;
  clearJobState: () => void;
}

const usePostJob = create<PostJobStore>((set) => ({
  type:"create",
  job: null,
  step: 1,
  setStep: (step) => set({ step: step }),
  setType:(type) => ({ type}),
  setJob: (job) => set({job:{...job}}),
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  previousStep: () => set((state) => ({ step: state.step - 1 })),
  clearJobState: () => set({ job: null, step: 1 }),
}));

export default usePostJob;
