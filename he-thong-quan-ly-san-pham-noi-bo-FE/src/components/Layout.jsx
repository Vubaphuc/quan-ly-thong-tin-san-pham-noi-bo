import React from 'react'
import { Outlet } from 'react-router-dom'
import Headers from './Headers'
import Sidebar from './Sidebar'

function Layout() {
  return (
    <div>
        <Sidebar />
        <div className='wrapper-container'>
            <Headers />
            <Outlet />
        </div>
    </div>
  )
}

export default Layout