import React from 'react'
import H1 from '../components/H1'
import LoginInput from '../components/LoginInput'
import email from '../public/email.svg'
import teeth from '../public/teeth.svg'
import Image from 'next/image'
export default function RecoverPassword() {

    return(
 <>
  <div className='flex  flex-col justify-center items-center mt-166px'>
    <div className='mb-70px'>
      <H1
        textTitle='Recupera tu contraseña'
        textColor='plover-blue'
        />
    </div>
    <div className='grid grid-cols-2 '>
      <div className=''>
       <Image src={teeth} height={65} width={65} />
      </div>
      <div>
      <p className=''>
        Ingresa el correo con el que te
        registraste y te enviaremos un
        enlace para crear una nueva
        contraseña
      </p>
      </div>
    </div>
    <div>
        <LoginInput imagen={email} />
    </div>
  </div>

</>
 )
}