import React, { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc'

// Api
import {
  getPatients,
  getPatientById,
  getAppointmentsByPatientId,
  getDentistById
} from '../../lib/api'
// My components
import TitleHeader from '../../components/TitleHeader'
import Carrusel from '../../components/Carrusel'
import SearchInput from '../../components/SearchInput'
import AddNewPatientButton from '../../components/AddNewPatientButton'
import ProcedureCard from '../../components/ProcedureCard'
// My images
import addIcon from '../../public/addIcon.svg'
import NavBarDentist from '../../components/NavBarDentist'
import useUserInfo from '../../hooks/useUserInfo'
dayjs.extend(utc)

export const getStaticPaths = async () => {
  const response = await getPatients()
  const paths = response.map(patient => {
    return {
      params: {
        id: patient._id.toString()
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
  const patientInfo = await getPatientById(id)
  const appointmentsInfo = await getAppointmentsByPatientId(id)
  const idDentist = patientInfo.idDentist
  const dentistInfo = await getDentistById(idDentist)
  return {
    props: {
      patientInfo,
      appointmentsInfo,
      dentistInfo
    }
  }
}

export default function Patient ({ patientInfo, appointmentsInfo, dentistInfo }) {
  // hook para traernos el id y el rol del usuario
  const [id, rol] = useUserInfo()
  console.log('el id del usuario es ', id)
  console.log('el rol del usuario es ', rol)

  const { _id: idPatient, idDentist, userImage } = patientInfo
  console.log(idPatient, idDentist)
  const { name, lastName, userImage: imagePatient } = patientInfo

  // nos traemos los datos necesarios para pintar el nombre
  // y la imagen del odontologo
  console.log(dentistInfo)
  const { name: dentistName, userImage: imageDentist } = dentistInfo
  console.log(dentistName, imageDentist)

  const [search, setSearch] = useState('')
  const cardsInfo = []
  appointmentsInfo.sort((a, b) => b.date - a.date)
  appointmentsInfo.forEach(appointment => {
    const now = dayjs.utc()
    const appointmentDate = dayjs.utc(appointment.date)
    appointment.procedures.forEach(procedure => {
      appointmentDate >= now && cardsInfo.push({ title: appointmentDate.locale('es').format('dddd D MMMM'), subtitle: procedure.name })
    })
  })

  const searchHandler = event => {
    const searchInput = event.target.value
    setSearch(searchInput)
  }

  return (

    <div className='flex flex-col sm:flex-row '>
      <NavBarDentist
        rol={rol}
        isHome={false}
        idPatient={idPatient}
        idDentist={idDentist}
        image={rol == 'paciente' ? imagePatient:imageDentist}
        name={rol == 'paciente' ? name:dentistName}
      />
      <main className='flex justify-center flex-grow sm:w-65vw mx-11'>
        <div className='w-full max-w-screen-lg flex flex-col items-center'>
          <TitleHeader
            pageTitle='Paciente'
            patientName={name}
            patientLastName={lastName}
            patientImage={userImage}
          />
          <div className='flex justify-start w-full'>
            <p className='text-2xl text-darker-gray font-thin'>
              Próximas citas
            </p>
          </div>
          <Carrusel
            cards={cardsInfo}
          />
          <div className='w-full flex justify-between items-center mb-5'>
            <SearchInput
              textPlaceholder='Buscar procedimiento...'
              searchHandler={searchHandler}
              searchValue={search}
            />
            {rol == 'dentista' && <AddNewPatientButton
              title='Nuevo'
              imagen={addIcon}
                                />}
          </div>
          <div className='w-full border-t border-lighter-gray'>
            {
          search
            ? appointmentsInfo.map(appointment => {
                const procedureDate = dayjs.utc(appointment.date).locale('es').format('dddd D MMMM')
                const appointmentId = appointment._id
                return appointment.procedures.filter(procedure =>
                  procedure.name.includes(search.toLowerCase())).map(procedure =>
                    <ProcedureCard
                      key={procedure._id}
                      procedureDate={procedureDate}
                      procedureName={procedure.name}
                      procedureStatus={procedure.status ? 'Terminado' : 'Pendiente'}
                      anchor={appointmentId}
                    />
                )
              })
            : appointmentsInfo.map(appointment => {
              const procedureDate = dayjs.utc(appointment.date).locale('es').format('dddd D MMMM')
              const appointmentId = appointment._id
              return appointment.procedures.map(procedure =>
                <ProcedureCard
                  key={procedure._id}
                  procedureDate={procedureDate}
                  procedureName={procedure.name}
                  procedureStatus={procedure.status ? 'Terminado' : 'Pendiente'}
                  anchor={appointmentId}
                />
              )
            })
        }
          </div>
        </div>
      </main>
    </div>
  )
}
