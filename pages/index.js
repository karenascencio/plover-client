import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState } from 'react'
// My components
import TitleHeader from '../components/TitleHeader'
import Carrusel from '../components/Carrusel'
import SearchInput from '../components/SearchInput'
import AddNewPatientButton from '../components/AddNewPatientButton'
// Api
import api from '../lib/api'
// My images
import addAppointment from '../public/addAppointment.svg'
import addIcon from '../public/addIcon.svg'
import readAppointment from '../public/readAppointment.svg'
import clinicBackground from '../public/clinicBackground.svg'
import deleteIcon from '../public/deleteIcon.svg'
import paymentHistory from '../public/paymentHistory.svg'
import close from '../public/close.svg'
import PatientCard from '../components/PatientCard'

const cardsInfo = [
  { name: 'Alfredo Castuera', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Anotonio ibarra', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Hector Hernandez', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Karen Ascencio', procedure: 'Resinas x4', date: '01 septiembre' }
]

export async function getStaticProps () {
  const patientsInfo = await api.getPatientsByDentistId('61511d3cf6273ea718ebd5f4')
  return {
    props: {
      patientsInfo
    }
  }
}

export default function Home ({ patientsInfo }) {
  const [search, setSearch] = useState('')

  const searchHandler = event => {
    const searchInput = event.target.value
    setSearch(searchInput)
  }

  return (
    <div className='max-w-screen-lg flex flex-col items-center'>
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
        />
      </div>
      {
        search
          ? patientsInfo.filter(patient => {
              return patient.name.includes(search) || patient.lastName.includes(search)
            }).map(patient =>
              <PatientCard
                patientName={patient.name + ' ' + patient.lastName}
                patientImage='https://api.multiavatar.com/Apricot%20Apricot.png'
                key={patient._id}
              />
            )
          : patientsInfo.map(patient =>
            <PatientCard
              patientName={patient.name + ' ' + patient.lastName}
              patientImage='https://api.multiavatar.com/Apricot%20Apricot.png'
              key={patient._id}
            />
          )
      }
    </div>
  )
}
