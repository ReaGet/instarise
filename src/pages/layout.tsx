import React from 'react'
import Header from '@/components/header/header'
import Container from '@/components/container'
import { useAuthGuard } from '@/hooks/useAuthGuard';

const Layout = ({ children }: { children: React.ReactNode }) => {
  useAuthGuard();

  return (
    <>
      <Header />
      <Container className='flex h-full'>
        { children }
      </Container>
    </>
  )
}

export default Layout