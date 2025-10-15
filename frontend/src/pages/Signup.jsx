import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';

function Signup() {
  const {signup,isSigningUp}=useAuthStore();
  const [formData,setFormData]=useState({
    fullName:"",
    email:"",
    password:"",
  });
  
  function handleSubmit(e){
    e.preventDefault();
    signup(formData);
  }

  return (
      <div className='signContainer'>
            <form className='signForm' onSubmit={()=>handleSubmit()}>
                <h3>Sign Up</h3>
                <label>Full Name</label>
                <TextField
                    sx={{
                        width:"100%",
                        input: { color: "#fff" }, // text color
                        label: { color: "#94a0b8a1" }, // label color
                        "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#555", // default border
                        },
                        "&:hover fieldset": {
                            borderColor: "#888", // on hover
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#4f9cff", // on focus
                        },
                        },
                    }}
                    type='email'
                    variant="outlined"
                    placeholder='Your Name'
                    value={formData.fullName}
                    onChange={(e)=>setFormData({...formData,fullName:e.target.value})}
                    />
                <label>Email</label>
                <TextField
                    sx={{
                        width:"100%",
                        input: { color: "#fff" }, // text color
                        label: { color: "#94a0b8a1" }, // label color
                        "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#555", // default border
                        },
                        "&:hover fieldset": {
                            borderColor: "#888", // on hover
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#4f9cff", // on focus
                        },
                        },
                    }}
                    type='email'
                    variant="outlined"
                    placeholder='your@gmail.com'
                    value={formData.email}
                    onChange={(e)=>setFormData({...formData,email:e.target.value})}
                    />
                <label>Password</label>
                <TextField
                    sx={{
                        width:"100%",
                        input: { color: "#fff" }, // text color
                        label: { color: "#94a0b8a1" }, // label color
                        "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                            borderColor: "#555", // default border
                        },
                        "&:hover fieldset": {
                            borderColor: "#888", // on hover
                        },
                        "&.Mui-focused fieldset": {
                            borderColor: "#4f9cff", // on focus
                        },
                        },
                    }}
                    type='password'
                    variant="outlined"
                    placeholder='••••••••••••' 
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                    />
                <Button onClick={handleSubmit} 
                    loading={isSigningUp}
                    loadingPosition='end'
                    className='signBtn'
                    variant="contained"
                >Sign Up</Button>

                {/* <Divider>or</Divider> */}
                <p>Already have an account? <Link to={'/login'} sx={{color:"#fff",cursor:"pointer"}}>login</Link></p>
            </form>
        </div>
  )
}

export default Signup;
