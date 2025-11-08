import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAdminPagesStore } from '../store/adminPagesStore';
import Divider from '@mui/material/Divider';
import { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import AdminAddCategoryCard from '../components/AdminAddCategoryCard';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import AdminEditCategoryCard from '../components/AdminEditCategoryCard';

export default function AdminAddCategory(){
    const{allCategories,
            fetchingCategories,
            getAllCategories,
            newCategory,
            deleteCategory,
            deletedCategory,
            editedCategory
        }=useAdminPagesStore();

    const [searchInp,setSearchInp]=useState("");
    const [openAddCategoryDialog,setOpenAddCategoryDialog]=useState(false);
    const [openDeleteDialog,setOpenDeleteDialog]=useState(false);
    const [openEditDialog,setOpenEditDialog]=useState(false);
    const [selectedCategoryId,setSelectedCategoryId]=useState(null);
    const [selectedCategoryToEdit,setSelectedCategoryToEdit]=useState(null);

    useEffect(()=>{
        getAllCategories();
    },[getAllCategories,newCategory,deletedCategory,editedCategory]);

    //handlers
    function handleOpenDeleteDialog(id){
        setSelectedCategoryId(id);
        setOpenDeleteDialog(true);
    }
    function handleCloseDeleteDialog(){
        setOpenDeleteDialog(false);
    }
    function handleDeleteCategory(categoryId){
        deleteCategory(categoryId);
    }
    function handleOpenEditDialog(category){
        setSelectedCategoryToEdit(category);
        setOpenEditDialog(true);
    }
    function handleCloseEditDialog(){
        setOpenEditDialog(false);
    }
    return(
        <div className="w-full space-y-15 " data-aos="fade-up">
            {/* header */}
            <div className="flex justify-between items-center mt-[50px] mr-[50px]">
                <h1 >Manage Categories</h1>
                <Button onClick={()=>{setOpenAddCategoryDialog(true)}} variant='contained' startIcon={<AddIcon/>} >Add Category</Button>
            </div>
            {/* show Categories  */}
            <div className=' p-7 mr-[50px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]'>
                {/* header */}
                <p className='text-2xl'>All Categories</p>
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
                {/* display categories */}
                {fetchingCategories
                ?   
                    <div className='flex justify-center items-center mt-[20px]'>
                        <span className="loading loading-spinner loading-xl"></span>
                    </div>
                :   <div className='mt-[20px] mb-[20px] border-b-amber-1 '>
                        {/* header */}
                        <div className='flex justify-around items-center pb-5 '>
                            <p className='w-[80px] text-center'>Image</p>
                            <p className='w-[80px] text-center' >Name</p>
                            <p className='w-[80px] text-center'>Actions</p>
                        </div>
                        <Divider sx={{borderColor:"#2f4057"}}/>
                        {allCategories.map(category=>{
                        if(searchInp.trim() === ""){
                            return(
                                <div key={category._id} className='hover:bg-blue-500/20 transition-colors duration-200'>
                                    <div className='flex justify-around items-center pb-5'>
                                        <img className='w-[80px] mt-2 rounded-2xl' src={category.image}></img>
                                        <p className='w-[80px] text-center'>{category.name}</p>
                                        {/* actions */}
                                        <div>
                                            <IconButton >
                                                <EditIcon onClick={()=>{handleOpenEditDialog(category)}} color="primary"/>
                                            </IconButton>
                                            <IconButton>
                                                <DeleteIcon  onClick={()=>{handleOpenDeleteDialog(category._id)}}  color="error"/>
                                            </IconButton>
                                        </div>
                                    </div>
                                    <Divider sx={{borderColor:"#2f4057"}}/>
                                </div>
                            );
                        }else if(category.name.toLowerCase().includes(searchInp.toLowerCase())){
                            return(
                            <div key={category._id} className='hover:bg-blue-500/20 transition-colors duration-200'>
                                    <div className='flex justify-around items-center pb-5'>
                                        <img className='w-[80px] mt-2 rounded-2xl' src={category.image}></img>
                                        <p className='w-[80px] text-center'>{category.name}</p>
                                        {/* actions */}
                                        <div>
                                            <IconButton  >
                                                <EditIcon onClick={()=>{handleOpenEditDialog(category)}} color="primary"/>
                                                </IconButton>
                                            <IconButton >
                                                <DeleteIcon onClick={()=>{handleOpenDeleteDialog(category._id)}} color="error"/>
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
            <Dialog  open={openAddCategoryDialog} onClose={()=>setOpenAddCategoryDialog(false)}
                PaperProps={{
                    sx:{
                        backgroundColor: "transparent",
                        boxShadow: "none",
                    }
                }}>
                    <AdminAddCategoryCard/>
            </Dialog>
            {/* delete Dialog */}
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog} >
                    <DialogTitle id="alert-dialog-title">
                        Are You Sure Wanna Delete This Categgory?
                    </DialogTitle>
                    <DialogContent > 
                        <p className='text-red-600'>
                            This will affect all Products in this Category!
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog}>Disagree</Button>
                        <Button onClick={()=>{
                                    handleDeleteCategory(selectedCategoryId);
                                    handleCloseDeleteDialog();
                                }} autoFocus>
                            Agree
                        </Button>
                    </DialogActions>
                </Dialog>
                {/* Edit Dialog */}
                <Dialog  open={openEditDialog} onClose={handleCloseEditDialog}
                    PaperProps={{
                        sx:{
                            backgroundColor: "transparent",
                            boxShadow: "none",
                        }
                    }}>
                        <AdminEditCategoryCard category={selectedCategoryToEdit} close={handleCloseEditDialog}/>
                </Dialog>
        </div>
    );
}