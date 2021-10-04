import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'

import api from '../lib/api'
// .: components
import RegisterInput from '../components/dentistRegisterInput'


export default function DentistRegister () {
  const formik = useFormik({
    initialValues: {

    }
  })
  return (
    <>
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
            textName='phoneNumber'
            textLabel='Telefono o celular'
            textValue='change here'
            inputId='phoneNumber'
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
        </div>
      </form>
    </>
  )
}
