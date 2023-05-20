import React from 'react'
import { useSelector } from "react-redux"
import Forbiden from "./Forbiden";
import { Outlet } from "react-router-dom";



function AuthorizeRoutes({ requireRoles }) {

    const { auth } = useSelector((state) => state.auth);

    const roles = auth.roles.map(role => role.name);
     // chỉ cần chứa 1 cái trong danh sách role thì trả về true
    const canAccess = requireRoles.some(role => roles.includes(role));


    if (!canAccess) {
        return <Forbiden />
    }

    return (
        <>
             {/* nếu đúng thì trả về các phần tử con trong nó  */}
            <Outlet />
        </>
    )


}

export default AuthorizeRoutes;