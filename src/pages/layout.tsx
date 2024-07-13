import React from 'react'
import Header from '@/components/header/header'
import Container from '@/components/container'

const Layout = ({ children }: { children: React.ReactNode }) => {
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