import AdminSideBar from '../components/adminSideBar';
import 'aos/dist/aos.css';
import { useAdminPagesStore } from '../store/adminPagesStore';
//pages
import AdminDashboard from './AdminDashboard';
import AdminAddProduct from './AdminAddProduct';
import AdminAddCategory from './AdminAddCategory';

export default function Dashboard(){
    const {page}=useAdminPagesStore();

    return(
        <div className=" flex space-x-10" >
            <AdminSideBar  active={page}></AdminSideBar>
            {/* page Conetent */}
            <div className="w-full" data-aos="fade-up">
                {page ==="dashboard"
                    ?
                        <AdminDashboard/>
                    :
                        page==="addProduct"
                    ?
                        <AdminAddProduct/>
                    :
                        page==="categories"
                    ?   
                        <AdminAddCategory/>
                    :
                        ""
                }
            </div>
        </div>
    );
}