import { create } from "zustand";


export const useAddStore = create((set) => ({
    isOpen: false,
    OpenAdd: () => (set({
        isOpen: true
    })),
    CloseAdd:()=>(set({
        isOpen:false
    })),
    Loading:false,
    setLoading:(state)=>(set({
        Loading:true
    }))
})) 