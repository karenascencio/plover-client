import React, { useState, useEffect } from 'react'
import {postAppointment} from '../lib/api'
import Carrusel from '../components/Carrusel'
import Calendar from '../components/Calendar'
import H3 from '../components/H3'
import H1 from '../components/H1'
import FormInput from '../components/FormInput'
import Textarea from '../components/Textarea'
import PlainText from '../components/PlainText'
import Toggle from '../components/Toggle'
import NavBarDentist from '../components/NavBarDentist'
import TitleHeader from '../components/TitleHeader'

import { useRouter } from 'next/router'
import addIcon from '../public/addIcon.svg'
import Image from 'next/image'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


import { getDentistById,
          getPatientById,
        getAppointmentsByPatientId} from '../lib/api'    

// nota hay un bugsito en el manejo de estado de los toggles
// corregimos los errores de vercer, corregimos el pull request


export default function Newappointment () {
  const router = useRouter()
  console.log(router.query)
  const { idPatient, idDentist } = router.query

  const [dentistInfo,setDentistIfo] = useState(null)
  const [patientInfo,setPatientInfo] = useState(null)
  const [appointmentsInfo,setAppointmentsInfo] = useState([])
  useEffect(()=>{
    async function getInfo(){
      const dentistsInfo = await getDentistById(idDentist)
      const patientInfo = await getPatientById(idPatient)
      const appointmentsInfo = await getAppointmentsByPatientId(idPatient)
      setDentistIfo(dentistsInfo)
      setPatientInfo(patientInfo)
      setAppointmentsInfo(appointmentsInfo)
    }
    if(router.isReady) getInfo()
  },[router.isReady])

  console.log(dentistInfo)
  if(dentistInfo){
    var {name,userImage} = dentistInfo
  }
  if(patientInfo){
    var {name:patientName,lastName:patientLastName,userImage:patientImage} = patientInfo
  }

  const cardsInfo = []
  appointmentsInfo.forEach(appointment => {
    const now = dayjs.utc()
    const appointmentDate = dayjs.utc(appointment.date)
    appointment.procedures.forEach(procedure => {
      appointmentDate >= now && cardsInfo.push({ title: appointmentDate.locale('es').format('dddd D MMMM'), subtitle: procedure.name })
    })
  })



  console.log('el id de paciente es: ', idPatient)
  console.log('el id de dentista es: ', idDentist)
  const [procedures, setProcedures] = useState([])
  const [procedure, setProcedure] = useState({ name: '', price: 0, status: false })
  const [appointment, setAppointment] = useState({
    idPatient,
    idDentist,
    procedures,
    annotations: '',
    recommendations: '',
    date: new Date()
  })

  useEffect(() => {
    setAppointment({ ...appointment, procedures })
  }, [procedures])

  console.log(`las lista de procedimientos tiente ${procedures.length} procedimientod`)

  function handleProcedure (event) {
    const { name, value } = event.target
    setProcedure({ ...procedure, [name]: value })
  }
  function handleAddProcedure () {
    setProcedures([...procedures, procedure])
    setProcedure({ name: '', price: 0, status: false })
  }
  function handleToggle (index) {
    procedures[index].status = !procedures[index].status
    setProcedures([...procedures])
  }
  function handleChange (event) {
    const { name, value } = event.target
    setAppointment({ ...appointment, [name]: value })
  }
  async function handleSubmit (e) {
    await postAppointment(appointment)
    e.preventDefault()
    console.log(`te quieres mover a /patients/${idPatient}`)
    router.push(`/patients/${idPatient}`)
  }
  function handleDelete (index) {
    const newProcedures = procedures.filter((item, key) => key !== index)
    setProcedures([...newProcedures])
  }

  return (
    <div className='flex flex-col sm:flex-row '>
      <NavBarDentist isHome={false} idPatient={idPatient} idDentist={idDentist} name={name} image={userImage}/>
      {/* el w-full rompe el layout */}
      <main className='flex  justify-center flex-grow sm:w-65vw mx-11 '>
        <div className='max-w-screen-lg w-full flex flex-col items-center '>
          <TitleHeader
              pageTitle='Paciente'
              patientName={patientName?patientName:''}
              patientLastName={patientLastName?patientLastName:''}
              patientImage={patientImage?patientImage:''}
            />
          <Carrusel cards={cardsInfo} /> 
          <div className='w-full flex justify-between '>
            <H1 textTitle='Cita' textColor='plover-blue' />
            <div className='self-end '><Calendar value={appointment.date} name='date' handleChange={handleChange} /></div>
          </div>
          <div className='w-full flex flex-col w-1/2 '>
            <div className='flex justify-between items-center'>
              <div className='self-start '><H3 textTitle='Lista de procedimientos' textColor='plover-blue' /></div>

              <div><button onClick={handleAddProcedure} className=' flex justify-center text-white bg-plover-blue w-30px sm:w-28  h-30px rounded my-1'>
                <div className='pt-1'><Image src={addIcon} height={15} width={15} /></div>
                <span className='hidden sm:inline-block pl-3 text-sm pt-0.5'>Agregar</span>
                   </button>
              </div>
            </div>
            <div className='flex'>
              <div className='w-full grid grid-cols-7 gap-x-3'>
                <div className='col-span-4 '><FormInput textLabel='Procedimiento' textName='name' textValue={procedure.name} inputID='Procedimiento' handleChange={handleProcedure} handleBlur={() => console.log('blur')} /></div>
                <div className='col-span-2'><FormInput textLabel='Costo' textName='price' textValue={procedure.price} inputID='Costo' handleChange={handleProcedure} handleBlur={() => console.log('blur')} /></div>
                <div className='flex flex-col  mt-5'>
                  <span className='text-plover-blue self-center text-sm mb-2 xl:pl-6'>Estatus</span>
                  <div className='flex justify-end'>
                    <Toggle handleToggle={handleToggle} disabled />
                  </div>
                </div>
                {
									procedures.map((procedure, key) => {
									  return (
  <React.Fragment key={key}>
    <div className='col-span-4 relative'><PlainText text={procedure.name} /><button onClick={() => handleDelete(key)} className='text-red-500 absolute top-0 right-2'>x</button></div>
    <div className='col-span-2'><PlainText text={procedure.price} /></div>
    <div className='flex justify-end'>
      <Toggle id={key} handleToggle={handleToggle} />
    </div>
  </React.Fragment>
									  )
									})
							    }
              </div>
            </div>
            <div className=' grid md:grid-cols-2 gap-x-5'>
              <Textarea
                textName='annotations'
                textLabel='Anotaciones'
                textValue={appointment.annotations}
                inputId='annotations'
                handleChange={handleChange}
                handleBlur={() => console.log('blur')}
              />
              <Textarea
                textLabel='Recomendaciones'
                textValue={appointment.recommendations}
                inputId='recommendations'
                textName='recommendations'
                handleChange={handleChange}
                handleBlur={() => console.log('blur')}
              />
            </div>
            <div><button disabled={!procedures.length} onClick={handleSubmit} className={`text-white text-sm pb-1 ${!procedures.length ? 'bg-lighter-gray' : 'bg-plover-blue'} w-28 h-30px rounded my-1`}>Guardar</button> </div>
          </div>
        </div>
      </main>
    </div>
  )
}
