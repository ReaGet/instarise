import Header from '@/components/header/header'
import Container from '@/components/container'
import NavSidebar from '@/components/sidebar/nav-sidebar'
import InfoSidebar from '@/components/sidebar/info-sidebar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <Header />
      <Container className='flex h-full'>
        <NavSidebar />
        <main className='flex flex-col flex-1 gap-10 p-6'>
          <Outlet />
        </main>
        <InfoSidebar />
      </Container>
    </>
  )
}

export default Layout