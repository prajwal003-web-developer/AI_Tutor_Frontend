import { create } from "zustand";

export const useNavbar = create((set)=>({
    isOpen:false,
    setOpen:(state)=>set({
        isOpen:state
    })
}))