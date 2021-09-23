import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// My components
import H3 from '../components/H3'
import H1 from '../components/H1'
import FormInput from '../components/FormInput'
import SearchInput from '../components/SearchInput'
import PatientCard from '../components/PatientCard'
import PatientCardInfo from '../components/PatientCardInfo'
import Toggle from '../components/Toggle'
import Carrusel from '../components/Carrusel'
const cardsInfo = [
  { name: 'alfredo castuera', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'anotonio ibarra', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'hector hernandez', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'karen ascencio', procedure: 'Resinas x4', date: '01 septiembre' }
]

export default function Home () {
  return (
    <>
      <H3
        textTitle='Citas'
        textColor='plover-blue'
      />
      <H1
        textTitle='Citas'
        textColor='plover-blue'
      />
      <FormInput
        textLabel='Nombre'
        textValue='Karen'
        inputID='01-input'
      />
      <SearchInput
        textPlaceholder='Buscar paciente...'
      />
      <PatientCard
        dummyContent='Hola soy info'
        patientImage='https://ak.picdn.net/shutterstock/videos/3779099/thumb/1.jpg'
        patientName='Mariana Jáuregui'
      />
      <Toggle
        textPlaceholder='soy un toggle'
      />
      <Carrusel cards={cardsInfo} />
    </>
  )
}
