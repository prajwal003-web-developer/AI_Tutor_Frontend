import { create } from "zustand";


export const useProjectInfo = create((set)=>({
    isOpen:false,
    data:{},
    Close:()=>(set({
        isOpen:false,
        data:{}
    })),
    Open:(data)=>set({
        data:data,
        isOpen:true
    })
}))