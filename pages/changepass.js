import React from 'react'
import H1 from '../components/H1'
import LoginInput from '../components/LoginInput'
import LoginButtons from '../components/LoginButtons'
import lock from '../public/lock.svg'
import teeth from '../public/teeth.svg'
import Image from 'next/image'

export default function ChangePass() {
  return (
    <>
    <div className='flex  justify-center flex-col items-center mt-50px md:mt-166px'>
      <div className='text-center'>
        <H1
          textTitle='Cabia tu contraseña'
          textColor='plover-blue'
        />
      </div>
      <div  className=' mb-50px  mt-70px w-200px'>
        <LoginInput imagen={lock} placeHolder='Correo' type='password' />
        <LoginInput imagen={lock} placeHolder='Contraseña' type='password' />
      </div>
      <LoginButtons title='Cambiar contraseña' />
        <div>
          <Image src={teeth} height={65} width={65} />
          <ul className='list-disc'>La constraseña debe contener:
            <li>Letras mayúsculas y minúsculas</li>
            <li>Números y signos especiales</li>
            <li>Tener un mínimo de 8 caracteres</li>
          </ul>
        </div>
     </div>
    </>