import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useAuthStore } from "../store/authStore";
import Button from "@mui/material/Button";
import EditIcon from '@mui/icons-material/Edit';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Dialog from "@mui/material/Dialog";
import { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";

export default function Profile(){
    const {authUser,isLoggingIn,logout,isLoading,editProfile,changePassword,deleteAccount}=useAuthStore();
    const navigate =useNavigate();
    // states
    const [userUpdates,setUserUpdates]=useState({
        id:authUser._id,
        fullName:authUser.fullName,
        email:authUser.email,
    });
    const [newPasswords,setNewPasswords]=useState({
        id:authUser._id,
        newPass:"",
        confirmPass:"",
    });
    const [openLogOutDialog,setOpenLogOutDialog]=useState(false);
    const [openEditDialog,setOpenEditDialog]=useState(false);
    const [openChangeDialog,setOpenChangeDialog]=useState(false);
    const [openDeleteDialog,setOpenDeleteDialog]=useState(false);
    //handlers
    function handleLogOut(){
        logout();
        navigate('/');
    }
    function handleDeleteAccount(){
        deleteAccount(authUser._id);
        handleLogOut();
    }
    function handleCloseLogOutDialog(){
        setOpenLogOutDialog(false);
    }
    function handleOpenLogOutDialog(){
        setOpenLogOutDialog(true);
    }
    function handleOpenEditDialog(){
        setOpenEditDialog(true);
    }
    function handleCloseEditDialog(){
        setOpenEditDialog(false);
    }
    function handleOpenChangeDialog(){
        setOpenChangeDialog(true);
    }
    function handleCloseChangeDialog(){
        setOpenChangeDialog(false);
    }
    function handleOpenDeleteDialog(){
        setOpenDeleteDialog(true);
    }
    function handleCloseDeleteDialog(){
        setOpenDeleteDialog(false);
    }

    return(
        <div className="min-h-[100vh]">
            {/* inner conatiner */}
            <div className="ml-10 mr-10 p-3 ">
                <NavBar active={"Profile"}></NavBar>
                <div data-aos="fade-up">
                    <h1 className="mt-2 mb-2">Profile</h1>
                    {/* Profile data */}
                    <div className="p-7 mr-[50px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]"> 
                        <div className="flex flex-col gap-1">
                            <p className="text-[#94a3b8]">Full Name:</p>
                            <p>{authUser.fullName}</p>
                            <p className="text-[#94a3b8]">Email:</p>
                            <p>{authUser.email}</p>
                            <p className="text-[#94a3b8]">Role:</p>
                            <p>{authUser.role}</p>
                            <p className="text-[#94a3b8]">Joind at:</p>
                            <p>{new Date(authUser.createdAt).getDate()}-{new Date(authUser.createdAt).getMonth()}-{new Date(authUser.createdAt).getFullYear()}</p>
                        </div>
                    </div>
                    <h1 className="mt-2 mb-2">Settings</h1>
                    {/* Settings */}
                    <div className="p-7 mr-[50px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]">
                        <div className="flex flex-col gap-2">
                            <Button onClick={handleOpenEditDialog} variant="outlined" endIcon={<EditIcon/>}>Edit Profile</Button>
                            <Button onClick={handleOpenChangeDialog} variant="outlined" endIcon={<ChangeCircleIcon/>}>Change Password</Button>
                            
                            {isLoggingIn
                            ?
                                <Button  variant="outlined">
                                    <div className="w-full text-center">
                                        <div className="loading loading-infinity loading-xl text-blue-500"></div>
                                    </div>
                                </Button>
                            :
                                <Button onClick={handleOpenLogOutDialog} variant="outlined" endIcon={<ExitToAppIcon/>}>Sign Out</Button>
                            }
                            
                            <Button onClick={handleOpenDeleteDialog} variant="contained" endIcon={<HighlightOffIcon/>} color="error">Delete Account</Button>
                        </div>
                    </div>
                    {/* logout Dialog */}
                    <Dialog
                        open={openLogOutDialog}
                        onClose={handleCloseLogOutDialog}
                        PaperProps={{
                            sx:{
                                background:"linear-gradient(to bottom, #0a0f1c, #0e1422, #0b0f19)",
                                color:"#fff",
                            }
                        }}>
                        <DialogTitle>Are You Sure You Want To Sign out?</DialogTitle>
                        <DialogActions>
                        <Button onClick={handleCloseLogOutDialog}>No</Button>
                        <Button onClick={handleLogOut} autoFocus>
                            Yes
                        </Button>
                        </DialogActions>
                    </Dialog>
                    {/* Delete Dialog */}
                    <Dialog
                        open={openDeleteDialog}
                        onClose={handleCloseDeleteDialog}
                        PaperProps={{
                            sx:{
                                background:"linear-gradient(to bottom, #0a0f1c, #0e1422, #0b0f19)",
                                color:"#fff",
                            }
                        }}>
                        <DialogTitle>Are You Sure You Want Delete Account?</DialogTitle>
                        <DialogActions>
                        <Button onClick={handleCloseDeleteDialog}>No</Button>
                        <Button variant="contained" onClick={handleDeleteAccount} color="error" autoFocus>
                            Yes
                        </Button>
                        </DialogActions>
                    </Dialog>
                    {/* Edit Profile Dialog */}
                    <Dialog
                        open={openEditDialog}
                        onClose={handleCloseEditDialog}
                        PaperProps={{
                            sx:{
                                background: "linear-gradient(to bottom, #0a0f1c, #0e1422, #0b0f19)",
                                boxShadow: "none",
                                padding:"20px",
                                width:"500px",
                                color:"#fff",
                            }
                        }}
                        >
                        <h2 className="text-blue-500 text-2xl mb-5">Edit Profile</h2>
                        <TextField
                            value={userUpdates.fullName}
                            onChange={(e)=>setUserUpdates({...userUpdates,fullName:e.target.value})}
                            fullWidth
                            variant="standard" label="Full Name" name='productname'
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
                                }}>
                        </TextField>
                        <TextField
                            value={userUpdates.email}
                            onChange={(e)=>setUserUpdates({...userUpdates,email:e.target.value})}
                            fullWidth
                            variant="standard" label="Email" name='productname'
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
                                }}>
                        </TextField>
                        {isLoading
                        ?
                            <div className="w-full text-center">
                                <div className="loading loading-infinity loading-xl text-blue-500"></div>
                            </div>
                        :
                            <Button onClick={()=>editProfile(userUpdates)} 
                                variant="contained">Edit</Button>
                        }
                    </Dialog>
                    {/* Change Password Dialog */}
                    <Dialog
                        open={openChangeDialog}
                        onClose={handleCloseChangeDialog}
                        PaperProps={{
                            sx:{
                                background: "linear-gradient(to bottom, #0a0f1c, #0e1422, #0b0f19)",
                                boxShadow: "none",
                                padding:"20px",
                                width:"500px",
                                color:"#fff",
                            }
                        }}
                        >
                        <h2 className="text-blue-500 text-2xl mb-5">Edit Profile</h2>
                        <TextField
                            value={newPasswords.newPass}
                            onChange={(e)=>setNewPasswords({...newPasswords,newPass:e.target.value})}
                            fullWidth
                            variant="standard" label="New Password" name='productname'
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
                                }}>
                        </TextField>
                        <TextField
                            value={newPasswords.confirmPass}
                            onChange={(e)=>setNewPasswords({...newPasswords,confirmPass:e.target.value})}
                            fullWidth
                            variant="standard" label="Email" name='productname'
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
                                }}>
                        </TextField>
                        {isLoading
                        ?
                            <div className="w-full text-center">
                                <div className="loading loading-infinity loading-xl text-blue-500"></div>
                            </div>
                        :
                            <Button onClick={()=>changePassword(newPasswords)}
                                variant="contained">Change Password</Button>
                        }
                    </Dialog>
                </div>
            </div>
        </div>
    );
}