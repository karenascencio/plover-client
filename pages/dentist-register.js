import React, { useState } from 'react'
import Image from 'next/image'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

import api from '../lib/api'
// .: userSchema
import { dentistSchema } from '../lib/DentistSchemaValidation'
// .: components
// import RegisterInput from '../components/dentistRegisterInput'
// import RegisterSelectInput from '../components/RegisterSelectInput'
import LoginButtons from '../components/LoginButtons'
import PasswordInput from '../components/PasswordInput'
// .: Images
import lock from '../public/lock.svg'
import showpsw from '../public/showpsw.svg'
import hidepsw from '../public/hidepsw.svg'

const RegisterInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className=' my-5 flex flex-col flex-auto'>
      <label
        className='text-sm text-plover-blue mb-2.5'
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className='h-30px pl-1 text-base rounded text-darker-gray border-b border-lighter-gray bg-light-blue focus:outline-none focus:bg-lighter-gray focus:text-black'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500 bg-red-200 text-center rounded'>{meta.error}</div>
      ) : null}
    </div>
  )
}

const RegisterSelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className=' my-5 flex flex-col flex-auto'>
      <label
        className='text-sm text-bold text-plover-blue mb-2.5'
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className='h-30px w-280px pl-1 text-plover-blue rounded text-darker-gray border-b border-lighter-gray bg-light-blue focus:outline-none focus:bg-input-hover focus:text-black'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default function DentistRegister () {
  // .: hook for show password
  // .: Handdler

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
          comparePassword: '',
        }}
        /* .: Validation Schema using Yup */
        validationSchema={dentistSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form>
          <div className='flex justify-center'>
            <div classNam='w-280px'>
              {/* Section 1 */}
              <div className='mt-90px mb-50px border-b-2 border-black'>
                <h3 className='text-plover-blue text-center text-2xl'>Datos Personales</h3>
              </div>
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
              <div className='mt-90px mb-50px border-b-2 border-black'>
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
              <div className='mt-90px mb-50px border-b-2 border-black'>
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
              <button type='submit' className=' mr-1 w-280px md:w-408px lg:w-539px h-30px mb-1 bg-plover-blue hover:bg-blue-700 text-white font-normal rounded'>
                Registrarse
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </>
  )
}
