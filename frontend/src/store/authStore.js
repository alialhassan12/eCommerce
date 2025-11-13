import {create} from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore=create((set)=>({
    authUser:null,
    editedUser:null,
    isCheckingAuth:true,
    isSigningUp:false,
    isLoggingIn:false,
    isLoading:false,

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
            console.log(res.data);
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
    },
    logout:async()=>{
        set({isLoggingIn:true});
        try {
            const res=await axiosInstance.post("/auth/logout");
            set({authUser:res.data.user});
            toast.success(res.data.message);
        } catch (error) {
            toast.error("Error Logging Out");
            console.log("Error in logout Store",error);
        } finally{
            set({isLoggingIn:false});
        }
    },
    editProfile:async(updatedUser)=>{
        set({isLoading:true});
        try {
            const res=await axiosInstance.put('/auth/edit-profile',updatedUser);
            set({editedUser:res.data});
            toast.success("Profile Edited");
            set({authUser:res.data});
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log("Error in editProfile Store",error);
        } finally{
            set({isLoading:false});
        }
    },
    changePassword:async(passwords)=>{
        set({isLoading:true});
        try {
            const res=await axiosInstance.put('/auth/change-password',passwords);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log("Error in changePassword Store",error);
        } finally{
            set({isLoading:false});
        }
    },
    deleteAccount:async(id)=>{
        set({isLoading:true});
        try {
            const res=await axiosInstance.delete(`/auth/delete-account/${id}`);
            toast.success(res.data.message);
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log("Error in deleteAccount Store",error);
        } finally{
            set({isLoading:false});
        }
    }
}));