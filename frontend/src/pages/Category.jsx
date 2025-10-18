import NavBar from "../components/NavBar";
import 'aos/dist/aos.css';
import {Link} from 'react-router-dom';
import { useCategoryStore } from "../store/categoryStore";
import { useEffect } from "react";

export default function Category(){
    const {categories,getAllCatgeories,isLoading}=useCategoryStore();
    
    useEffect(()=>{
        getAllCatgeories()
    },[getAllCatgeories]);
    
    return(
        <div className="min-h-[100vh]">
            {/* inner conatiner */}
            <div className="ml-10 mr-10 p-3 ">
                <NavBar active="Categories"/>
                {/* Category Fetch */}
                <div data-aos="fade-up" className="space-y-10">
                    <h1 className="text-center">Explore our Categories</h1>
                    <div className="flex  space-x-10 space-y-3 flex-wrap justify-center">
                        {isLoading
                            ?
                            [1,2,3,4].map((i)=>{    
                                return (
                                    <div key={i} className="skeleton h-100 w-100">
                                    </div>
                                )
                            })
                            :categories.map((cat)=>{
                                return <div key={cat._id} className="card  bg-base-100 image-full w-96 shadow-sm">
                                            <figure>
                                                <img src={cat.image}/>
                                            </figure>
                                            <div className="card-body">
                                                <h2 className="card-title">{cat.name}</h2>
                                                <p>{cat.description}</p>
                                                <div className="card-actions justify-end">
                                                    <Link to={`/category/${cat._id}`}>
                                                        <button className="btn btn-primary">Browse Items</button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                            })
                        }

                    </div>
                </div>
            </div>
        </div>
    );
}