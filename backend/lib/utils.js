import jwt from 'jsonwebtoken';

export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000, // maxAge 7days in ms
        httpOnly:true,  //prevent XSS
        sameSite:"strict", //prevent CSRF attacks
        secure: process.env.NODE_ENV == "development"?false:true // to select if the protocol http (in deve) or https
    });
}