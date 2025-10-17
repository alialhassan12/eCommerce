import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useCategoryStore=create((set)=>({
    categories:null,
    isLoading:true,

    getAllCatgeories:async()=>{
        try {
            const res= await axiosInstance.get('/shop/category');
            set({categories:res.data});
        } catch (error) {
            console.log("Error in get All Categories",error);
        } finally{
            set({isLoading:false});
        }
    },

}));