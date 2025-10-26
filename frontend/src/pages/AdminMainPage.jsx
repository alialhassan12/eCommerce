import AdminSideBar from '../components/adminSideBar';
import 'aos/dist/aos.css';
import { useAdminPagesStore } from '../store/adminPagesStore';
//pages
import AdminDashboard from './AdminDashboard';
import AdminAddProduct from './AdminAddProduct';

export default function Dashboard(){
    const {page}=useAdminPagesStore();

    return(
        <div className="h-[1000px] flex" >
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
                            ""
                }
            </div>
        </div>
    );
}