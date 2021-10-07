import React, { useState } from 'react'
// My components
import TitleHeader from '../../components/TitleHeader'
import NavBarDentist from '../../components/NavBarDentist'
import ChangePicture from '../../components/ChangePicture'
import FormInput from '../../components/FormInput'
import H3 from '../../components/H3'
// Api
import api from '../../lib/api'

export const getStaticPaths = async () => {
  const response = await api.getDentists()
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
  const dentistInfo = await api.getDentistById(id)
  return {
    props: {
      dentistInfo
    }
  }
}

export default function Configuration ({ dentistInfo }) {
  const { _id, userImage, name, lastName, password } = dentistInfo
  const [profileImage, setProfileImage] = useState(userImage)
  const [dentistUpdate, setDentistUpdate] = useState({})

  const inputHandler = event => {
    const { name, value } = event.target
    value && setDentistUpdate({ ...dentistUpdate, [name]: value })
  }

  const buttonHandler = async () => {
    console.log('clic activado')
    const response = await api.patchDentist(dentistUpdate, _id)
    console.log(response)
  }

  return (
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
              // uploadHandler={handleFileChange}
            />
            <h2 className='text-lighter-gray font-thin text-3xl capitalize'>
              {name.split(' ', 1).join() + ' ' + lastName.split(' ', 1).join()}
            </h2>
          </div>
          <div className='flex flex-col w-full'>
            <div className='w-full md:w-2/4'>
              <H3
                textTitle='Cambiar contraseña'
                textColor='plover-blue'
              />
              <FormInput
                textLabel='Contraseña actual'
                textName='currentPassword'// change if necessary
                handleChange={inputHandler}
              />
              <FormInput
                textLabel='Nueva contraseña'
                textName='newPassword' // change if necessary
                handleChange={inputHandler}
              />
              <FormInput
                textLabel='Confirmación de contraseña'
                textName='newPasswordConfirmation' // change if necessary
                handleChange={inputHandler}
              />
            </div>
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='w-2/4 lg:w-3/12'>
              <button
                className='w-full my-5 py-1.5 text-white rounded bg-plover-blue hover:bg-login-blue'
                onClick={buttonHandler}
              >
                Guardar nueva contraseña
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}