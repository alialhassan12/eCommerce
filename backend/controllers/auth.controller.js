import User from '../modules/User.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../lib/utils.js';

export const signup=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try {
        if(!fullName ||! email|| !password){
            return res.status(400).json({message:"Must fill all fields"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }
        //check if email valid using: regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exist"});
        }

        //after all checkings hash password
        const salt=await bcrypt.genSalt(10);
        const hashedPass=await bcrypt.hash(password, salt);

        //create new User
        const newUser=new User({
            fullName,
            email,
            password:hashedPass,
        });
        //after creating user, generate token 
        if(newUser){
            generateToken(newUser._id,res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                email:newUser.email,
                profilePic:newUser.profilePic,
            });
        }
    } catch (error) {
        console.log("Error in signup controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        //input validation
        if(!email ||!password){
            return res.status(400).json({message:"Must fill all fields"});
        }
        const user =await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid credentials"});
        }
        const isPasswordCorrect=await bcrypt.compare(password,user.password);
        if(!isPasswordCorrect){
            return res.status(400).json({message:"Invalid credentials"});
        }
        //generate token after successfull validation
        generateToken(user._id,res);
        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            email:user.email,
            profilePic:user.profilePic
        });
    } catch (error) {
        console.log("Error in login controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const logout=(_,res)=>{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logout successfully"});
}
