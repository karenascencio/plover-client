import React, { useState } from 'react'

import { useRouter } from 'next/router'
import { resetPassword } from '../../lib/api'
import H1 from '../../components/H1'
import LoginButtons from '../../components/LoginButtons'
import lock from '../../public/lock.svg'
import teeth from '../../public/teeth.svg'
import showpsw from '../../public/showpsw.svg'
import hidepsw from '../../public/hidepsw.svg'
import Image from 'next/image'

export default function ChangePass () {
  const [seePassword, setSeePassword] = useState(false)
  const [successPop, setSuccessPop] = useState(false)
  const [falsePop, setFalsePop] = useState(false)
  const [resetPassword, setResetPassword] = useState({ password: '', verifyPassword: '' })
  const passwordRequirement = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const { query } = useRouter()
  const newPassword = newCode => {
    // console.log('contraseña:', newCode)
    // setResetPassword(newCode)
  }

  const handlerSubmit = event => {
    event.preventDefault()

    const { password, verifyPassword } = resetPassword
    console.log('pass', password)
    console.log('regex', password, passwordRequirement.test(password))

    const matchPassword = password === verifyPassword
    console.log('match', matchPassword)
    const requirements = passwordRequirement.test(password)

    if (matchPassword === false || requirements === false) {
      setFalsePop(true)
      console.log('La contraseña no cumple los requisitos')
    } else {
      setSuccessPop(true)
      newPassword(resetPassword)
    }
  }

  const buttonHandler = async () => {
    try {
      console.log('handler', resetPassword)
      const response = await resetPassword(resetPassword, query.id)
      if (response.success) {
        setTimeout(() => {
          router.push('/login')
        }, 5000)
      } else {
        setTimeout(() => {
        }, 5000)
      }
    } catch (error) { console.log(error.message) }
  }

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <div className='flex  justify-center flex-col items-center mt-50px md:mt-166px'>
          <div className='text-center'>
            <H1
              textTitle='Cambia tu contraseña'
              textColor='plover-blue'
            />
          </div>
          
          {successPop &&
            <div className='flex justify-center text-green-800  bg-green-200 text-center rounded p-1 w-280px md:w-408px lg:w-539px'>
              <p>Se ha mandado un correo con el enlace.</p>
            </div>
          }
          {
            falsePop &&
              <div className='flex justify-center text-red-800  bg-red-200 text-center rounded p-1 w-280px md:w-408px lg:w-539px'>
                <p>El correo que ingresaste no existe.</p>
              </div>
                  }
          <div className=' mb-10px  mt-70px w-200px'>
            <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-250px md:w-408px lg:w-539px'>
              <Image src={lock} heigth={40} width={40} />
              <input
                className='w-full py-1 pl-1 border-0 focus:outline-none'
                type={seePassword ? 'text' : 'password'}
                placeholder='Contraseña'
                onChange={event => setResetPassword({ ...resetPassword, password: event.target.value })}
                value={resetPassword.password}
                required
              />
              <button onClick={() => setSeePassword(!seePassword)}><Image src={seePassword ? showpsw : hidepsw} heigth={45} width={45} /></button>
            </div>
          </div>

          <div className=' mb-50px  w-200px'>
            <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-250px md:w-408px lg:w-539px'>
              <Image src={lock} heigth={40} width={40} />
              <input
                className='w-full py-1 pl-1 border-0 focus:outline-none'
                type={seePassword ? 'text' : 'password'}
                placeholder='Confirmar contraseña'
                onChange={event => setResetPassword({ ...resetPassword, verifyPassword: event.target.value })}
                value={resetPassword.verifyPassword}
                required
              />
              <button onClick={() => setSeePassword(!seePassword)}><Image src={seePassword ? showpsw : hidepsw} heigth={45} width={45} /></button>
            </div>
          </div>

          <LoginButtons title='Cambiar contraseña' buttonHandler={buttonHandler} />
          <div className='flex justify-center  mt-4 '>
            <div className='flex invisible sm:visible mr-4 h-auto m-auto'>
              <Image src={teeth} height={65} width={65} />
            </div>
            <div className='flex align-middle justify-center'>
              <ul className=' list-disc text-14px w-250px text-login-blue'>La contraseña debe contener:
                <li>Letras mayúsculas y minúsculas</li>
                <li>Números y signos especiales</li>
                <li>Tener un mínimo de 8 caracteres</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}
