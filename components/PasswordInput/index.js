import React from 'react'
import { useState } from 'react'
import Image from 'next/image'

export default function PasswordInput( {name, show, hide, imagen, placeHolder, type} ) {
  const [showPassword, setShowPassword] = useState(false);
  return(
    <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-250px md:w-408px lg:w-539px'  >
      <Image src={imagen} heigth={40} width={40} />
      <input
        className='w-full py-1 pl-1 border-0 focus:outline-none'
        type={showPassword ? 'text' : 'password' }
        placeholder={placeHolder}
        name={name}
        required
      />
      <button onClick={()=> setShowPassword(!showPassword)}><Image src={showPassword ? show : hide} heigth={45} width={45} /></button>
    </div>
  )
}