import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserContex } from '../context/userContext'

export default function PrivateRoute({allowedRoles}) {
  const {user, loading} = useContext(UserContex);

  if(loading){
    return <div>Loding...</div>; //Show a loading indicator
  }
  
  if(!user){
    return <Navigate to="/" replace />;
  }

  if(!allowedRoles.includes(user.role)){
    return <Navigate to="/" replace/>
  }

  return <Outlet/>;
}
