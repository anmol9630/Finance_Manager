import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = ({children , user , redirect='/' }) => {
    // console.log('======',children);
    if(user) 
        {return <Navigate to={redirect} replace />}

    if(children) return children;
    return <Outlet/>;


}

export default PublicRoutes;
