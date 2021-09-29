import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
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
const cardsInfo = [
  { name: 'Alfredo Castuera', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Anotonio ibarra', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Hector Hernandez', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Karen Ascencio', procedure: 'Resinas x4', date: '01 septiembre' }
]

export default function Home () {
  return (
    <>
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
        />
        <AddNewPatientButton
          title='Nuevo'
          imagen={addIcon}
        />
      </div>
    </>
  )
}
