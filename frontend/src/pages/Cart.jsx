import Button from "@mui/material/Button";
import NavBar from "../components/NavBar";
import { useCartStore } from "../store/cartStore";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/authStore";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';

export default function Cart(){
    const{authUser}=useAuthStore();
    const {userCart,cart,getUserCart}=useCartStore();
    useEffect(()=>{
        getUserCart(authUser._id);
    },[cart]);
    console.log(userCart);

    return(
        <div className="min-h-[100vh]">
            {/* inner conatiner */}
            <div className="ml-10 mr-10 p-3 ">
                <NavBar active={"Cart"}/>
                <div className="flex justify-center items-center"  data-aos="fade-up">
                    {userCart === null || userCart.products.length==0
                    ?
                        <div className=" text-center ">
                            <h1 className="mb-5">No Items In Cart Yet</h1>
                            <Button>
                                <Link to={'/category'}>Shop Now</Link>
                            </Button>
                        </div>
                    :
                        <div className="flex flex-col gap-2 w-full">
                            {userCart.products.map((cart)=>{
                                return <div className="flex flex-wrap gap-2 p-7 mr-[50px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                                            <img className="max-w-30 rounded" src={cart.productId.photos[0]}/>
                                            <div className="flex flex-col gap-3">
                                                <p className="flex gap-1">
                                                    <p className="text-[#94a3b8]">Product Name:</p>{cart.productId.name}
                                                </p>
                                                <p className="flex gap-1">
                                                    <p className="text-[#94a3b8]">Product Price:</p>{cart.productId.price}$
                                                </p>
                                                <p className="flex items-center gap-1">
                                                    <p className="text-[#94a3b8]">quantity:</p>{cart.quantity}
                                                    <IconButton color="primary"><EditIcon></EditIcon></IconButton>
                                                </p>
                                            </div>
                                        </div>
                            })}
                            <p className="flex mt-10 p-7 mr-[50px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                                <p className="text-[#94a3b8]">Total:</p>{userCart.total}$
                            </p>
                        </div>
                    }
                </div>
                
            </div>
        </div>
    );
}