import React from 'react'
import Image from 'next/image'


export default function LoginInput({imagen}) {
  return(
  <div className='flex justify-center justify-items-start border-b-2 border-black w-250px md:w-408px lg:w-539px'  >
    <Image src={imagen} heigth={30} width={30} />
    <input
      className='w-full py-1 pl-1 border-0 focus:outline-none'
      type='email'
      placeholder='Correo'
      required
    />
  </div>
  )
}