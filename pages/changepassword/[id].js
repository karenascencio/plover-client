import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
// My components
import TitleHeader from '../../components/TitleHeader'
import NavBarDentist from '../../components/NavBarDentist'
import ChangePicture from '../../components/ChangePicture'
import FormInput from '../../components/FormInput'
import H3 from '../../components/H3'
import PasswordInput from '../../components/PasswordInput'
// Validation schema
import { loggedPasswordSchema } from '../../lib/DentistSchemaValidation'
// Api
import {getDentists, getDentistById, changePassword} from '../../lib/api'

export const getStaticPaths = async () => {
  const response = await getDentists()
  const paths = response.map(dentist => {
    return {
      params: {
        id: dentist._id.toString()
      }
    }
  })
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const dentistInfo = await getDentistById(id)
  return {
    props: {
      dentistInfo
    }
  }
}

export default function Configuration ({ dentistInfo }) {
  const { id, userImage, name, lastName, password } = dentistInfo
  const [profileImage, setProfileImage] = useState(userImage)
  const [successPop, setSuccessPop] = useState(false)
  const [falsePop, setFalsePop] = useState(false)
  const buttonHandler = async (values) => {
    try {
      console.log('Cuack!!')
      const dataUser = { ...values, id: dentistInfo._id }
      // console.log('dataUser', dataUser)
      const response = await changePassword(dataUser)
      const success = response.success
      if (success) {
        setSuccessPop(true)
        setTimeout(() => {
          setSuccessPop(false)
        }, 5000)
      } else {
        setFalsePop(true)
        setTimeout(() => {
          setFalsePop(false)
        }, 5000)
      }
    } catch (error) { console.log(error.message) }
  }

  return (
    <Formik
    // .: Form Model Formik
      initialValues={{
        password: '',
        newPassword: '',
        comparePassword: ''
      }}
      // Validation Schema using Yup
      validationSchema={loggedPasswordSchema}
      // Submission function
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2))
          setSubmitting(false)
          // Here we send our values to the handler
          buttonHandler(values)
        }, 400)
      }}
    >
      <div className='flex flex-col sm:flex-row '>
        <NavBarDentist isHome />
        <main className='flex justify-center flex-grow sm:w-65vw mx-11'>
          <div className='max-w-screen-lg w-full flex flex-col items-center'>
            <TitleHeader
              pageTitle='Configuración'
            />
            <div className='flex flex-col justify-center items-center w-full py-5 border-b border-lighter-gray'>
              <ChangePicture
                profilePicture={profileImage}
              />
              <h2 className='text-lighter-gray font-thin text-3xl capitalize'>
                {name.split(' ', 1).join() + ' ' + lastName.split(' ', 1).join()}
              </h2>
            </div>
            <Form className='flex flex-col w-full'>
              <div className='flex flex-col w-full'>
                <div className='w-full md:w-2/4'>
                  <H3
                    textTitle='Cambiar contraseña'
                    textColor='plover-blue'
                  />
                  {
                    falsePop
                      ? <div className='flex justify-center text-red-800  bg-red-200 text-center rounded p-1 w-280px md:w-408px lg:w-539px'>
                        <p>La contraseña actual no coincide con la registrada</p>
                        </div>
                      : null
                  }
                  {
                    successPop
                      ? <div className='flex justify-center text-green-800  bg-green-200 text-center rounded p-1 w-280px md:w-408px lg:w-539px'>
                        <p>La contraseña ha sido actualizada</p>
                      </div>
                      : null
                  }
                  <PasswordInput
                    label='Contraseña Actual'
                    name='password'
                    placeholder='Contraseña Actual'
                  />
                  <PasswordInput
                    label='Nueva contraseña'
                    name='newPassword'
                  />
                  <PasswordInput
                    label='Reingresa la nueva contraseña'
                    name='comparePassword'
                  />
                </div>
              </div>
              <div className='flex flex-col items-center w-full'>
                <div className='w-2/4 lg:w-3/12'>
                  <button
                    type='submit'
                    className='w-full my-5 py-1.5 text-white rounded bg-plover-blue hover:bg-login-blue'
                  >
                    Guardar nueva contraseña
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </main>
      </div>
    </Formik>
  )
}
