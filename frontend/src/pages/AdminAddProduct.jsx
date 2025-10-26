import 'aos/dist/aos.css';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';


export default function AdminAddProduct(){

    return(
        <div className="w-full space-y-15" data-aos="fade-up">
            <h1 className="text-center mt-[50px]">Add Product</h1>
            <div className='flex justify-center items-center'>
                <form className='w-[500px] p-[20px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] shadow-[0_0_20px_rgba(0,0,0,0.4)]'>
                    <h2 className='text-blue-400 text-[24px]'>Create New Product</h2>
                    <div className='mt-10 '>
                        {/* product name TextField */}
                        <TextField
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
                    </div>
                </form>
            </div>
        </div>
    );
}