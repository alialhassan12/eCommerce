import express from 'express';
//import controllers
import { signup,login,logout, editProfile, changePassword, deleteAccount } from '../controllers/auth.controller.js';
import { protectRoute } from '../middlewares/auth.middleware.js';
const server=express.Router();

server.post('/signup',signup);
server.post('/login',login);
server.post('/logout',logout);
server.put('/edit-profile',editProfile);
server.put('/change-password',changePassword);
server.delete('/delete-account/:id',deleteAccount);
server.get('/check',protectRoute,(req,res)=>{
    console.log("User autharized:"+req.user.fullName);
    res.status(200).json(req.user);
});

export default server;