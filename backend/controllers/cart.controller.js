import Cart from '../modules/Cart.js';

export const addToCart=async (req,res)=>{
    try {
        const {userId,products}=req.body;
        if(!userId||!products){
            return res.status(400).json({message:"Error adding item to cart"});
        }
        
        //check if user have a cart
        let cart=await Cart.findOne({userId});
        //if no cart exist create new one
        if(!cart){
            cart=new Cart({
                userId,
                products:[{
                    productId:products._id,
                    quantity:1,
                    price:products.price
                }],
                total:products.price
            });
            
            await cart.save();
            return res.status(201).json(cart);
        }
        //if cart exists
        //check if product already exists
        const existingProductIndex=cart.products.findIndex(
            (prod)=>prod.productId.toString() === products._id
        );
        if(existingProductIndex>=0){
            //update quantity and total
            cart.products[existingProductIndex].quantity+=1;
            cart.total+=products.price;
        }else{
            //add new product
            const newProd={
                productId:products._id,
                quantity:1,
                price:products.price
            }
            cart.products.push(newProd);
            cart.total+=products.price
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error in add To Cart controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}

export const getUserCart=async(req,res)=>{
    const {userId}=req.params;
    try {
        const cart=await Cart.findOne({userId}).populate({
            path:'products.productId',
            select:'name price photos'
        });
        res.status(200).json(cart);
    } catch (error) {
        console.log("Error in getUserCart controller",error);
        res.status(500).json({message:"Internal Server Error"});
    }
}