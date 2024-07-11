import React from 'react'

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full px-6 mx-auto'>
      {children}
    </div>
  )
}

export default Container