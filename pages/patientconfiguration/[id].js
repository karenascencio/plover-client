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
import SuccessAlert from '../../components/SuccessAlert'
import TextWithLabel from '../../components/TextWithLabel'
import H3 from '../../components/H3'
import useUserInfo from '../../hooks/useUserInfo'
// Api
import { getPatients, getPatientById, patchPatient } from '../../lib/api'
// My hooks
import useAvailableToken from '../../hooks/useAvailableToken'

// export const getStaticPaths = async () => {
//   const response = await getPatients()
//   const paths = response.map(patient => {
//     return {
//       params: {
//         id: patient._id.toString()
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
  const patientInfo = await getPatientById(id)
  return {
    props: {
      patientInfo
    }
  }
}

export default function Configuration ({ patientInfo }) {
  useAvailableToken()
  const [id,rol] = useUserInfo()
  const { _id, userImage, name, lastName, email } = patientInfo
  const [profileImage, setProfileImage] = useState(userImage)
  const [patientUpdate, setPatientUpdate] = useState(null)
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
  const buttonHandler = async () => {
    const response = await patchPatient(patientUpdate, _id)
    notify()
    router.reload()
  }

  const handleFileChange = async file => {
    const { url } = await uploadToS3(file)
    setProfileImage(url)
    setPatientUpdate({ ...patientUpdate, userImage: url })
  }

  return (
    <div className='sm:relative flex flex-col sm:flex-row '>
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
      <NavBarDentist isHome
        rol={rol} 
        idDentist={_id} 
        idPatient={_id}
        name={name} 
        image={userImage} />
      <main className='sm:absolute right-0 flex justify-center flex-grow sm:w-60vw mx-11'>
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
                textLabel='Correo electrónico'
                textValue={email}
              />
            </div>
          </div>
          <div className='flex flex-col items-center w-full'>
            <div className='w-2/4 lg:w-3/12'>
              {
                patientUpdate
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
              <div className='text-center flex justify-center w-full mb-5 py-0.5 text-plover-blue rounded border-2 border-plover-blue hover:border-login-blue hover:text-login-blue'>
                <Link href={`/changepatientpassword/${_id}`}>
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