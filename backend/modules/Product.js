import mongoose from 'mongoose';

const productSchema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:true
    },
    photos:{
        type:[String],
        default:""
    }
},{timestamps:true});

const Product=mongoose.model('product',productSchema);

export default Product;