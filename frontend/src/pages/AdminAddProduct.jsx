import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import AdminAddProductCard from './AdminAddProductCard';
import AdminEditProductCard from '../components/AdminEditProductCard';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import Divider from '@mui/material/Divider';
import { useAdminPagesStore } from '../store/adminPagesStore';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminAddProduct(){
    const [openDaialog,setOpenDialog]=useState(false);
    const [openDeleteDialog,setOpenDeleteDialog]=useState(false);
    const [openEditDialog,setOpenEditDialog]=useState(false);
    const [selectedProductId,setSelectedProductId]=useState(null);
    const [selectedProductToEdit,setSelectedProductToEdit]=useState(null);
    const {
            getAllProducts,
            allProducts,
            fetchingProducts,
            editedProduct,
            deleteProduct,
            deletedProduct,
        }=useAdminPagesStore();
    const [searchInp,setSearchInp]=useState("");

    useEffect(()=>{
        getAllProducts();
    },[getAllProducts,deletedProduct,editedProduct]);
    
    //handlers
    function handleDeleteProduct(prodId){
        deleteProduct(prodId);
    }
    // dialogs handlers
    function handleOpenDeleteDialog(id){
        setSelectedProductId(id);
        setOpenDeleteDialog(true);
        
    }
    function handleCloseDeleteDialog(){
        setSelectedProductId(null);
        setOpenDeleteDialog(false);
    }
    function handleOpenEditDialog(product){
        setSelectedProductToEdit(product);
        setOpenEditDialog(true);
    }
    function handleCloseEditDialog(){
        setOpenEditDialog(false);
    }

    return(
        <div className="w-full space-y-15 " data-aos="fade-up">
            {/* header */}
            <div className="flex justify-between items-center mt-[50px] mr-[50px]">
                <h1 >Manage Products</h1>
                <Button onClick={()=>setOpenDialog(true)} variant='contained' startIcon={<AddIcon/>} >Add Product</Button>
            </div>
            {/* show Products  */}
            <div className=' p-7 mr-[50px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]'>
                {/* header */}
                <p className='text-2xl'>All Products</p>
                <TextField
                    value={searchInp}
                    onChange={(e)=>setSearchInp(e.target.value)}
                    variant='outlined' 
                    placeholder='Search Products'
                    className='w-full'
                    sx={{
                        mt:"10px",
                        "& .MuiOutlinedInput-root": {
                                color:"#64748b",
                                // borderBottomColor:"#e2e8f0",
                                "& fieldset": {
                                    borderColor: "#2f4057", // default border
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
                    }}
                    //add start search icon 
                    slotProps={{
                        input: {
                        startAdornment: <InputAdornment sx={{color:"#2f4057"}} position="start"><SearchIcon/></InputAdornment>,
                        },
                    }}
                ></TextField>
                {/* display products */}
                {fetchingProducts
                ?   
                    <div className='flex justify-center items-center mt-[20px]'>
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                :
                    <div className='mt-[20px] mb-[20px] border-b-amber-1 '>
                    {/* header */}
                    <div className='flex justify-around items-center pb-5 '>
                        <p className='w-[80px] text-center'>Image</p>
                        <p className='w-[80px] text-center' >Name</p>
                        <p className='w-[150px] text-center'>Category</p>
                        <p className='w-[80px] text-center'> Price</p>
                        <p className='w-[80px] text-center'>Actions</p>
                    </div>
                    <Divider sx={{borderColor:"#2f4057"}}/>
                    {allProducts.map(product=>{
                        if(searchInp.trim() === ""){
                            return(
                                <div key={product._id} className='hover:bg-blue-500/20 transition-colors duration-200'>
                                    <div className='flex justify-around items-center pb-5'>
                                        <img className='w-[80px] mt-2 rounded-2xl' src={product.photos[0]}></img>
                                        <p className='w-[80px] text-center'>{product.name}</p>
                                        <p className='w-[150px] text-center'>{product.category.name}</p>
                                        <p className='w-[80px] text-center'>${product.price}</p>
                                        {/* actions */}
                                        <div>
                                            <IconButton onClick={()=>handleOpenEditDialog(product)}>
                                                <EditIcon color="primary"/>
                                            </IconButton>
                                            <IconButton onClick={()=>handleOpenDeleteDialog(product._id)}>
                                                <DeleteIcon color="error"/>
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Divider sx={{borderColor:"#2f4057"}}/>
                                </div>
                            );
                        }else if(product.name.toLowerCase().includes(searchInp.toLowerCase())){
                            return(
                            <div key={product._id} className='hover:bg-blue-500/20 transition-colors duration-200'>
                                    <div className='flex justify-around items-center pb-5'>
                                        <img className='w-[80px] mt-2 rounded-2xl' src={product.photos[0]}></img>
                                        <p className='w-[80px] text-center'>{product.name}</p>
                                        <p className='w-[150px] text-center'>{product.category.name}</p>
                                        <p className='w-[80px] text-center'>${product.price}</p>
                                        {/* actions */}
                                        <div>
                                            <IconButton onClick={()=>handleOpenEditDialog(product)} >
                                                <EditIcon color="primary"/>
                                                </IconButton>
                                            <IconButton onClick={()=>handleOpenDeleteDialog(product._id)}>
                                                <DeleteIcon color="error"/>
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Divider sx={{borderColor:"#2f4057"}}/>
                                </div>
                            );
                        }
                    })}
                </div>
                }
                
            </div>
            {/* dialog for add product card */}
            <Dialog  open={openDaialog} onClose={()=>setOpenDialog(false)}
                PaperProps={{
                    sx:{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    }
                }}>
                    <AdminAddProductCard/>
            </Dialog>
            {/* dialog for deleteProduct */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} >
                <DialogTitle id="alert-dialog-title">
                    Are You Sure Wanna Delete This product?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Disagree</Button>
                    <Button onClick={()=>{
                                handleDeleteProduct(selectedProductId);
                                handleCloseDeleteDialog();
                            }} autoFocus>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
            {/* dialog for editProduct */}
            <Dialog  open={openEditDialog} onClose={handleCloseEditDialog}
                PaperProps={{
                    sx:{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    }
                }}>
                    <AdminEditProductCard product={selectedProductToEdit} close={handleCloseEditDialog}/>
            </Dialog>
        </div>
    )
}