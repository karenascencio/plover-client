import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useS3Upload } from 'next-s3-upload'
import { Formik, Form} from 'formik'
import * as Yup from 'yup'
import useAvailableToken from '../hooks/useAvailableToken'
import { signUp } from '../lib/api'
import swal from 'sweetalert'
// .: userSchema
import { dentistSchema } from '../lib/DentistSchemaValidation'
// .: components
import RegisterInput from '../components/dentistRegisterInput'
import RegisterSelectInput from '../components/RegisterSelectInput'
import PasswordInput from '../components/PasswordInput'
import RegisterPicture from '../components/RegisterPicture'

// .: Images
import close from '../public/close.svg'
const defaultPicture = 'https://plover-bucket.s3.us-east-2.amazonaws.com/next-s3-uploads/13c4f937-4c34-4f51-b0c4-bc633854b13f/12artboard_1.png'

export default function DentistRegister () {
  const router = useRouter()
  // .: hooks
  const [profileImage, setProfileImage] = useState(defaultPicture)
  const [falsePop, setFalsePop] = useState(false)
  const { uploadToS3 } = useS3Upload()
  console.log('cuack', profileImage)
  // .: Handdler
  const registerHandler = async (values, file) => {
    try {
      console.log(values)
      if (values) {
        const response = await signUp(values)
        const success = response.success
        if (success) {
          swal("¡Enhorabuena!", "Se está validando tu información, pronto recibirás un correo", "success").then((isOk) => {
            router.push('/login')
          })
        } else {
          setFalsePop(true)
        }
      } else throw new Error()
    } catch (error) { console.log((error.message)) }
  }

  const handleFileChange = async file => {
    const { url } = await uploadToS3(file)
    setProfileImage(url)
    console.log('handler', profileImage)
  }
 
  // .: UseEffect
  useEffect(() => {
    
  }, [profileImage])
 
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
          userImage: ''
        }}
        /* .: Validation Schema using Yup */
        validationSchema={dentistSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            //alert(JSON.stringify(values, null, 2))     
            setSubmitting(false)
            const userData = {...values, userImage: profileImage}
            registerHandler(userData)
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
              <div className='flex justify-center'>
                <RegisterPicture 
                  profileImage={profileImage}
                  uploadHandler={handleFileChange}
                />
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
              {
                falsePop ?
                <div className='flex justify-center text-red-800  bg-red-200 text-center rounded p-1 w-280px md:w-408px lg:w-539px'>
                  <p>El correo que intentas usar ya esta registrado intenta con uno nuevo o recupera tu cuenta</p>
                </div>
                : null
              }
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