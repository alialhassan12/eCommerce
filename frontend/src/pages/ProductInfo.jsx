import { useState } from "react";
import NavBar from "../components/NavBar";
import { useProductStore } from "../store/productStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import 'aos/dist/aos.css';
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";

export default function ProductInfo(){
    const {authUser}=useAuthStore();
    const {product,loadProduct,getProduct}=useProductStore();
    const {addToCart}=useCartStore();
    const [previewImg,setPreviewImg]=useState(null);
    const {id :categoryId ,prodId}=useParams();
    useEffect(()=>{
        getProduct(categoryId,prodId);
    },[getProduct]);

    useEffect(()=>{
        if(product){

            setPreviewImg(product.photos[0]);
        }
    },[product]);

    return(
        <div className="min-h-[100vh]">
            {/* inner conatiner */}
            <div className="ml-10 mr-10 p-3 ">
                <NavBar active={""}/>
                {/* Product Info */}
                {loadProduct
                ?   
                    <></>
                :
                    <div className="flex  space-x-2.5 " data-aos="fade-up">
                        {/* left */}
                        <div className="w-[50%] space-y-2.5 mt-[100px]">
                            <h1>{product.name}</h1>
                            <h2>${product.price}</h2>
                            <p className="text-wrap">Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque libero suscipit nemo repellat fuga id? Debitis autem error vel sed fugit? Temporibus laborum delectus ducimus deleniti libero sint rerum aut?</p>
                                <Button onClick={()=>addToCart(authUser._id,product)} variant="outlined" endIcon={<AddShoppingCartIcon/>}>Add To Cart</Button>
                                <IconButton color="primary" aria-label="favorite">
                                    <FavoriteBorderIcon />
                                </IconButton>
                        </div>
                        {/* right */}
                        <div className="flex flex-col justify-center items-center space-y-5">
                            {/* preview image */}
                            <div >
                                <img src={previewImg} className="max-h-[450px] max-w-[450px] rounded-2xl"/>
                            </div>
                            <div className="flex justify-center items-center space-x-4 space-y-4 flex-wrap">
                                {product.photos.map((photo,i)=>(
                                    <div key={i} onClick={()=>{setPreviewImg(photo)}} className="cursor-pointer ">
                                        <img src={photo} className="rounded-[4px] w-[100px] h-[100px] hover:opacity-75 xl:aspect-7/8 transition duration-200"/>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                    </div>
                }
            </div>
        </div>
    )
}