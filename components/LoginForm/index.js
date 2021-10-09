import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
// .: Components
import H1 from '../../components/H1'
import LoginInput from '../../components/LoginInput'
import LoginButtons from '../../components/LoginButtons'
import PasswordLoginInput from '../../components/PasswordInput'
// .: Images
import emailImg from '../../public/email.svg'
import lock from '../../public/lock.svg'
import showpsw from '../../public/showpsw.svg'
import hidepsw from '../../public/hidepsw.svg'
import api from '../../lib/api'

export default function LoginForm ({ Login, error, buttonHandler, webToken }) {
  const [details, setDetails] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const handlerSubmit = event => {
    event.preventDefault()
    Login(details)
  }
  console.log('error', error)
  return (
    <>
      <form onSubmit={handlerSubmit}>
        <div className='flex  justify-center flex-col items-center mt-50px md:mt-166px'>
          <div className='text-center'>
            <H1
              textTitle='Iniciar sesión'
              textColor='plover-blue'
            />
          </div>
          {
           error &&
             <div className='flex justify-center text-red-800 mt-4 bg-red-200 text-center rounded p-1 w-280px md:w-408px lg:w-539px'>
               <p>La contraseña o el correo que ingresaste son incorrectos.</p>
             </div>
          }
          <div className='mb-50px  mt-70px w-200px'>
            <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-250px md:w-408px lg:w-539px'>
              <Image src={emailImg} heigth={40} width={40} />
              <input
                className='w-full py-1 pl-1 border-0 focus:outline-none'
                type='email'
                placeholder='Correo'
                onChange={event => setDetails({ ...details, email: event.target.value })}
                value={details.email}
                required
              />
            </div>

            <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-250px md:w-408px lg:w-539px'>
              <Image src={lock} heigth={40} width={40} />
              <input
                className='w-full py-1 pl-1 border-0 focus:outline-none'
                type={showPassword ? 'text' : 'password'}
                placeholder='password'
                name='password'
                onChange={event => setDetails({ ...details, password: event.target.value })}
                value={details.password}
                required
              />
              <button onClick={() =>
                setShowPassword(!showPassword)}
              >
                <Image src={showPassword ? showpsw : hidepsw} heigth={45} width={45} />
              </button>
            </div>
          </div>
          <LoginButtons title='Iniciar sesión' type='submit' buttonHandler={buttonHandler} />
          <p className=' text-login-blue text-14px mb-4 mt-4 '>¿No tienes una cuenta?
            <Link href='/dentist-register'>
              <a className='hover:text-plover-blue hover:font-bold '>
                Registrate
              </a>
            </Link>
          </p>
          <p className=' text-login-blue text-14px '>
            <Link href='/recovery-password'>
              <a className='hover:text-plover-blue hover:font-bold '>
                ¿Olvidaste la contraseña?
              </a>
            </Link>
          </p>
        </div>
      </form>
    </>
  )
}
