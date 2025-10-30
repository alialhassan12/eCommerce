// icons
import GroupIcon from '@mui/icons-material/Group';
import { useAdminPagesStore } from '../store/adminPagesStore';
import { useEffect } from 'react';

export default function AdminDashboard(){
    const {getTotalUsers,totalUsers}=useAdminPagesStore();
    useEffect(()=>{
        getTotalUsers();
    },[getTotalUsers]);
    console.log(totalUsers);

    return(
        <div className="w-full flex flex-wrap mt-10" data-aos="fade-up">
            {/* cards */}
            <div>

                <div className="flex flex-col min-w-[300px] w-fit p-[20px] bg-gradient-to-b from-[#0a0f1c] via-[#0e1422] to-[#0b0f19] rounded-[10px] border border-[#1e2a3a] hover:shadow-[0_0_20px_rgba(0,0,0,0.4)] " >
                    {/* icon */}
                    <GroupIcon className='mb-2 ' sx={{
                        fontSize:"50px",
                    }}/>
                    <div>
                        <h3 className='mb-3 '>Total Users</h3>
                        <p className='text-3xl'>{totalUsers.count}</p>
                    </div>
                </div>

            </div>
        </div>
    );
}