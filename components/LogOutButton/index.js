import React from 'react'
import { useRouter } from 'next/router'
<<<<<<< HEAD
//creamos el boton de signout
export default function SignOutButton() {
    const router = useRouter()
    function logOut(){
        window.localStorage.removeItem('userToken')
        router.push('/login')
    }
    return (
         <button onClick={logOut} className='w-full bg-white block text-plover-blue text-center text-sm md:text-base py-1  rounded-lg'>Log out</button>
    )
=======
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
>>>>>>> b77441df81b470ad536d2bd2deb599b115a75253
}
