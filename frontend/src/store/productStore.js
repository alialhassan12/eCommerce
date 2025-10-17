import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useProductStore=create((set)=>({
    products:null,
    loadingProducts:true,

    getProductsofCategory:async(categoryId)=>{
        try {
            const res=await axiosInstance.get(`/shop/category/${categoryId}`);
            set({products:res.data});
        } catch (error) {
            console.log("Error in get Products of category store",error);
        } finally{
            set({loadingProducts:false});
        }
    }
}));