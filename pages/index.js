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
import Textarea from '../components/Textarea'
import ProcedureCard from '../components/ProcedureCard'
import ChangePicture from '../components/ChangePicture'
import PopUp from '../components/PopUp'
import LoginButtons from '../components/LoginButtons'
import AsideLeftButtons from '../components/AsideLeftButtons'
import CardButtonPatient from '../components/CardButtonPatient'
// My images
import addAppointment from '../public/addAppointment.svg'
import addIcon from '../public/addIcon.svg'
import readAppointment from '../public/readAppointment.svg'
import clinicBackground from '../public/clinicBackground.svg'

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
        patientImage='https://i.pinimg.com/originals/20/02/b1/2002b11bafd880f3c8b3584a972f6693.png'
        patientName='Mariana Jáuregui'
      />
      <Toggle
        textPlaceholder='soy un toggle'
      />
      <Carrusel cards={cardsInfo} />
      <Textarea
        textLabel='Anotaciones'
      />
      <ProcedureCard
        procedureName='Blanqueamiento Dental'
        procedureDate='Martes 21 de Septiembre 2021'
        procedureStatus='Terminado'
      />
      <ChangePicture
        profilePicture='https://i.pinimg.com/originals/20/02/b1/2002b11bafd880f3c8b3584a972f6693.png'
      />
      <PopUp
        popUpText='Las contraseñas no coinciden, porfavor reingresa la contraseña.'
      />
      <LoginButtons title='INICIAR SESIÓN' />
      <AsideLeftButtons title='HOME' />

      <div className='flex flex-grow  justify-evenly-2 max-w-2xl'>
        <CardButtonPatient
          title='Agregar cita'
          imagen={addAppointment}
        />
        <CardButtonPatient
          title='Consultar cita'
          imagen={readAppointment}
        />
        <CardButtonPatient
          title='Historial clínico'
          imagen={clinicBackground}
        />
      </div>
    </>
  )
}
