import React, { useState } from 'react'
import { useRouter } from 'next/router'
// My Hooks
import useAvailableToken from '../../hooks/useAvailableToken'
import useUserInfo from '../../hooks/useUserInfo'
// My dependencies
import swal from 'sweetalert'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc'
// My components
import TitleHeader from '../../components/TitleHeader'
import Carrusel from '../../components/Carrusel'
import SearchInput from '../../components/SearchInput'
import AddNewPatientButton from '../../components/AddNewPatientButton'
import NothingToSee from '../../components/NothingToSee'
// Api
import {
  getDentists,
  getPatientsByDentistId,
  getAppointmentsByDentistId,
  deletePatient,
  getDentistById
} from '../../lib/api'
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

export async function getServerSideProps (context) {
  const id = context.params.id
  const patientsInfo = await getPatientsByDentistId(id)
  const appointmentsInfo = await getAppointmentsByDentistId(id)
  const dentistInfo = await getDentistById(id)
  return {
    props: {
      patientsInfo,
      appointmentsInfo,
      idDentist: id,
      dentistInfo
    }
  }
}

export default function Home ({ patientsInfo, appointmentsInfo, dentistInfo }) {
  
  
  useAvailableToken()
  // hook para traer el rol del usuario
  const [id, rol] = useUserInfo()
  const { userImage, name } = dentistInfo
  const router = useRouter()
  // nos traemos los datos necesarios para pintar el nombre
  // y la imagen del odontologo
  const { name: dentistName, userImage: imageDentist, _id: idDentist } = dentistInfo
  console.log(dentistName, imageDentist)
  // necesito el id del dentista y del paciente para la navegacio
  const { _id: idPatient } = patientsInfo

  const [search, setSearch] = useState('')
  const cardsInfo = []
  appointmentsInfo.sort((a, b) => b.date - a.date)
  appointmentsInfo.forEach(appointment => {
    // const appontmentId = appointment._id
    if (!appointment.idPatient) return
    const trimmedName = appointment.idPatient.name.split(' ', 1).join() + ' ' + appointment.idPatient.lastName.split(' ', 1).join()
    const now = dayjs.utc()
    const appointmentDate = dayjs.utc(appointment.date)
    appointment.procedures.forEach(procedure => appointmentDate >= now && cardsInfo.push({ title: trimmedName, subtitle: procedure.name, thirdTitle: appointmentDate.locale('es').format('dddd D MMMM') }))
  }) // this gives the desired structured to the objects array which carrousel receives

  const searchHandler = event => {
    const searchInput = event.target.value
    setSearch(searchInput)
  }

  const deleteHandler = async event => {
    const patientToDelete = event.target.id
    swal({
      title: 'Eliminar paciente',
      text: '¿Estás seguro que deseas eliminar el paciente? Esta acción es irreversible.',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
      .then(async (willDelete) => {
        if (willDelete) {
          await deletePatient(patientToDelete)
          swal('¡El paciente ha sido eliminado exitosamente!', {
            icon: 'success',
            button: {
              className: 'bg-plover-blue hover:bg-input-hover'
            }
          })
          router.push(`/dentists/${idDentist}`)
        }
      })
  }

  return (
    <div className='flex flex-col sm:flex-row '>
      <NavBarDentist
        isHome
        idDentist={idDentist}
        idPatient={idPatient}
        image={userImage}
        name={name}
        rol={rol}
      />
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
            cards={cardsInfo.sort((a, b) => b.thirdTitle - a.thirdTitle)}
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
              patientsInfo.length > 0
                ? (
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
                            deleteHandler={deleteHandler}
                          />
                        )
                      : patientsInfo.map(patient =>
                        <PatientCard
                          patientName={patient.name.split(' ', 1).join() + ' ' + patient.lastName.split(' ', 1).join()}
                          patientImage={patient.userImage}
                          key={patient._id}
                          idPatient={patient._id}
                          idDentist={idDentist}
                          deleteHandler={deleteHandler}
                        />
                      )
                  )
                : <div className='w-full flex items-center'>
                  <NothingToSee />
                </div>
            }
          </div>
        </div>
      </main>
    </div>
  )
}
