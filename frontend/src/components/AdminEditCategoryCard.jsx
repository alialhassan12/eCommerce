import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useRef, useState } from "react"
import toast from "react-hot-toast";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useAdminPagesStore } from "../store/adminPagesStore";

export default function AdminEditCategoryCard({category}){
    const {edittingCategory,editCategory}=useAdminPagesStore();
    const [formData,setFormData]=useState({
        name:category.name,
        description:category.description,
        image:category.image
    });
    const uploadImageRef=useRef(null);
    function handleImageUpload(e){
        const file=e.target.files[0];
        if(!file.type.startsWith("image/")){
            toast.error("Please only select image file");
            return;
        }
        const reader=new FileReader();
        reader.onload=()=>{
            setFormData({...formData,image:reader.result});
        }
        reader.readAsDataURL(file);
    }
    function handleEditCategory(){
        editCategory(category._id,formData);
    }

    return(
        <div className="w-full space-y-15" >
            <div className='flex justify-center items-center'>
                <form className='w-[500px] p-[20px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]'>
                    <h2 className='text-blue-400 text-[24px]'>Edit Category</h2>
                    {/* Category name TextField */}
                    <TextField
                        value={formData.name}
                        onChange={(e)=>setFormData({...formData,name:e.target.value})}
                        fullWidth
                        variant="standard" label="Category Name" name='categoryname'
                        sx={{   
                                mb:"10px",
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
                    {/* description TexField */}
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
                    {/* image upload */}
                    {formData.image === ""
                        ?
                            <div className="rounded border border-dashed border-blue-400 text-center min-h-[200px] mb-2">
                                <Button onClick={()=>uploadImageRef.current.click()} 
                                        className="w-full min-h-[200px] flex flex-col ">
                                    <AddIcon/>
                                    <p className="text-xs">Add Image</p>
                                </Button>
                                <input type="file" onChange={(e)=>handleImageUpload(e)} ref={uploadImageRef} accept="image/*" className="hidden"></input>
                            </div>
                        :   
                            <div className=" relative rounded border border-dashed border-blue-400 text-center min-h-[200px] mb-2">
                                <div className="absolute z-100 right-0 top-0">
                                    {/* remove Button */}
                                    <Button className="bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19]" 
                                            onClick={()=>{setFormData({...formData,image:""})}}>
                                        <CloseIcon></CloseIcon>
                                    </Button>
                                </div>
                                <Button onClick={()=>uploadImageRef.current.click()} 
                                        className="w-full h-full  flex flex-col ">
                                    <img className="w-full h-full" src={formData.image}/>
                                </Button>
                                <input type="file" onChange={(e)=>handleImageUpload(e)} ref={uploadImageRef} accept="image/*" className="hidden"></input>
                            </div>
                        }
                        {/* Add Button */}
                        {edittingCategory
                        ?
                            <div className="w-full text-center">
                                <div className="loading loading-infinity loading-xl text-blue-500"></div>
                            </div>
                        :
                            <Button variant="contained" className="w-full"
                                    onClick={handleEditCategory}>
                                Edit Category
                            </Button>
                        }
                </form>
            </div>
        </div>
    )
}