import 'aos/dist/aos.css';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Button from '@mui/material/Button';
import toast from 'react-hot-toast';

import { useCategoryStore } from '../store/categoryStore';
import { useEffect,useRef, useState } from 'react';
import { useAdminPagesStore } from '../store/adminPagesStore';


export default function AdminAddProduct(){
    const imageUploadRef=useRef(null);
    const {addProduct}=useAdminPagesStore();
    const {categories,getAllCatgeories}=useCategoryStore();
    const [images,setImages]=useState([]);
    const [formData,setFormData]=useState({
        name:"",
        price:"",
        description:"",
        category:"",
        photos:[]
    });
    
    useEffect(()=>{
        getAllCatgeories();
    },[getAllCatgeories]);
    
    function handleUplaodImages(e){
        const file=e.target.files[0];
        if(!file.type.startsWith("image/")){
            toast.error("Please only select Image file")
            return;
        }
        const reader=new FileReader();
        reader.onload=()=>{
            //set the state of the preview images 
            setImages([...images,reader.result]);
            //add the image to the formData state
            setFormData({...formData,photos:[...images,reader.result]});
        };
        reader.readAsDataURL(file);
    }

    function handleSubmit(e){
        e.preventDefault();
        addProduct(formData);
        setFormData({
            name:"",
            price:"",
            description:"",
            category:0,
            photos:[]
        });
    }

    return(
        <div className="w-full space-y-15" data-aos="fade-up">
            <h1 className="text-center mt-[50px]">Add Product</h1>
            <div className='flex justify-center items-center'>
                <form className='w-[500px] p-[20px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]'>
                    <h2 className='text-blue-400 text-[24px]'>Create New Product</h2>
                    <div className='mt-10 '>
                        {/* product name TextField */}
                        <TextField
                            value={formData.name}
                            onChange={(e)=>setFormData({...formData,name:e.target.value})}
                            fullWidth
                            variant="standard" label="Product Name" name='productname'
                            sx={{   
                                    mb:"20px",
                                    // === LABEL (the floating placeholder) ===
                                    "& .MuiInputLabel-root": {
                                        color: "#94a3b8", // 👈 before focus
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        color:"#64748b",
                                        // borderBottomColor:"#e2e8f0",
                                        "& fieldset": {
                                            borderColor: "#fff", // default border
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#2f4057", // hover border
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#fff", // focused border
                                        },
                                    },
                                    // === Input Text ===
                                    "& .MuiInputBase-input::placeholder": {
                                        color: "#64748b",
                                        opacity: 1, // important! to ensure color isn't faded
                                    },
                                    "& .MuiInputBase-input": {
                                        color: "#e2e8f0", // text color
                                    },
                                    // === Underline (the bottom line) ===
                                    "& .MuiInput-underline:before": {
                                        borderBottomColor: "#1e2a3a", // default line color
                                    },
                                    "& .MuiInput-underline:hover:before": {
                                        borderBottomColor: "#64748b", // hover color
                                    },
                                    // "& .MuiInput-underline:after": {
                                    //     borderBottomColor: "#4fc3f7", // focus color
                                    // },
                                }}></TextField>

                        {/* Price TextField */}
                        <TextField
                            value={formData.price}
                            onChange={(e)=>setFormData({...formData,price:e.target.value})}
                            fullWidth
                            variant="standard" label="Price" name='price'
                            sx={{   
                                    mb:"20px",
                                    // === LABEL (the floating placeholder) ===
                                    "& .MuiInputLabel-root": {
                                        color: "#94a3b8", // 👈 before focus
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        color:"#64748b",
                                        // borderBottomColor:"#e2e8f0",
                                        "& fieldset": {
                                            borderColor: "#fff", // default border
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#2f4057", // hover border
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#fff", // focused border
                                        },
                                    },
                                    // === Input Text ===
                                    "& .MuiInputBase-input::placeholder": {
                                        color: "#64748b",
                                        opacity: 1, // important! to ensure color isn't faded
                                    },
                                    "& .MuiInputBase-input": {
                                        color: "#e2e8f0", // text color
                                    },
                                    // === Underline (the bottom line) ===
                                    "& .MuiInput-underline:before": {
                                        borderBottomColor: "#1e2a3a", // default line color
                                    },
                                    "& .MuiInput-underline:hover:before": {
                                        borderBottomColor: "#64748b", // hover color
                                    },
                                    // "& .MuiInput-underline:after": {
                                    //     borderBottomColor: "#4fc3f7", // focus color
                                    // },
                                }}></TextField>

                        {/* Description Field */}
                        <TextField
                            value={formData.description}
                            onChange={(e)=>setFormData({...formData,description:e.target.value})}
                            fullWidth
                            variant="standard" label="Description" name='price'
                            multiline rows={4}
                            sx={{   
                                    mb:"20px",
                                    // === LABEL (the floating placeholder) ===
                                    "& .MuiInputLabel-root": {
                                        color: "#94a3b8", // 👈 before focus
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        color:"#64748b",
                                        // borderBottomColor:"#e2e8f0",
                                        "& fieldset": {
                                            borderColor: "#fff", // default border
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#2f4057", // hover border
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#fff", // focused border
                                        },
                                    },
                                    // === Input Text ===
                                    "& .MuiInputBase-input::placeholder": {
                                        color: "#64748b",
                                        opacity: 1, // important! to ensure color isn't faded
                                    },
                                    "& .MuiInputBase-input": {
                                        color: "#e2e8f0", // text color
                                    },
                                    // === Underline (the bottom line) ===
                                    "& .MuiInput-underline:before": {
                                        borderBottomColor: "#1e2a3a", // default line color
                                    },
                                    "& .MuiInput-underline:hover:before": {
                                        borderBottomColor: "#64748b", // hover color
                                    },
                                    // "& .MuiInput-underline:after": {
                                    //     borderBottomColor: "#4fc3f7", // focus color
                                    // },
                                }}></TextField>

                                {/* Select Category */}
                                <FormControl fullWidth
                                    sx={{
                                        mb:"20px",
                                        "& .MuiOutlinedInput-root": {
                                        color:"#64748b",
                                        // borderBottomColor:"#e2e8f0",
                                        "& fieldset": {
                                            borderColor: "#2f4057", // default border
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#000", // hover border
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#primary", // focused border
                                        },
                                    },}}
                                    >
                                    <InputLabel sx={{color:"#94a3b8"}}>Category</InputLabel>
                                    <Select
                                        value={formData.category}
                                        label="Category"
                                        onChange={(e)=>setFormData({...formData,category:e.target.value})}
                                        >
                                        {categories?.map(category=>{
                                            return <MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                {/* uplad images */}
                                <Button onClick={()=>imageUploadRef.current.click()} 
                                        variant='contained' 
                                        startIcon={<CloudUploadIcon/>}
                                    >Image uplaod</Button>
                                <input onChange={handleUplaodImages} type="file" accept='image/*' ref={imageUploadRef} className='hidden'/>
                                <div className='flex flex-wrap gap-2 mt-5 mb-[20px]'>
                                    {images?.map(image=>{
                                        return <img key={image} className='w-[100px] h-[100px] rounded-2xl' src={image}></img>
                                    })}
                                </div>
                                {/* submit button */}
                                <Button variant='contained' className='w-full' onClick={handleSubmit}>Add Product</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}