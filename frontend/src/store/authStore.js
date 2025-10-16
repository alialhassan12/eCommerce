import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore=create((set)=>({
    authUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,

    checkAuth:async()=>{
        try {
            const res=await axiosInstance.get('/auth/check');
            set({authUser:res.data});
        } catch (error) {
            console.log("Error in checkAuth",error);
        }finally{
            set({isCheckingAuth:false});
        }
    },
    login:async(formData)=>{
        set({isLoggingIn:true});
        try {
            const res=await axiosInstance.post('/auth/login',formData);
            set({authUser:res.data});
            toast.success("Logged in Successfully");
        } catch (error) {
            console.log("Error in loginStore ",error);
            toast.error(error.response?.data?.message);
        } finally{
            set({isLoggingIn:false});
        }
    },
    signup:async(formData)=>{
        set({isSigningUp:true});
        try {
            const res=await axiosInstance.post('/auth/signup',formData);
            set({authUser:res.data});
            toast.success("SignedUp in Successfully");
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log("Error in signup Store",error);
        } finally{
            set({isSigningUp:false});
        }
    }
}));