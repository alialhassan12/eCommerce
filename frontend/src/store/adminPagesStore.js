import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminPagesStore=create((set)=>({
    page:"dashboard",
    product:null,
    addingProduct:false,
    changePage:(page)=>{
        set({page:page});
    },
    addProduct:async(prodData)=>{
        set({addingProduct:true});
        try {
            const res=await axiosInstance.post('/admin/dashboard/addProduct',prodData);
            set({product:res.data});
            toast.success("Product Added Successfully");
        } catch (error) {
            console.log("Error in addProduct store",error);
            toast.error(error.response?.data?.message);
        } finally{
            set({addingProduct:false});
        }
    }
}));