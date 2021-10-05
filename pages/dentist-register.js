import React, { useState } from 'react'
import Image from 'next/image'
import { Formik, Field, Form, } from 'formik'
import * as Yup from 'yup'

import api from '../lib/api'
// .: components
import RegisterInput from '../components/dentistRegisterInput'
import RegisterSelectInput from '../components/RegisterSelectInput'
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
        /* .: Validation Schema using Yup */
        validationSchema={Yup.object({
          name: Yup.string()
            .min(2, 'Debe contener al menos 2 caracteres')
            .required('Required'),
          lastName: Yup.string()
            .min(2, 'El campo de apellidos no tiene ningun caracter')
            .required('Required'),
          birthDate: Yup.string()
            .max(40, 'debe contener 40 caracteres o menos')
            .required('Required'),
          gender: Yup.string()
            .required('required'),
          email: Yup.string()
            .email('Introduce un correo valido')
            .required('Correo es necesario para registrar la cuenta')
            .matches(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Ingresa un correo valido'
            ),
          telephoneNumber: Yup.string()
            .required('El número es necesario')
            .matches(
              /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
              'Introduce solo números'
            ),
          clinicName: Yup.string()
            .max(50, 'El nombre del debe tener 50 o menos caracteres')
            .min(2, 'El nombre del consultorio debe tener entre 2 o 50 caracteres')
            .required('Este campo esta vacio'),
          clinicNumber: Yup.string()
            .min(10, 'El número debe contener al menos 10 digitos')
            .required('Este número es donde sus pacientes se contactaran con usted, debe ser llenado')
            .matches(
              /^([0]{1}|\+?[234]{3})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7})$/g,
              'Número invalido'
            ),
          clinicAdress: Yup.string()
            .max(100, 'El nombre del debe tener 100 o menos caracteres')
            .min(5, 'El nombre del consultorio debe tener entre 5 o 100 caracteres')
            .required('Este campo esta vacio'),
          neighborhood: Yup.string()
            .max(40, 'El nombre del debe tener 40 o menos caracteres')
            .min(5, 'El nombre del consultorio debe tener entre 5 o 40 caracteres')
            .required('Este campo esta vacio'),
          zipCode: Yup.number()
            .required('Se debe ingresar el codigo postal de su consultorio'),
          clinicEmail: Yup.string()
            .email()
            .matches(
              /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              'Ingresa un correo valido'
            ),
          degree: Yup.string()
            .min(8, ' se debe ingresar al menos 8 caracteres')
            .max(50, 'El campo debe contener al 50 caracteres o menos')
            .required('La licenciatura debe ser llenada'),
          college: Yup.string()
            .min(8, ' se debe ingresar al menos 8 caracteres')
            .max(50, 'El campo debe contener al 50 caracteres o menos')
            .required('Required'),
          profesionalLicense: Yup.string()
            .min(7, 'La cedula profesional debe tener al menos entre 7 y 10 caracteres')
            .max(10, 'la ceduhttp://localhost:3000/dentist-register?name=change+here&lastName=change+here&birthDate=change+here&gender=change+here&email=change+here&telephoneNumber=change+here&clinicName=change+here&clinicNumber=change+here&clinicAdress=change+here&neighborhood=change+here&zipCode=change+here&clinicEmail=change+here&degree=change+here&college=change+here&profesionalLicense=change+here&password=&verifyPassword=la profesional debe tener al menos entre 7 y 10 caracteres')
            .required('Required'),
          password: Yup.string()
            .required('Porfavor ingresa tu contraseña')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              'La contraseña debe contener al menos 8 caracteres, una letra mayuscula, una minuscula, un número y caracter especial'
            ),
          verifyPassword: Yup.string()
            .required('Porfavor reingresa tu contraseña')
            .matches(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
              'La contraseña debe contener al menos 8 caracteres, una letra mayuscula, una minuscula, un número y caracter especial'
            )
        })}
        onSubmit={(values, { setSubmitting }) =>
          alert(JSON.stringify(values, null, 2))}
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
              />
              {/* Section 2 */}
              <div className='mt-90px mb-50px border-b-2 border-black'>
                <h3 className='text-plover-blue text-center text-2xl'>Datos del consultorio</h3>
              </div>
              <RegisterInput
                label='Nombre del consultorio'
                name='clinicName'
                type='text'
              />
              <RegisterInput
                label='Número telefónico del consultorio'
                name='clinicNumber'
                type='text'
              />
              <RegisterInput
                label='Correo del consultorio'
                name='clinicEmail'
                type='email'
              />
              <RegisterInput
                label='Dirección del consultorio'
                name='clinicAndress'
                type='text'
              />
              <RegisterInput
                label='Colonia'
                name='neihborhood'
                type='text'
              />
              <RegisterInput
                label='Codigo Postal C.P.'
                name='zipCode'
                type='number'
              />
              {/* Section 3 */}
              <div className='mt-90px mb-50px border-b-2 border-black'>
                <h3 className='text-plover-blue text-center text-2xl'>Datos Profesionales</h3>
              </div>
              {/* Inputs Password */}
              <div className='mt-90px mb-50px  border-b-2 border-black mb-50px'>
                <h3 className='text-plover-blue text-center text-2xl'>Registro de cuenta</h3>
              </div>
              <RegisterInput
                label='Correo para registrar la cuenta'
                name='email'
                type='email'
              />
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
              <LoginButtons title='Registrar' buttonHandler={buttonHandler} type='submit' />
            </div>
          </Form>
      </Formik>
    </>
  )
}
