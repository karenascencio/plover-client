import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

import api from '../lib/api'
// .: userSchema
import { dentistSchema } from '../lib/DentistSchemaValidation'
// .: components
import RegisterInput from '../components/dentistRegisterInput'
import RegisterSelectInput from '../components/RegisterSelectInput'
import PasswordInput from '../components/PasswordInput'
import ChangePicture from '../components/ChangePicture'

// .: Images
import close from '../public/close.svg'

export default function DentistRegister () {
  const router = useRouter()
  // .: hooks

  // .: Handdler
  const registerHandler = async (values) => {
    try {
      console.log(values)
      if (values) {
        const response = await api.signIn(values)
        const success = response.success
        if (success) {
          alert('Se ha mandado un correo para verificar tu cuenta')
          router.push('/login')
        } else {
          alert('El correo ya está registrado, porfavor utiliza otro por favor')
        }
      } else throw new Error()
    } catch (error) { console.log((error.message)) }
  }
  return (
    <>
      <Formik
        /* .: form model formik */
        initialValues={{
          name: '',
          lastName: '',
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
          comparePassword: ''
        }}
        /* .: Validation Schema using Yup */
        validationSchema={dentistSchema}
        onSubmit={(values, { c }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
            registerHandler(values)
          }, 400)
        }}
      >
        <Form>
          <div className='flex justify-center mb-50px'>
            <div className='w-280px md:w-408px lg:w-539px'>
              {/* Section 1 */}
              <div className='mt-90px mb-50px border-b-2 border-plover-blue'>
                <h3 className='text-plover-blue text-center text-2xl'>Datos Personales</h3>
              </div>
              {/* <ChangePicture /> */}
              <RegisterInput
                label='Nombre'
                name='name'
                type='text'
                placeholder='Pluvianus'
              />
              <RegisterInput
                label='Apellidos'
                name='lastName'
                type='text'
                placeholder='Aegyptius'
              />
              <RegisterSelectInput label='Genero' name='gender'>
                <option value=''>Selecciona un genero</option>
                <option value='femenino'>Femenino</option>
                <option value='masculino'>Masculino</option>
                <option value='otro'>Otro</option>
              </RegisterSelectInput>
              <RegisterInput
                label='Número de telefono / Celular'
                name='telephoneNumber'
                type='number'
                placeholder='(123)-123-1234'
              />
              <div className='mt-90px mb-50px border-b-2 border-plover-blue'>
                <h3 className='text-plover-blue text-center text-2xl'>Datos del consultorio</h3>
              </div>
              <RegisterInput
                label='Nombe del consultorio'
                name='clinicName'
                type='text'
                placeholder='Consultorio Plover'
              />
              <RegisterInput
                label='Número del consultorio'
                name='clinicNumber'
                type='text'
                placeholder='(123)-123-1234'
              />
              <RegisterInput
                label='Correo del consultorio'
                name='clinicEmail'
                type='email'
                placeholder='ploverConsultorios@plover.com'
              />
              <RegisterInput
                label='Dirección del consultorio'
                name='clinicAdress'
                type='text'
                placeholder='Escribe la dirección'
              />
              <RegisterInput
                label='Colonia'
                name='neighborhood'
                type='text'
                placeholder='Escribe la colonia'
              />
              <RegisterInput
                label='Código Postal C.P.'
                name='zipCode'
                type='text'
                placeholder='8080'
              />
              <div className='mt-90px mb-50px border-b-2 border-plover-blue'>
                <h3 className='text-plover-blue text-center text-2xl'>Datos del Profesionales</h3>
              </div>
              <RegisterInput
                label='Licenciatura'
                name='degree'
                type='text'
                placeholder='Cirujano Dentista'
              />
              <RegisterInput
                label='Universidad de egreso'
                name='college'
                type='text'
                placeholder=''
              />
              <RegisterInput
                label='Cedula Profesional'
                name='profesionalLicense'
                type='text'
                placeholder=''
              />
              <div className='mt-90px mb-50px border-b-2 border-black'>
                <h3 className='text-plover-blue text-center text-2xl'>Datos de la cuenta</h3>
              </div>
              <RegisterInput
                label='Correo para registrar tu cuenta'
                name='email'
                type='email'
                placeholder='plover@plover.com'
              />
              <PasswordInput
                label='Contraseña'
                name='password'
                placeholder='Contraseña'
              />
              <PasswordInput
                label='Contraseña'
                name='comparePassword'
                placeholder='Reingresa tú contraseña'
              />
              <div className='mt-50px'>
                <button type='submit' className=' mr-1 w-280px md:w-408px lg:w-539px h-30px mb-1 bg-plover-blue hover:bg-blue-700 text-white font-normal rounded'>
                  Registrarse
                </button>
              </div>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
