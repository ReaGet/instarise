import React from 'react'
import Header from '@/components/header/header'
import Container from '@/components/container'
import NavSidebar from '@/components/nav-sidebar/nav-sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <Container className='flex h-full'>
        <NavSidebar />
        <main>
          <Outlet />
        </main>
      </Container>
    </>
  )
}

export default Layout