import {Routes,Route,Navigate} from 'react-router-dom';
import  { Toaster } from 'react-hot-toast';
import AOS from 'aos';
//pages
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Category from './pages/Category.jsx';
import Products from './pages/Products.jsx';
import ProductInfo from './pages/ProductInfo.jsx';
import AdminMainPage from './pages/AdminMainPage.jsx';
//component
import CircularProgress from '@mui/material/CircularProgress';
import ProtectedRoutes from './components/protectedRoutes.jsx';
//hooks
import { useAuthStore } from './store/authStore.js';
import { useEffect } from 'react';

function App() {
  const checkAuth=useAuthStore((state)=>state.checkAuth);
  const {isCheckingAuth,authUser}=useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);

  if(isCheckingAuth){
    return <div style={{display:"flex",justifyContent:"center", alignItems:"center" ,width:"100vw",height:"100vh"}}>
            <CircularProgress />
          </div>
  }

  //intialize aos for the scroll animation
  AOS.init({
    duration:1000
  });


  return (
    <>
      <Routes>
        {/* <Route 
          path="/" 
          element={<ProtectedRoutes allowedRole={'client'} authUser={authUser}>
                      <Home/>
                  </ProtectedRoutes>}
          />

        <Route 
          path="/admin/Dashboard" 
          element={<ProtectedRoutes allowedRole={'admin'} authUser={authUser}>
                      <Dashboard/>
                  </ProtectedRoutes>}
          /> */}
        <Route path='/' element={authUser?<Home/>:<Navigate to={'/login'}/>}></Route>
        <Route path='/admin/Dashboard' element={authUser?.role ==='admin'?<AdminMainPage/>:<Navigate to={'/login'}/>}></Route>
        <Route path="/signup" element={!authUser?<Signup/>:<Navigate to={"/"}/>}/>
        <Route path="/login" element={!authUser?<Login/>:<Navigate to={"/"}/>}/>
        <Route path='/category' element={!authUser?<Login/>:<Category/>}></Route>
        <Route path='/category/:id' element={!authUser?<Login/>:<Products/>}></Route>
        <Route path='/category/:id/:prodId' element={!authUser?<Login/>:<ProductInfo/>}></Route>
      </Routes>
      
      <Toaster/>
    </>
  )
}

export default App;
