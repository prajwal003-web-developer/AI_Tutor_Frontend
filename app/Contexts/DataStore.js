import { create } from "zustand";


export const useData = create((set)=>({
    isLoggedIn:false,
    setLoggedIn:(state)=>(set({
        isLoggedIn:state
    })),
    Data:{},
    Projects:[],
    setData:(data)=>(set({
        Data:data
    })),
    setProjects:(projects)=>set({
        Projects:projects
    })
}))