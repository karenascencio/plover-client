import React from 'react'
import H1 from '../components/H1'
import LoginInput from '../components/LoginInput'
import LoginButtons from '../components/LoginButtons'
import email from '../public/email.svg'
import lock from '../public/lock.svg'
import Image from 'next/image'

export default function Login () {
  return (
    <>
      <div className='flex  justify-center flex-col items-center mt-50px md:mt-166px'>
        <div className='text-center'>
          <H1
          textTitle='Iniciar sesión'
          textColor='plover-blue'
        />
        </div>
        <div className=' mb-50px  mt-70px w-200px'>
          <LoginInput imagen={email} placeHolder='Correo' type='email' />
          <LoginInput imagen={lock} placeHolder='Contraseña' type='password' />
        </div>
        <LoginButtons title='Iniciar sesión' />
        <p className=' text-login-blue text-14px mb-4 mt-4 '>¿No tienes una cuenta?<a className='hover:text-plover-blue hover:font-bold ' href='#'> Registrate</a></p>
        <p className=' text-login-blue text-14px '><a className='hover:text-plover-blue hover:font-bold ' href='#'>¿Olvidaste la contraseña?</a></p>

      </div>
    </>
  )
}
