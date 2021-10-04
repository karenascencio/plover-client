import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
// My components
import TitleHeader from '../components/TitleHeader'
import Carrusel from '../components/Carrusel'
import SearchInput from '../components/SearchInput'
import AddNewPatientButton from '../components/AddNewPatientButton'
// Api
import api from '../lib/api'
// JWT
import getJwtId from '../lib/jwt'
// My images
import addAppointment from '../public/addAppointment.svg'
import addIcon from '../public/addIcon.svg'
import readAppointment from '../public/readAppointment.svg'
import clinicBackground from '../public/clinicBackground.svg'
import deleteIcon from '../public/deleteIcon.svg'
import paymentHistory from '../public/paymentHistory.svg'
import close from '../public/close.svg'
import PatientCard from '../components/PatientCard'
import Link from 'next/link'
import NavBarPatient from '../components/NavBarPatient'
import NavBarDentist from '../components/NavBarDentist'

const cardsInfo = [
  { title: 'Alfredo Castuera', subtitle: 'Resinas x4', thirdTitle: '01 septiembre' },
  { title: 'Anotonio ibarra', subtitle: 'Resinas x4', thirdTitle: '01 septiembre' },
  { title: 'Hector Hernandez', subtitle: 'Resinas x4', thirdTitle: '01 septiembre' },
  { title: 'Karen Ascencio', subtitle: 'Resinas x4', thirdTitle: '01 septiembre' },
  { title: 'Alfredo Castuera', subtitle: 'Resinas x4', thirdTitle: '01 septiembre' },
  { title: 'Anotonio ibarra', subtitle: 'Resinas x4', thirdTitle: '01 septiembre' },
  { title: 'Hector Hernandez', subtitle: 'Resinas x4', thirdTitle: '01 septiembre' },
  { title: 'Karen Ascencio', subtitle: 'Resinas x4', thirdTitle: '01 septiembre' }
]

export async function getStaticProps () {
  const patientsInfo = await api.getPatientsByDentistId('61511d3cf6273ea718ebd5f4')
  const appointmentsInfo = await api.getAppointmentByDentistId('61511d3cf6273ea718ebd5f4')
  return {
    props: {
      patientsInfo,
      appointmentsInfo
    }
  }
}

export default function Home ({ patientsInfo, appointmentsInfo }) {
  const dentistId = '61511d3cf6273ea718ebd5f4'
  console.log(appointmentsInfo)
  const [search, setSearch] = useState('')

  const searchHandler = event => {
    const searchInput = event.target.value
    setSearch(searchInput)
  }

  return (

<div className='flex flex-col sm:flex-row '>
  <NavBarDentist isHome={true}/>
  <main className= 'flex w-ful justify-center flex-grow sm:w-65vw mx-11'> 
    <div className='max-w-screen-lg w-full flex flex-col items-center'>
      <TitleHeader
        pageTitle='Home'
        secondaryText='Próximas citas'
      />
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
            idDentist ={dentistId}
          />
   
      </div>
      <div className='w-full border-t border-lighter-gray'>
        {
        search
          ? patientsInfo.filter(patient => {
              return patient.name.includes(search.toLowerCase()) || patient.lastName.includes(search.toLowerCase())
            }).map(patient =>
              <PatientCard
                patientName={patient.name + ' ' + patient.lastName}
                patientImage='https://api.multiavatar.com/car%20pls.png'
                key={patient._id}
                patientId={patient._id}
                dentistId={dentistId}
              />
            )
          : patientsInfo.map(patient =>
            <PatientCard
              patientName={patient.name + ' ' + patient.lastName}
              patientImage='https://api.multiavatar.com/car%20pls.png'
              key={patient._id}
              patientId={patient._id}
              dentistId={dentistId}
            />
          )
        }
      </div>
    </div>
  </main>
</div>
  )
}
