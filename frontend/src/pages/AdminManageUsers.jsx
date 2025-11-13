import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import { useAdminPagesStore } from "../store/adminPagesStore";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import BlockIcon from '@mui/icons-material/Block';
import UndoIcon from '@mui/icons-material/Undo';

export default function AdminManageUsers(){
    const [searchInp,setSearchInp]=useState("");
    const {getAllUsers,
            allUsers,
            fetchingProducts,
            banUser,
            unBanUser,
            bannedUser,
            unBannedUser,
            promoteUser,
            demoteUser,
            promotedUser,
            demotedUser}=useAdminPagesStore();

    useEffect(()=>{
        getAllUsers();
    },[getAllUsers,bannedUser,unBannedUser,promotedUser,demotedUser]);

    //handlers
    function handleBanUser(userId){
        // console.log(userId);
        banUser(userId);
    }
    function handleUnBanUser(userId){
        unBanUser(userId);
    }
    function handlePromote(userId){
        promoteUser(userId);
    }
    function handleDemote(userId){
        demoteUser(userId);
    }

    return(
        <div className="w-full space-y-15 " data-aos="fade-up">
            {/* header */}
            <div className="flex justify-between items-center mt-[50px] mr-[50px]">
                <h1 >Manage Users</h1>
            </div>
            {/* show Products  */}
            <div className=' p-7 mr-[50px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]'>
                {/* header */}
                <p className='text-2xl'>All Users</p>
                <TextField
                    value={searchInp}
                    onChange={(e)=>setSearchInp(e.target.value)}
                    variant='outlined' 
                    placeholder='Search Users'
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
                {/* display Users */}
                {
                    fetchingProducts
                    ?
                        <div className='flex justify-center items-center mt-[20px]'>
                            <span className="loading loading-spinner loading-xl"></span>
                        </div>
                    :
                        <div className='mt-[20px] mb-[20px] border-b-amber-1 '>
                            {/* header */}
                            <div className='flex justify-around items-center pb-5 '>
                                <p className='w-[10%] text-center' >Name</p>
                                <p className='w-[20%] text-center'>Email</p>
                                <p className='w-[10%] text-center'>Role</p>
                                <p className='w-[200px] text-center'>Actions</p>
                            </div>
                            <Divider sx={{borderColor:"#2f4057"}}/>
                            {allUsers.map((user)=>{
                                if(searchInp.trim() === ""){
                            return(
                                <div key={user._id} className='hover:bg-blue-500/20 transition-colors duration-200'>
                                    <div className='flex justify-around items-center pb-5'>
                                        <p className='w-[10%] mt-2 rounded-2xl text-center'>{user.fullName}</p>
                                        <p className='w-[20%] text-center'>{user.email}</p>
                                        <p className='w-[10%] text-center'>{user.role}</p>
                                        {/* actions */}
                                        <div className="w-[200px] flex justify-center items-center mt-3">
                                            {user.role=="client"
                                            ?
                                                <button onClick={()=>handlePromote(user._id)} 
                                                    className="btn btn-outline btn-primary">Promote</button>
                                            :
                                                <button onClick={()=>handleDemote(user._id)} 
                                                    className="btn btn-outline btn-primary">Demote</button>
                                            }

                                            {user.banned
                                            ?
                                                <IconButton onClick={()=>handleUnBanUser(user._id)} color="error">
                                                    <UndoIcon color="success"/>
                                                </IconButton>
                                            :
                                                <IconButton onClick={()=>handleBanUser(user._id)} color="error">
                                                    <BlockIcon color="error"/>
                                                </IconButton>
                                            }
                                        </div>
                                    </div>
                                    <Divider sx={{borderColor:"#2f4057"}}/>
                                </div>
                            );
                        }else if(user.fullName.toLowerCase().includes(searchInp.toLowerCase())){
                            return(
                                <div key={user._id} className='hover:bg-blue-500/20 transition-colors duration-200'>
                                    <div className='flex justify-around items-center pb-5'>
                                        <p className='w-[10%] mt-2 rounded-2xl text-center'>{user.fullName}</p>
                                        <p className='w-[20%] text-center'>{user.email}</p>
                                        <p className='w-[10%] text-center'>{user.role}</p>
                                        {/* actions */}
                                        <div className="w-[200px] flex justify-center items-center mt-3">
                                            {user.role=="client"
                                            ?
                                                <button onClick={()=>handlePromote(user._id)} 
                                                    className="btn btn-outline btn-primary">Promote</button>
                                            :
                                                <button onClick={()=>handleDemote(user._id)} 
                                                    className="btn btn-outline btn-primary">Demote</button>
                                            }
                                            <IconButton onClick={()=>handleBanUser(user._id)} color="error">
                                                <BlockIcon color="error"/>
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
        </div>
    );
}