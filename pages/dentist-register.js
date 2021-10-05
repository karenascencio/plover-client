import React, { useState } from 'react'
import Image from 'next/image'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

import api from '../lib/api'
// .: userSchema
import { dentistSchema } from '../Validations/DentistRegisterValidation'
// .: components
import RegisterInput from '../components/dentistRegisterInput'
import RegisterSelectInput from '../components/RegisterSelectInput'
import LoginButtons from '../components/LoginButtons'
import PasswordInput from '../components/PasswordInput'
// .: Images
import lock from '../public/lock.svg'
import showpsw from '../public/showpsw.svg'
import hidepsw from '../public/hidepsw.svg'

export default function DentistRegister () {
  // .: hook for show password
  // .: Handdler
  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2))
      setSubmitting(false)
    }, 400)
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
        /* .: Validation Schema using Yup */
        validationSchema={dentistSchema}
        onSubmit={handleSubmit}
      >
        <Form className='flex justify-center'>
          <div className='w-280px'>
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
            <RegisterInput
              className='w-280px'
              label='Fecha de nacimiento'
              name='birthDate'
              type='date'
            />
            <RegisterSelectInput label='Genero' name='gender'>
              <option value=''>Selecciona un genero</option>
              <option value='femenino'>Femenino</option>
              <option value='masculino'>Masculino</option>
              <option value='otro'>Otro</option>
            </RegisterSelectInput>
            <RegisterInput
              label='Número de celular'
              name='telephoneNumber'
              type='text'
              placeholder='(123)-123-1234'
            />
            {/* Section 2 */}
            <div className='mt-90px mb-50px border-b-2 border-black'>
              <h3 className='text-plover-blue text-center text-2xl'>Datos del consultorio</h3>
            </div>
            <RegisterInput
              label='Nombre del consultorio'
              name='clinicName'
              type='text'
              placeholder='Consultorios Plover'
            />
            <RegisterInput
              label='Número telefónico del consultorio'
              name='clinicNumber'
              type='text'
              placeholder='(123)-123-1234'
            />
            <RegisterInput
              label='Correo del consultorio'
              name='clinicEmail'
              type='email'
              placeholder='consultoriosPlover@plover.com'
            />
            <RegisterInput
              label='Dirección del consultorio'
              name='clinicAndress'
              type='text'
              placeholder='Jupiter #5'
            />
            <RegisterInput
              label='Colonia'
              name='neihborhood'
              type='text'
              placeholder='Vialactea'
            />
            <RegisterInput
              label='Codigo Postal C.P.'
              name='zipCode'
              type='number'
              placeholder='8080'
            />
            {/* Section 3 */}
            <div className='mt-90px mb-50px border-b-2 border-black'>
              <h3 className='text-plover-blue text-center text-2xl'>Datos Profesionales</h3>
            </div>
            <RegisterInput
              label='Licenciatura'
              name='degree'
              type='string'
              placeholder='Cirujano Dentista'
            />
            <RegisterInput
              label='Universidad de egreso'
              name='college'
              type='string'
              placeholder='Universidad Rio Nilo'
            />
            <RegisterInput
              label='Cedula profesional'
              name='profesionalLicense'
              type='string'
              placeholder=''
            />
            {/* Inputs Password */}
            <div className='mt-90px mb-50px  border-b-2 border-black mb-50px'>
              <h3 className='text-plover-blue text-center text-2xl'>Registro de cuenta</h3>
            </div>
            <RegisterInput
              label='Correo para registrar la cuenta'
              name='email'
              type='email'
              placeholder='plover@dev.com'
            />
            <PasswordInput
              label='Contraseña'
              name='password'
              placeholder='Contraseña'
              image={lock}
            />
            <PasswordInput
              label='Reingresa la contraseña'
              name='verifyPassword'
              placeholder='Reingresa la contraseña'
              image={lock}
            />
            <button type='submit' className=' mr-1 w-280px md:w-408px lg:w-539px h-30px mb-1 bg-plover-blue hover:bg-blue-700 text-white font-normal rounded'>
              Registrarse
              </button>
          </div>
        </Form>
      </Formik>
    </>
  )
}
