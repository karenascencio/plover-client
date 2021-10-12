import React from 'react'
import { useRouter } from 'next/router'
// creamos el boton de signout
export default function SignOutButton () {
  const router = useRouter()
  function logOut () {
    window.localStorage.removeItem('userToken')
    router.push('/login')
  }

  return (
    <button onClick={logOut} className='w-full bg-white block text-plover-blue text-center text-sm md:text-base py-1  rounded-lg'>Log out</button>
  )
}
