import React, { useContext } from 'react'
import { UserContex } from '../../context/userContext'
import SideMenu from './SideMenu'
import Navbar from './BlogLayouts/Navbar'

export default function DashboardLayout({children, activeMenu}) {
  const {user} = useContext(UserContex)
  return (
    <div className=''>
      <Navbar activeMenu={activeMenu}/>

      {user && (
        <div className='flex'>
          <div className='max-[1080px]:hidden'>
            <SideMenu activeMenu={activeMenu} setOpenSideMenu={()=>{}}/>
          </div>
          <div className='grow mx-5'>{children}</div>
        </div>
      )}
    </div>
  )
}
