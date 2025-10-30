import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminPagesStore=create((set)=>({
    page:"dashboard",
    product:null,
    allProducts:[],
    fetchingProducts:false,
    totalUsers:0,
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
    },
    getTotalUsers:async()=>{
        try {
            const res=await axiosInstance.get('/admin/dashboard/totalUsers');
            set({totalUsers:res.data});
        } catch (error) {
            console.log("Error in getTotalUsers store",error);
        }
    },
    getAllProducts:async()=>{
        set({fetchingProducts:true});
        try {
            const res=await axiosInstance.get('/admin/dashboard/allProducts');
            set({allProducts:res.data});
        } catch (error) {
            console.log("Error getAllProducts store",error);
        } finally{
            set({fetchingProducts:false});
        }
    }
}));