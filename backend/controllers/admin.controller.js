import Product from "../modules/Product.js";
import Category from "../modules/Categories.js";
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
export const totalUsers=async (req,res)=>{
    try{
        const count=await User.countDocuments();//count all users
        res.status(200).json({count});
    }catch(error){
        console.log("Error in totalusers controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}
// products controllers
export const getAllProducts=async(req,res)=>{
    try {
        const products=await Product.find().populate('category','name');
        res.status(200).json(products);
    } catch (error) {
        console.log("Error in getAllProducts controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}

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

export const deleteProduct=async (req,res)=>{
    try {
        const {id}=req.params;
        const deletedProd=await Product.findByIdAndDelete(id);
        if (!deletedProd) return res.status(404).json({ message: "Product not found" });
        res.json({message:"Product Deleted Successfully",product:deletedProd});
    } catch (error) {
        console.log("Error in delete Product controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}

export const editProduct=async (req,res)=>{
    try {
        const {id}=req.params;
        const newProd=req.body;
        const updatedProduct=await Product.findByIdAndUpdate(id,{
                name: newProd.name,
                description: newProd.description,
                price: newProd.price,
                category: newProd.category,
                photos: newProd.photos,
            },
            { new: true } // ✅ return updated document instead of old one
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({message:"Product edited Successfully",product:updatedProduct});
    } catch (error) {
        console.log("Error in edit Product controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}

//categories controllers

export const getAllCategories=async (req,res)=>{
    try {
        const allCategories=await Category.find();
        res.status(200).json(allCategories);
    } catch (error) {
        console.log("Error in getAllCategories controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}

export const addCategory=async (req,res)=>{
    try {
        let {name,description,image}=req.body;
        if(!name || !description){
            return res.status(400).json({message:"Must Fill all Fields"});
        }
        if(image){
            const uploadResponse=await cloudinary.uploader.upload(image);
            image=uploadResponse.secure_url;
        }
        const newCategory=new Category({
            name,
            description,
            image,
        });
        await newCategory.save();
        res.status(200).json(newCategory);

    } catch (error) {
        console.log("Error in addCategory controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}

export const deleteCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const deletedCategory=await Category.findByIdAndDelete(id);

        //delete all products tha have this id
        await Product.deleteMany({category:id});
        
        if(!deleteCategory){
            return res.status(400).json({message:"Category not Found"});
        }
        res.status(200).json(deletedCategory);
    } catch (error) {
        console.log("Error in deleteCategory controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}

export const editCategory=async(req,res)=>{
    try {
        const {id}=req.params;
        const {name,description,image}=req.body;
        
        const editedCategory=await Category.findByIdAndUpdate(id,{
                name,
                description,
                image
            },
            { new: true } // ✅ return updated document instead of old one);
        ); 
        if(!editCategory){
            return res.status(400).json({message:"Category Not Found"});
        }

        res.status(200).json(editCategory);
    } catch (error) {
        console.log("Error in editCategory controller",error);
        res.status(400).json({message:"Internal Server Error"});
    }
}