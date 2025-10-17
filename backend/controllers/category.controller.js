import Category from "../modules/Categories.js";
import Product from "../modules/Product.js";

export const getAllCategories=async (req,res)=>{
    try {
        const categories=await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log("Error in get All Categories controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getProductsOfCategory=async (req,res)=>{
    try {
        const {id}=req.params;
        const products=await Product.find({category:id});
        const category=await Category.findById(id);
        res.status(200).json({products,category});
    } catch (error) {
        console.log("Error in get Products Of Category controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}