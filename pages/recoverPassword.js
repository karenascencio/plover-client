import React, { useState } from 'react'
import api from '../lib/api'
import H1 from '../components/H1'
import LoginInput from '../components/LoginInput'
import LoginButtons from '../components/LoginButtons'
import emailImg from '../public/email.svg'
import teeth from '../public/teeth.svg'
import Image from 'next/image'

export default function RecoverPassword () {
  const [emailData, setEmailData] = useState({ email: '' })

  const Email = async emailInfo => {
    console.log('email INFO', emailInfo)
    setEmailData(emailInfo)
  }

  const handlerSubmit = event => {
    event.preventDefault()
    Email(emailData)
  }

  const buttonHandler = async () => {
    try {
      console.log('handler', emailData)
      const response = await api.recovery(emailData)
      console.log(response)
    }
    catch (error) { console.log(error.message) }
  }

  return (
    <>
      <form onSubmit={handlerSubmit} > 
        <div className='flex  justify-center flex-col justify-center items-center mt-166px'>
          <div className='text-center flex mb-70px'>
            <H1
              textTitle='Recupera tu contraseña'
              textColor='plover-blue'
            />
          </div>
          <div className='flex justify-center justify-items-center mb-70px'>
            <div className='invisible sm:visible ml-2'>
              <Image src={teeth} height={65} width={65} />
            </div>
            <div className='flex justify-center items-center'>
              <p className=''>
                Ingresa el correo con el que te
                registraste y te enviaremos un
                enlace para crear una nueva
                contraseña
              </p>
            </div>
          </div>
          <div className='mb-70px w-200px'>


            <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-250px md:w-408px lg:w-539px'>
              <Image src={emailImg} heigth={40} width={40} />
              <input
                className='w-full py-1 pl-1 border-0 focus:outline-none'
                type='email'
                placeholder='Correo'
                onChange={event => setEmailData({ ...emailData, email: event.target.value })}
                value={emailData.email}
                required
              />
            </div>
            
          </div>
          <LoginButtons title='Cambiar contraseña' buttonHandler={buttonHandler} />
          <div className='mt-4' />
        </div>
      </form>
    </>
  )
}
