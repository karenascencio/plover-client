import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
// My dependencies
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc'
// My custom hooks
import { useAuth } from '../../lib/Hooks'
// My components
import TitleHeader from '../../components/TitleHeader'
import Carrusel from '../../components/Carrusel'
import SearchInput from '../../components/SearchInput'
import AddNewPatientButton from '../../components/AddNewPatientButton'
import ConfirmationModal from '../../components/ConfirmationModal'
// My functions
import { getDentists, getAppointmentsByDentistId, getPatientsByDentistId, deletePatient } from '../../lib/api'
// My images
import addIcon from '../../public/addIcon.svg'
import PatientCard from '../../components/PatientCard'
import NavBarDentist from '../../components/NavBarDentist'

dayjs.extend(utc)

// export async function getStaticPaths () {
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

// export async function getStaticProps (context) {
//   const id = context.params.id
//   const patientsInfo = await api.getPatientsByDentistId(id)
//   const appointmentsInfo = await api.getAppointmentsByDentistId(id)
//   return {
//     props: {
//       patientsInfo,
//       appointmentsInfo,
//       idDentist: id
//     }
//   }
// }

export default function Home () {
  const idDentist = useAuth()
  const router = useRouter()
  const [search, setSearch] = useState('')
  const [deleteModal, setDeleteModal] = useState(false)
  const [idPatientToDelete, setIdPatientToDelete] = useState('')
  const [appointmentsInfo, setAppointmentsInfo] = useState([])
  const [patientsInfo, setPatientsInfo] = useState([])

  useEffect(() => {
    const dentistId = router.query.id
    if (!dentistId) {
      console.log('me rompí alv')
      return
    }
    console.log(dentistId)
    ;(async () => {
      const appointmentData = await getAppointmentsByDentistId(dentistId)
      const patientsData = await getPatientsByDentistId(dentistId)
      setAppointmentsInfo(appointmentData)
      console.log('appointment', appointmentsInfo)
      setPatientsInfo(patientsData)
      console.log('patient', patientsInfo)
    })()
  }, [router.query.id])

  const cardsInfo = []
  appointmentsInfo.sort((a, b) => b.date - a.date)
  appointmentsInfo.forEach(appointment => {
    const trimmedName = appointment.idPatient.name.split(' ', 1).join() + ' ' + appointment.idPatient.lastName.split(' ', 1).join()
    const now = dayjs.utc()
    const appointmentDate = dayjs.utc(appointment.date)
    appointment.procedures.forEach(procedure => appointmentDate >= now && cardsInfo.push({ title: trimmedName, subtitle: procedure.name, thirdTitle: appointmentDate.locale('es').format('dddd D MMMM') }))
  }) // this gives the desired structured to the objects array which carrousel receives

  const searchHandler = event => {
    const searchInput = event.target.value
    setSearch(searchInput)
  }

    setIdPatientToDelete(idPatient)

  const deleteHandler = async () => {

  const closeHandler = () => {
    setDeleteModal(false)
  }
  return (
    <div className='flex flex-col sm:flex-row '>
      {deleteModal &&
        <ConfirmationModal
          deleteHandler={deleteHandler}
          closeHandler={closeHandler}
        />}
      <NavBarDentist isHome />
      <main className='flex justify-center flex-grow sm:w-65vw mx-11'>
        <div className='max-w-screen-lg w-full flex flex-col items-center'>
          <TitleHeader
            pageTitle='Home'
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
              textPlaceholder='Buscar paciente...'
              searchHandler={searchHandler}
              searchValue={search}
            />
            <AddNewPatientButton
              title='Nuevo'
              imagen={addIcon}
              idDentist={idDentist}
            />
          </div>
          <div className='w-full border-t border-lighter-gray'>
            {
        search
          ? patientsInfo.filter(patient => {
              return patient.name.includes(search.toLowerCase()) || patient.lastName.includes(search.toLowerCase())
            }).map(patient =>
              <PatientCard
                patientName={patient.name.split(' ', 1).join() + ' ' + patient.lastName.split(' ', 1).join()}
                patientImage={patient.userImage}
                key={patient._id}
                idPatient={patient._id}
                idDentist={idDentist}
                deleteHandler={preDeleteHandler}
              />
            )
          : patientsInfo.map(patient =>
            <PatientCard
              patientName={patient.name.split(' ', 1).join() + ' ' + patient.lastName.split(' ', 1).join()}
              patientImage={patient.userImage}
              key={patient._id}
              idPatient={patient._id}
              idDentist={idDentist}
              deleteHandler={preDeleteHandler}
            />
          )
        }
          </div>
        </div>
      </main>
    </div>
  )
}