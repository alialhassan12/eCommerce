import mongoose from 'mongoose';

const cartSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"users",
        required:true
    },
    products:[
        {
            productId:{
                type:mongoose.Schema.ObjectId,
                ref:"product",
                required:true
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            },
            price:{
                type:Number,
                required:true
            }
        }
    ],
    total:{
        type:Number,
        default:0
    }
},{timestamps:true});

const Cart=mongoose.model("cart",cartSchema);
export default Cart;