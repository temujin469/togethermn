import { create } from "zustand";

interface DataStore {
  createProfileModal:{
    step:number
    open:boolean
  },
  // onOpen:() => void
}

const useApp = create<DataStore>((set) => ({
  createProfileModal:{
    step:0,
    open:false
  },
  // onOpen:()=>set({createProfileModal:{open:true}})
}));

export default useApp;
