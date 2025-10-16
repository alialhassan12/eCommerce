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
    numberOfProducts:{
        type:Number,
        default:0
    }
},{timestamps:true}) ;

const Category=mongoose.model("Category",categoriesSchema);
export default Category;