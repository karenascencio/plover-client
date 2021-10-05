import React from 'react'
import S3FileUpload from 'react-s3'
// My components
import TitleHeader from '../../components/TitleHeader'
import NavBarDentist from '../../components/NavBarDentist'
import ChangePicture from '../../components/ChangePicture'
import TextWithLabel from '../../components/TextWithLabel'
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
  const { userImage, name, lastName, gender, email, telephoneNumber, clinicName, clinicNumber, clinicEmail, clinicAdress, neighborhood, zipCode, degree, college, profesionalLicense } = dentistInfo
  return (
    <div className='flex flex-col sm:flex-row '>
      <NavBarDentist isHome={true} />
      <main className='flex w-full justify-center flex-grow sm:w-65vw mx-11'>
        <div className='max-w-screen-lg w-full flex flex-col items-center'>
          <TitleHeader
            pageTitle='Configuración'
          />
          <div className='flex flex-col justify-center items-center w-full py-5 border-b border-lighter-gray'>
            <ChangePicture
              profilePicture={userImage}
            />
            <h2 className='text-lighter-gray font-thin text-3xl capitalize'>
              {name.split(' ', 1).join() + ' ' + lastName.split(' ', 1).join()}
            </h2>
          </div>
          <div className='flex flex-col w-full border-b border-lighter-gray'>
            <div className='w-2/4'>
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
              />
              <FormInput
                textLabel='Correo Electrónico'
                textPlaceholder={email}
                textName='email'
              />
            </div>
          </div>
          <div className='flex flex-col w-full border-b border-lighter-gray'>
            <div className='w-2/4'>
              <H3
                textTitle='Datos del consultorio'
                textColor='plover-blue'
              />
              <FormInput
                textLabel='Nombre del consultorio'
                textPlaceholder={clinicName}
                textName='clinicName'
              />
              <FormInput
                textLabel='Teléfono del consultorio'
                textPlaceholder={clinicNumber}
                textName='clinicNumber'
              />
              <FormInput
                textLabel='Correo electrónico del consultorio'
                textPlaceholder={clinicEmail}
                textName='clinicEmail'
              />
              <FormInput
                textLabel='Dirección del consultorio'
                textPlaceholder={clinicAdress}
                textName='clinicAdress'
              />
              <FormInput
                textLabel='Colonia'
                textPlaceholder={neighborhood}
                textName='neighborhood'
              />
              <FormInput
                textLabel='Código postal'
                textPlaceholder={zipCode}
                textName='zipCode'
              />
            </div>
          </div>
          <div className='flex flex-col w-full border-b border-lighter-gray'>
            <div className='w-2/4'>
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
        </div>
      </main>
    </div>
  )
}
