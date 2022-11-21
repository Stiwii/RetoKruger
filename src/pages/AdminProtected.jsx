import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtected = () => {
  const comprobador = useSelector(state => state.comprobador)
  if(comprobador==true){
    return <Outlet />
  }else{
    return <Navigate to ='/' />
}

}

export default AdminProtected