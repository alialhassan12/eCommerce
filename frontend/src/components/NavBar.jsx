import {Link} from 'react-router-dom';
//icons
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export default function NavBar({active}){
    return (
        <div className="flex sticky justify-between items-center text-white top-0 left-0 z-50">
            {/* logo */}
            <div className=" w-[100px] h-[100px] flex justify-center items-center">
                <img src="../../logo.png" className=""/>
            </div>
            {/* Nav Elements */}
            <div>
                <ul className="flex justify-center items-center list-none space-x-5 p-3 bg-blue-500/20 rounded-2xl">
                    <li className='hover:text-blue-400 font-semibold'>
                        <Link to="/" className={active=="Home"?"text-blue-400 font-semibold":""}>Home</Link>
                        </li>
                    <li className='hover:text-blue-400 font-semibold '>
                        <Link to="/category" className={active=="Categories"?"text-blue-400 font-semibold":""}>Categories</Link>
                        </li>
                    <li className='hover:text-blue-400 font-semibold'>
                        <Link className={active=="Search"?"text-blue-400 font-semibold":""}>Search</Link>
                        </li>
                    <li className='hover:text-blue-400 font-semibold'>
                        <Link className={active=="Support"?"text-blue-400 font-semibold":""}>Support</Link>
                        </li>
                </ul>
            </div>
            {/* Cart and profile */}
            <div>
                <ul className="flex justify-center items-center list-none space-x-5  bg-blue-500/20 rounded-2xl p-2.5" >
                    <li className='hover:text-blue-400 font-semibold'><Link><ShoppingCartIcon/></Link></li>
                    <li className='hover:text-blue-400 font-semibold'><Link><AccountCircleIcon/></Link></li>
                </ul>
            </div>
        </div>
    );
}