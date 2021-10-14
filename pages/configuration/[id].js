import React, { useState } from 'react'
import { useS3Upload } from 'next-s3-upload'
import { useRouter } from 'next/router'
import Link from 'next/link'
// My dependencies
import { ToastContainer, toast, Zoom } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
// My components
import TitleHeader from '../../components/TitleHeader'
import NavBarDentist from '../../components/NavBarDentist'
import ChangePicture from '../../components/ChangePicture'
import TextWithLabel from '../../components/TextWithLabel'
import FormInput from '../../components/FormInput'
import H3 from '../../components/H3'
// Api
import { getDentists, getDentistById, patchDentist } from '../../lib/api'
// My hooks
import useAvailableToken from '../../hooks/useAvailableToken'

// export const getStaticPaths = async () => {
//   const response = await getDentists()
//   const paths = response.map(dentist => {
//     return {
//       params: {
//         id: dentist._id.toString()
//       }
//     }
//   })
//   return {
//     paths,
//     fallback: false
//   }
// }

export const getServerSideProps = async (context) => {
  const id = context.params.id
  const dentistInfo = await getDentistById(id)
  return {
    props: {
      dentistInfo
    }
  }
}

export default function Configuration ({ dentistInfo }) {
  useAvailableToken()
  const { _id, userImage, name, lastName, gender, email, telephoneNumber, clinicName, clinicNumber, clinicEmail, clinicAdress, neighborhood, zipCode, degree, college, profesionalLicense } = dentistInfo
  const [profileImage, setProfileImage] = useState(userImage)
  const [dentistUpdate, setDentistUpdate] = useState(null)
  const { uploadToS3 } = useS3Upload()
  const router = useRouter()

  const notify = () => toast.success('Perfil actualizado correctamente', {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon: false
  })

  const inputHandler = event => {
    const { name, value } = event.target
    value && setDentistUpdate({ ...dentistUpdate, [name]: value })
  }

  const buttonHandler = async () => {
    const response = await patchDentist(dentistUpdate, _id)
    notify()
    router.reload()
  }

  const handleFileChange = async file => {
    const { url } = await uploadToS3(file)
    setProfileImage(url)
    setDentistUpdate({ ...dentistUpdate, userImage: url })
  }

  return (
    <div className='flex flex-col sm:flex-row '>
      <ToastContainer
        toastStyle={{ backgroundColor: '#EDF5FC' }}
        position='top-right'
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Zoom}
      />
      <NavBarDentist isHome idDentist={_id} name={name} image={userImage} />
      <main className='flex justify-center flex-grow sm:w-65vw mx-11'>
        <div className='max-w-screen-lg w-full flex flex-col items-center'>
          <TitleHeader
            pageTitle='Configuración'
          />
          <div className='flex flex-col justify-center items-center w-full py-5 border-b border-lighter-gray'>
            <ChangePicture
              profilePicture={profileImage}
              uploadHandler={handleFileChange}
            />
            <h2 className='text-lighter-gray font-thin text-3xl capitalize'>
              {name.split(' ', 1).join() + ' ' + lastName.split(' ', 1).join()}
            </h2>
          </div>
          <div className='flex flex-col w-full border-b border-lighter-gray'>
            <div className='w-full md:w-2/4'>
              <H3
                textTitle='Información personal'
                textColor='plover-blue'
              />
              <TextWithLabel
                textLabel='Nombre'
                textValue={name}
              />
              <TextWithLabel
                textLabel='Apellidos'
                textValue={lastName}
              />
              <TextWithLabel
                textLabel='Sexo'
                textValue={gender}
              />
              <FormInput
                textLabel='Número de teléfono'
                textPlaceholder={telephoneNumber}
                textName='telephoneNumber'
                handleChange={inputHandler}
              />
              <FormInput
                textLabel='Correo Electrónico'
                textPlaceholder={email}
                textName='email'
                handleChange={inputHandler}
              />
            </div>
          </div>
          <div className='flex flex-col w-full border-b border-lighter-gray'>
            <div className='w-full md:w-2/4'>
              <H3
                textTitle='Datos del consultorio'
                textColor='plover-blue'
              />
              <FormInput
                textLabel='Nombre del consultorio'
                textPlaceholder={clinicName}
                textName='clinicName'
                handleChange={inputHandler}
              />
              <FormInput
                textLabel='Teléfono del consultorio'
                textPlaceholder={clinicNumber}
                textName='clinicNumber'
                handleChange={inputHandler}
              />
              <FormInput
                textLabel='Correo electrónico del consultorio'
                textPlaceholder={clinicEmail}
                textName='clinicEmail'
                handleChange={inputHandler}
              />
              <FormInput
                textLabel='Dirección del consultorio'
                textPlaceholder={clinicAdress}
                textName='clinicAdress'
                handleChange={inputHandler}
              />
              <FormInput
                textLabel='Colonia'
                textPlaceholder={neighborhood}
                textName='neighborhood'
                handleChange={inputHandler}
              />
              <FormInput
                textLabel='Código postal'
                textPlaceholder={zipCode}
                textName='zipCode'
                handleChange={inputHandler}
              />
            </div>
          </div>
          <div className='flex flex-col w-full border-b border-lighter-gray'>
            <div className='w-full md:w-2/4'>
              <H3
                textTitle='Datos profesionales'
                textColor='plover-blue'
              />
              <TextWithLabel
                textLabel='Grado académico'
                textValue={degree}
              />
              <TextWithLabel
                textLabel='Institución de egreso'
                textValue={college}
              />
              <TextWithLabel
                textLabel='Cédula profesional'
                textValue={profesionalLicense}
              />
            </div>
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='w-2/4 lg:w-3/12'>
              {
                dentistUpdate
                  ? <button
                      className='w-full my-5 py-1.5 text-white rounded bg-plover-blue hover:bg-login-blue'
                      onClick={buttonHandler}
                    >
                    Guardar cambios
                  </button>
                  : <button
                      className='w-full my-5 py-1.5 text-darker-gray rounded bg-lighter-gray cursor-not-allowed'
                      disabled
                    >
                    Guardar cambios
                  </button>
              }
              <div className='flex justify-center w-full mb-5 py-0.5 text-plover-blue rounded border-2 border-plover-blue hover:border-login-blue hover:text-login-blue'>
                <Link href={`/changepassword/${_id}`}>
                  <a>Cambiar de contraseña</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
