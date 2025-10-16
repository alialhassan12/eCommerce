import Category from "../modules/Categories.js";

export const getAllCategories=async (req,res)=>{
    try {
        const categories=await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        console.log("Error in get All Categories controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}