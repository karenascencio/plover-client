import React from 'react'
import Image from 'next/image'


export default function LoginInput( {imagen, placeHolder, type} ) {
  return(
  <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-250px md:w-408px lg:w-539px'  >
    <Image src={imagen} heigth={40} width={40} />
    <input
      className='w-full py-1 pl-1 border-0 focus:outline-none'
      type={type}
      placeholder={placeHolder}
      required
    />
  </div>
  )
}