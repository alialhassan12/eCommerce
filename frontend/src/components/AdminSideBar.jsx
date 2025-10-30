import { useAdminPagesStore } from '../store/adminPagesStore';
// icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';

export default function AdminSideBar({active}){
    const {changePage}=useAdminPagesStore();
    const handlePageChange=(page)=>{
        changePage(page);
    }
    
    return(
        <div className="h-[100vh] sticky z-10 top-0 left-0  " data-aos="fade-right">
            <ul className="menu bg-base-200 min-h-full min-w-80 p-4 space-y-2 bg-blue-500/20">
                {/* logo */}
                <div className="w-full flex justify-center mb-10">
                    <img src="/logo.png" className="w-[100px]" alt="" />
                </div>
                {/* Sidebar content here */}
                <li ><a onClick={()=>handlePageChange("dashboard")} className={active=="dashboard"?"bg-blue-400":""}>
                    <DashboardIcon/>Dashboard
                    </a></li>
                <li><a href="/" className={active=="home"?"bg-[#2e343b]":""}>
                <HomeIcon/>Home
                </a></li>
                <li><a onClick={()=>handlePageChange("addProduct")} className={active=="addProduct"?"bg-blue-400":""}>
                    <InventoryIcon/>Manage Products
                    </a></li>
            </ul>
        </div>
    )
}