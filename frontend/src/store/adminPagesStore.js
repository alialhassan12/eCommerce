import { create } from "zustand";

export const useAdminPagesStore=create((set)=>({
    page:"dashboard",
    
    changePage:(page)=>{
        set({page:page});
    }
}));