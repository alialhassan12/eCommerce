import { create } from "zustand";
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useCartStore=create((set)=>({
    userCart:null,
    cart:null,

    getUserCart:async(userId)=>{
        try {
            const res=await axiosInstance.get(`/cart/getUserCart/${userId}`);
            set({userCart:res.data});
        } catch (error) {
            console.log("Error getUserCart store",error);
        }
    },
    addToCart:async(userId,products)=>{
        try {
            const res=await axiosInstance.post('/cart/addToCart',{userId,products});
            set({cart:res.data});
            toast.success("added to cart");
        } catch (error) {
            console.log("Error addToCart store",error);
            toast.error(error.response?.data?.message);
        }
    }
}));