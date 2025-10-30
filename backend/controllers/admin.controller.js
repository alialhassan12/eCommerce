import Product from "../modules/Product.js";
import User from "../modules/User.js";
import cloudinary from "../lib/cloudinary.js";

// export const checkAdmin=async(req,res)=>{
//     try {
//         const {id}=req.body;
//         const user=await User.findById(id);
//         if(user?.role==='client'){
//             return res.status(400).json({message:"Access Denied"});
//         }
//         res.status(200).json(user);

//     } catch (error) {
//         console.log("Error in check admin controller",error);
//         res.status(400).json({message:"Internal Server Error"});
//     }
// }

export const addProduct=async(req,res)=>{
    try {
        let {name,price,category,description,photos} =req.body;
        if(!name || !price || !category|| !photos){
            return res.status(404).json({message:"Must fill all Fields"});
        }
        const priceCheckIfNumber=Number(price);
        if(isNaN(priceCheckIfNumber)){
            return res.status(400).json({message:"Price should be only number"});
        }
        if(photos){
            const uploadResponse=await Promise.all(
                photos.map(async (photo)=>{
                    const result =await cloudinary.uploader.upload(photo);
                    return result;
                })
            );
            photos=uploadResponse.map(res=>{
                return res.secure_url;
            });
        }
        const newProduct=new Product({
            name,
            price,
            description,
            category,
            photos,
        });
        await newProduct.save();
        res.status(200).json(newProduct);
    } catch (error) {
        console.log("Error in add Product controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}