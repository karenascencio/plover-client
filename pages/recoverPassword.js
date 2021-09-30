import React from 'react'
import H1 from '../components/H1'
import LoginInput from '../components/LoginInput'
import LoginButtons from '../components/LoginButtons'
import email from '../public/email.svg'
import teeth from '../public/teeth.svg'
import Image from 'next/image'

export default function RecoverPassword() {

    return(
 <>
  <div className='flex  justify-center flex-col justify-center items-center mt-166px'>
    <div className='text-center flex mb-70px'>
      <H1
        textTitle='Recupera tu contraseña'
        textColor='plover-blue'
        />
    </div>
    <div className='flex justify-center justify-items-center mb-70px'>
      <div className='invisible sm:visible ml-2' >
       <Image src={teeth} height={65} width={65} />
      </div>
      <div className='flex justify-center items-center'>
      <p className='' >
        Ingresa el correo con el que te
        registraste y te enviaremos un
        enlace para crear una nueva
        contraseña
      </p>
      </div>
    </div>
    <div  className='mb-70px w-200px'>
        <LoginInput imagen={email} />
    </div>
    <LoginButtons title='Cambiar contraseña' />
  </div>

</>
 )
}