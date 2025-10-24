import { Navigate } from "react-router-dom";

export default function ProtectedRoutes({children,allowedRole,authUser}){
    console.log("Auth User role: "+authUser?.role);
    console.log("Allowed role: "+allowedRole);
    if(!authUser){
        return <Navigate to={'/login'}></Navigate>
    }
    if(authUser?.role !== allowedRole){
        return <Navigate to={'/login'}/>
    }

    return children;
}