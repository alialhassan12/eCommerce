import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAdminPagesStore=create((set)=>({
    page:"dashboard",
    product:null,
    newCategory:null,
    allProducts:[],
    allCategories:[],
    deletedProduct:null,
    deletedCategory:null,
    editedProduct:null,
    editedCategory:null,
    fetchingProducts:false,
    fetchingCategories:false,
    totalUsers:0,
    addingProduct:false,
    addingCategory:false,
    edittingProduct:false,
    edittingCategory:false,

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
    },
    editProduct:async(prodId,editedProd)=>{
        set({edittingProduct:true});
        try {
            const res=await axiosInstance.post(`/admin/dashboard/editProduct/${prodId}`,editedProd);
            set({editedProduct:res.data});
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error editProduct store",error);
            toast.error(error.response?.data?.message);
        }finally{
            set({edittingProduct:false});
        }
    },
    deleteProduct:async(prodId)=>{
        try {
            const res=await axiosInstance.delete(`/admin/dashboard/deleteProduct/${prodId}`);
            set({deletedProduct:res.data.product});
            toast.success(res.data.message);
        } catch (error) {
            console.log("Error deleteProduct store",error);
            toast.error(error.response?.data?.message);
        }
    },
    getAllCategories:async()=>{
        set({fetchingCategories:true});
        try {
            const res=await axiosInstance.get('/admin/dashboard/allCategories');
            set({allCategories:res.data});
        } catch (error) {
            console.log("Error getAllCategories store",error);
            toast.error(error.response?.data?.message);
        } finally{
            set({fetchingCategories:false});
        }
    },
    addCategory:async(formData)=>{
        set({addingCategory:true});
        try{
            const res=await axiosInstance.post("/admin/dashboard/addCategory",formData);
            set({newCategory:res.data});
            toast.success("Category Added");
        }catch(error){
            console.log("Error addCategory store",error);
            toast.error(error.response?.data?.message);
        }finally{
            set({addingCategory:false});
        }
    },
    deleteCategory:async (CategoryId)=>{
        try {
            const res=await axiosInstance.delete(`/admin/dashboard/deleteCategory/${CategoryId}`);
            set({deletedCategory:res.data});
            toast.success("Category Deleted");
        } catch (error) {
            console.log("Error deleteCategory store",error);
            toast.error(error.response?.data?.message);
        }
    },
    editCategory:async(categoryId,formData)=>{
        set({edittingCategory:true});
        try {
            const res=await axiosInstance.put(`/admin/dashboard/editCategory/${categoryId}`,formData);
            set({editedCategory:res.data});
            toast.success("Category Edited");
        } catch (error) {
            console.log("Error editCategory store",error);
            toast.error(error.response?.data?.message);
        } finally{
            set({edittingCategory:false});
        }
    }
}));