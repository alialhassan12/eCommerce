import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { useAuthStore } from '../store/authStore';
import { useState } from 'react';


function Login() {
    const {isLoggingIn,login}=useAuthStore();
    const [formData,setFormdata]=useState({
        email:"",
        password:"",
    });
    
    function handleSubmit(e){
        e.preventDefault();
        login(formData);
        console.log(formData);
    }

    return (
        <div className='signContainer'>
            <form className='signForm' onSubmit={()=>handleSubmit()}>
                <h3>Sign Up</h3>
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
                    onChange={(e)=>setFormdata({...formData,email:e.target.value})}
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
                    onChange={(e)=>setFormdata({...formData,password:e.target.value})}
                    />
                <Button onClick={handleSubmit} 
                    loading={isLoggingIn}
                    loadingPosition='end'
                    className='signBtn'
                    variant="contained"
                >Sign Up</Button>

                <Divider>or</Divider>
                <p>Already have an account? <Link sx={{color:"#fff",cursor:"pointer"}}>Sign in</Link></p>
            </form>
        </div>
    )
}

export default Login;
