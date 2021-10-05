import React, { useState } from 'react'
import Image from 'next/image'
import { Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import api from '../lib/api'
// .: components
import RegisterInput from '../components/dentistRegisterInput'
import PasswordInput from '../components/PasswordInput'
import LoginButtons from '../components/LoginButtons'
// .: Images
import lock from '../public/lock.svg'
import showpsw from '../public/showpsw.svg'
import hidepsw from '../public/hidepsw.svg'

export default function DentistRegister () {
  // .: hook for show password
  const [showPassword, setshowPassword] = useState(false)
  // .: Handdler
  const buttonHandler = async () => {
    console.log('Cuack')
  }

  return (
    <>
      <Formik
        /* .: form model formik */
        initialValues={{
          name: '',
          lastName: '',
          birthDate: '',
          gender: '',
          email: '',
          telephoneNumber: '',
          clinicName: '',
          clinicNumber: '',
          clinicAdress: '',
          neighborhood: '',
          zipCode: '',
          clinicEmail: '',
          degree: '',
          college: '',
          profesionalLicense: '',
          password: '',
          verifyPassword: ''
        }}
        validationSchema={Yup.object({
          
        })}
      >
        {formik => (
          <form className='flex justify-center'>
            <div className='w-280px'>
              <div className='mt-90px mb-50px border-b-2 border-black'>
                <h3 className='text-plover-blue text-2xl'>Datos Personales</h3>
              </div>
              <RegisterInput
                textName='name'
                textLabel='Nombre'
                textValue='change here'
                inputId='name'
                inputType='text'
              />
              <RegisterInput
                textName='lastName'
                textLabel='Apellidos'
                textValue='change here'
                inputId='lastName'
                inputType='text'
              />
              <RegisterInput
                textName='birthDate'
                textLabel='Fecha de nacimiento'
                textValue='change here'
                inputId='birthDate'
                inputType='date'
              />
              <RegisterInput
                textName='gender'
                textLabel='Genero'
                textValue='change here'
                inputId='gender'
                inputType='select'
              />
              <RegisterInput
                textName='email'
                textLabel='correo'
                textValue='change here'
                inputId='email'
                inputType='email'
              />
              <RegisterInput
                textName='telephoneNumber'
                textLabel='Telefono o celular'
                textValue='change here'
                inputId='telephoneNumber'
                inputType='text'
              />
              <div className=' my-50px border-b-2 border-black'>
                <h3 className='text-plover-blue text-2xl'>Datos del consultorio</h3>
              </div>
              <RegisterInput
                textName='clinicName'
                textLabel='Nombre del consultorio o clínica'
                textValue='change here'
                inputId='clinicName'
                inputType='text'
              />
              <RegisterInput
                textName='clinicNumber'
                textLabel='Número de telefono del consultorio'
                textValue='change here'
                inputId='clinicNumber'
                inputType='number'
              />
              <RegisterInput
                textName='clinicAdress'
                textLabel='Dirección del consultorio'
                textValue='change here'
                inputId='clinicAdress'
                inputType='text'
              />
              <RegisterInput
                textName='neighborhood'
                textLabel='Colonia'
                textValue='change here'
                inputId='neighborhood'
                inputType='text'
              />
              <RegisterInput
                textName='zipCode'
                textLabel='Código Postal C.P.'
                textValue='change here'
                inputId='zipCode'
                inputType='number'
              />
              <RegisterInput
                textName='clinicEmail'
                textLabel='Correo del consultorio'
                textValue='change here'
                inputId='clinicEmail'
                inputType='text'
              />
              <div className='border-b-2 border-black'>
                <h3 className='text-plover-blue text-2xl mt-50px'>Datos Profesionales</h3>
              </div>
              <RegisterInput
                textName='degree'
                textLabel='Licenciatura'
                textValue='change here'
                inputId='degree'
                inputType='text'
              />
              <RegisterInput
                textName='college'
                textLabel='Universidad de egreso'
                textValue='change here'
                inputId='college'
                inputType='text'
              />
              <RegisterInput
                textName='profesionalLicense'
                textLabel='Cedula profesional'
                textValue='change here'
                inputId='clinicEmail'
                inputType='text'
              />
              <div className='border-b-2 border-black'>
                <h3 className='text-plover-blue text-2xl mt-50px'>Contraseña</h3>
              </div>
              <div className=' mb-10px  mt-70px w-280px '>
                <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-280px md:w-408px lg:w-539px'>
                  <Image src={lock} heigth={40} width={40} />
                  <input
                    className='w-full py-1 pl-1 border-0 focus:outline-none'
                    name='password'
                    inputId='password'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Contraseña'
                  />
                  <button onClick={() => setshowPassword(!showPassword)}><Image src={showPassword ? showpsw : hidepsw} heigth={45} width={45} /></button>
                </div>
              </div>

              <div className=' mb-50px  w-280px'>
                <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-280px md:w-408px lg:w-539px'>
                  <Image src={lock} heigth={40} width={40} />
                  <input
                    className='w-full py-1 pl-1 border-0 focus:outline-none'
                    name='verifyPassword'
                    inputId='verifyPassword'
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Reingresa la contraseña'
                  />
                  <button onClick={() => setshowPassword(!showPassword)}><Image src={showPassword ? showpsw : hidepsw} heigth={45} width={45} /></button>
                </div>
              </div>
              <LoginButtons title='Registrar' buttonHandler={buttonHandler} />
            </div>
          </form>
        )}
      </Formik>
    </>
  )
}
