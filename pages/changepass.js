import React from 'react'
import { useState } from 'react'
import H1 from '../components/H1'
import PasswordInput from '../components/PasswordInput'
import LoginButtons from '../components/LoginButtons'
import lock from '../public/lock.svg'
import teeth from '../public/teeth.svg'
import showpsw from '../public/showpsw.svg'
import hidepsw from '../public/hidepsw.svg'
import Image from 'next/image'

export default function ChangePass() {
    const [seePassword, setSeePassword]= useState(false)

  return (
    <>
    <div className='flex  justify-center flex-col items-center mt-50px md:mt-166px'>
      <div className='text-center'>
        <H1
          textTitle='Cambia tu contraseña'
          textColor='plover-blue'
        />
      </div>
      <div  className=' mb-50px  mt-70px w-200px'>
        <PasswordInput show={showpsw} hide={hidepsw} imagen={lock} placeHolder='Contraseña' type='password' />
        <PasswordInput show={showpsw} hide={hidepsw} imagen={lock} placeHolder='Reingresa la contraseña' type='password' />
      </div>
      <LoginButtons title='Cambiar contraseña' />
        <div className='flex justify-center  mt-4 '>
          <div className='flex invisible sm:visible mr-4 h-auto m-auto'>
            <Image src={teeth} height={65} width={65} />
          </div>
          <div className=''>
          <ul className=' list-disc text-14px w-250px text-login-blue'>La contraseña debe contener:
            <li>Letras mayúsculas y minúsculas</li>
            <li>Números y signos especiales</li>
            <li>Tener un mínimo de 8 caracteres</li>
          </ul>
        </div>
          </div>
     </div>
    </>
  )
}