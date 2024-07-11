import React from 'react'
import Header from '../components/header'
import NavSidebar from '../components/nav-sidebar'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      <div className='flex h-full'>
        <NavSidebar />
        { children }
      </div>
    </div>
  )
}

export default Layout