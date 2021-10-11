import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// My Hooks
import { useAuth } from '../../lib/Hooks'
// My dependencies
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc'
// Api
import { getPatientById, getAppointmentsByPatientId } from '../../lib/api'
// My components
import TitleHeader from '../../components/TitleHeader'
import Carrusel from '../../components/Carrusel'
import SearchInput from '../../components/SearchInput'
import AddNewPatientButton from '../../components/AddNewPatientButton'
import ProcedureCard from '../../components/ProcedureCard'
// My images
import addIcon from '../../public/addIcon.svg'
import NavBarDentist from '../../components/NavBarDentist'
dayjs.extend(utc)

// export const getStaticPaths = async () => {
//   const response = await api.getPatients()
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

// export const getStaticProps = async (context) => {
//   const id = context.params.id
//   const patientInfo = await api.getPatientsById(id)
//   const appointmentsInfo = await api.getAppointmentsByPatientId(id)
//   return {
//     props: {
//       patientInfo,
//       appointmentsInfo
//     }
//   }
// }

export default function Patient () {
  const idDentist = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [patientInfo, setPatientInfo] = useState({})
  const [appointmentsInfo, setAppointmentsInfo] = useState([])

  useEffect(() => {
    const idPatient = router.query.id
    console.log('id uno', idPatient)
    if (!idPatient) {
      console.log('me rompí alv')
      return
    }
    console.log('id dos', idPatient)
    ;(async () => {
      const patientData = await getPatientById(idPatient)
      setPatientInfo(patientData)
      console.log(patientInfo)
      const appointmentsData = await getAppointmentsByPatientId(idPatient)
      setAppointmentsInfo(appointmentsData)
      console.log(appointmentsData)
    })()
  }, [router.query.id])

  const { idPatient, userImage, name, lastName } = patientInfo
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
      {/* <NavBarDentist isHome={false} idPatient={idPatient} idDentist={idDentist} />
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
            <AddNewPatientButton
              title='Nuevo'
              imagen={addIcon}
            />
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
      </main> */}
    </div>
  )
}
