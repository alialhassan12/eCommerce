import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { Link } from "react-router";
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
    }

    return (
        <div className='signContainer'>
            <form className='signForm' onSubmit={()=>handleSubmit()}>
                <h3>Login</h3>
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
                {
                    isLoggingIn
                ?
                    <div className="w-full text-center">
                        <div className="loading loading-infinity loading-xl text-blue-500"></div>
                    </div>
                :
                    <Button onClick={handleSubmit} 
                        className='signBtn' 
                        variant="contained">Login</Button>
                }

                {/* <Divider>or</Divider> */}
                <p>Dont have an account? <Link to={"/signup"} sx={{cursor:"pointer"}}>SignUp</Link></p>
            </form>
        </div>
    )
}

export default Login;
