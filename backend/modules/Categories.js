import mongoose from 'mongoose';

const categoriesSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        default:""
    },
    description:{
        type:String,
    }
},{timestamps:true}) ;

const Category=mongoose.model("Category",categoriesSchema);
export default Category;