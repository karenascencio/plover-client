import React, { useState } from 'react'
// Api
import api from '../../lib/api'
// My components
import TitleHeader from '../../components/TitleHeader'
import Carrusel from '../../components/Carrusel'
import SearchInput from '../../components/SearchInput'
import AddNewPatientButton from '../../components/AddNewPatientButton'
import ProcedureCard from '../../components/ProcedureCard'
// My images
import addIcon from '../../public/addIcon.svg'

const cardsInfo = [
  { name: 'Alfredo Castuera', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Anotonio ibarra', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Hector Hernandez', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Karen Ascencio', procedure: 'Resinas x4', date: '01 septiembre' }
]

export const getStaticPaths = async () => {
  const response = await api.getPatients()
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
  const patientInfo = await api.getPatientsById(id)
  const appointmentsInfo = await api.getAppointmentByPatientId(id)
  return {
    props: {
      patientInfo,
      appointmentsInfo
    }
  }
}

export default function Patient ({ patientInfo, appointmentsInfo }) {
  console.log(appointmentsInfo)
  const { name, lastName } = patientInfo
  const [search, setSearch] = useState('')
  const searchHandler = event => {
    const searchInput = event.target.value
    setSearch(searchInput)
  }

  return (
    <div className='max-w-screen-lg flex flex-col items-center'>
      <TitleHeader
        pageTitle='Paciente'
        secondaryText='Próximas citas'
      />
      <Carrusel
        cards={cardsInfo}
      />
      <div className='w-full flex justify-between items-center mb-5'>
        <SearchInput
          textPlaceholder='Buscar procedimiento, cita o estado...'
          searchHandler={searchHandler}
          searchValue={search}
        />
        <AddNewPatientButton
          title='Nuevo'
          imagen={addIcon}
        />
      </div>
      {
        appointmentsInfo.map(appointments => {
          const procedureDate = new Date(appointments.date)
          const appointmentId = appointments._id
          console.log(appointmentId)
          return appointments.procedures.map(procedure =>
            <ProcedureCard
              key={procedure._id}
              procedureDate={procedureDate.toGMTString().split(' ').slice(1, 4).join(' ')}
              procedureName={procedure.name}
              procedureStatus={procedure.status ? 'Terminado' : 'Pendiente'}
              anchor={appointmentId}
            />
          )
        })
      }
    </div>
  )
}
