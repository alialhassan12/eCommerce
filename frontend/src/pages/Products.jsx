import { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import { useParams } from "react-router-dom";
import 'aos/dist/aos.css';
//components
import NavBar from "../components/NavBar";

export default function Products(){
    const {products,loadingProducts,getProductsofCategory}=useProductStore();
    const {id : categoryId}=useParams();
    
    useEffect(()=>{
        getProductsofCategory(categoryId);
    },[]);
    
    console.log(products);
    return(
        <div className="min-h-[100vh]">
            {/* inner conatiner */}
            <div className="ml-10 mr-10 p-3 ">
                <NavBar active={"Categories"}/>
                {/* Product Fetch */}
                {loadingProducts?
                    <></>
                :
                    <div data-aos="fade-down" className="space-y-10 " >
                        <h1 className="text-center">{products.category.name}</h1>
                        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                            {products.products.map((product) => (
                                <a key={product._id}  className="group">
                                <img
                                    src={product.photos[0]}
                                    className="aspect-square w-full rounded-lg bg-gray-200 object-cover group-hover:opacity-75 xl:aspect-7/8"
                                />
                                <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
                                <p className="mt-1 text-lg font-medium text-white-900">${product.price}</p>
                                </a>
                            ))}
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}