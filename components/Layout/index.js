import React from 'react'
import NavBar from '../NavBar'

export default function Layout ({ children }) {
  return (

    <div className='flex flex-col sm:flex-row '>
      <NavBar />
      <main className='flex justify-center flex-grow sm:w-65vw mx-11'>{children}</main>
    </div>
  )
}
