import { create } from "zustand";


export const useDialogStore = create((set)=>({
    isOpen:false,
    Accept:()=>{},
    Message:"",
    Close:()=>(set({
        isOpen:false,
        Accept:()=>{},
        Message:''
    })),
    Open:(func,message)=>(set({
        isOpen:true,
        Accept:()=>{
            func()
        },
        Message:message
    }))
})) 