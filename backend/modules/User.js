import mongoose from "mongoose";

const userSchema=mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    role:{
        type:String,
        required:true,
        default:'client',
    },
    profilePic:{
        type:String,
        default:"",
    },
    banned:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true //this will auto create the createdAt && updatedAt
});

const User=mongoose.model("User",userSchema);

export default User;