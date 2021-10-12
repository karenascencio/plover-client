import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc'
import Carrusel from '../../components/Carrusel'
import Calendar from '../../components/Calendar'
import H3 from '../../components/H3'
import TitleHeader from '../../components/TitleHeader'
import FormInput from '../../components/FormInput'
import Textarea from '../../components/Textarea'
import PlainText from '../../components/PlainText'
import Toggle from '../../components/Toggle'

import NavBarDentist from '../../components/NavBarDentist'
import H1 from '../../components/H1'
import Image from 'next/image'
import addIcon from '../../public/addIcon.svg'
import useUserInfo from '../../hooks/useUserInfo'

import AnotationsCard from '../../components/AnotationsCard'

import annotation from '../../public/post-it.png'
import care from '../../public/care.png'
dayjs.extend(utc)

// nota hay un bugsito en el manejo de estado de los toggles
// corregimos los errores de vercer, corregimos el pull request
// corregimos el carrusel y los links y los erroes de vercel

import {  getAllAppointmentsIds,
          getAppointmentById,
          getPatientById,
          getAppointmentsByPatientId,
          getDentistById,
          patchAppointment} from '../../lib/api'   

export async function getStaticPaths () {
  const ids = await getAllAppointmentsIds()
  const paths = ids.map(item => {
    return {
      params: { id: item }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps (context) {
  const id = context.params.id
  const appointment = await getAppointmentById(id)
  //aqui obtenemos los id del dentista y el paciente
  const patientId = appointment.idPatient._id
  const dentistId = appointment.idDentist
  const patientInfo = await getPatientById(patientId)
  const appointmentsInfo = await getAppointmentsByPatientId(patientId)
  const dentistInfo = await getDentistById(dentistId)

  return {
    props: {
      appointmentFetched: appointment,
      patientInfo,
      appointmentsInfo,
      dentistInfo
    }
  }
}

export default function Appointment ({ appointmentFetched, patientInfo, appointmentsInfo,dentistInfo }) {
  
    //hook para traernos el id y el rol del usuario
    const [id,rol] = useUserInfo()
    console.log('el id del usuario es ',id)
    console.log('el rol del usuario es ',rol)
  
  
  const { idPatient, idDentist } = appointmentFetched
  console.log('el id de paciente es ', idPatient)
  console.log('el id de odontologo es ', idDentist)

  const { name, lastName, userImage } = patientInfo
  
  //nos traemos los datos necesarios para pintar el nombre 
  //y la imagen del odontologo 
  const {name:nameDentist, userImage:imageDentist } = dentistInfo
  console.log(nameDentist,imageDentist)
  const [procedures, setProcedures] = useState(appointmentFetched.procedures)
  const [procedure, setProcedure] = useState({ name: '', price: 0, status: false })
  const [appointment, setAppointment] = useState(appointmentFetched)
  const cardsInfo = []

  appointmentsInfo.forEach(appointment => {
    const now = dayjs.utc()
    const appointmentDate = dayjs.utc(appointment.date)
    appointment.procedures.forEach(procedure => {
      appointmentDate >= now && cardsInfo.push({ title: appointmentDate.locale('es').format('dddd D MMMM'), subtitle: procedure.name })
    })
  })

  useEffect(() => {
    setAppointment({ ...appointment, procedures })
  }, [procedures])

  function handleProcedure (event) {
    const { name, value } = event.target
    setProcedure({ ...procedure, [name]: value })
  }
  function handleAddProcedure () {
    setProcedures([...procedures, procedure])
  }
  function handleToggle (index) {
    procedures[index].status = !procedures[index].status
    setProcedures([...procedures])
  }
  function handleChange (event) {
    const { name, value } = event.target
    setAppointment({ ...appointment, [name]: value })
  }
  async function handleSubmit () {
    await patchAppointment(appointment, appointmentFetched._id)
  }

  return (
    <div className='flex flex-col sm:flex-row '>
      <NavBarDentist 
        rol={rol}
        isHome={false} 
        idPatient={idPatient._id} 
        idDentist={idDentist} 
        image={rol=='paciente'?userImage:imageDentist} 
        name={rol=='paciente'?name:nameDentist} 
        />
      {/* el w-full rompe el layout */}
      <main className='flex  justify-center flex-grow sm:w-65vw mx-11 '>
        <div className='max-w-screen-lg w-full flex flex-col items-center '>
          <TitleHeader
            pageTitle='Paciente'
            patientName={name}
            patientLastName={lastName}
            patientImage={userImage}
          />
          <Carrusel cards={cardsInfo} />
          <div className='w-full flex justify-between '>
            <H1 textTitle='Cita' textColor='plover-blue' />
            <div className='self-end '><Calendar value={appointment.date} name='date' handleChange={handleChange} /></div>
          </div>
          <div className='w-full flex flex-col w-1/2 '>
            <div className='flex justify-between items-center'>
              <div className='self-start '><H3 textTitle='Lista de Procedimientos' textColor='plover-blue' /></div>

              <div>
                {rol=='dentista' && (<button onClick={handleAddProcedure} className=' flex justify-center text-white bg-plover-blue w-30px sm:w-28  h-30px rounded my-1'>
                <div className='pt-1'><Image src={addIcon} height={15} width={15} /></div>
                <span className='hidden sm:inline-block pl-3 text-sm pt-0.5'>Agregar</span>
                   </button>)}
              </div>
            </div>
            <div className='flex'>
              <div className='w-full grid grid-cols-6 gap-x-5'>
                {rol=='dentista' &&
                  <>
                    <div className='col-span-3'><FormInput textLabel='Procedimiento' textName='name' textValue={procedure.name} inputID='Procedimiento' handleChange={handleProcedure} handleBlur={() => console.log('blur')} /></div>
                    <div className='col-span-2'><FormInput textLabel='Costo' textName='price' textValue={procedure.price} inputID='Costo' handleChange={handleProcedure} handleBlur={() => console.log('blur')} /></div>
                    <div className='flex flex-col items-end mt-5 '>
                      <span className='text-plover-blue self-center text-sm mb-2 xl:pl-6'>Estatus</span>
                      <Toggle handleToggle={handleToggle} disabled />
                    </div>
                  </>
                }
                {
									procedures.map((procedure, key) => {
									  return (
  <React.Fragment key={key}>
    <div className='col-span-3'><PlainText text={procedure.name} /></div>
    <div className='col-span-2'><PlainText text={procedure.price} /></div>
    <div className='flex justify-end'>
      <Toggle id={key} handleToggle={handleToggle} status={procedure.status} disabled={rol=='paciente'?true:false} />
    </div>
  </React.Fragment>
									  )
									})
							    }
              </div>
            </div>
            {rol =='dentista' && <>
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
              <div><button onClick={handleSubmit} className='text-white text-sm pb-1 bg-plover-blue w-28 h-30px rounded my-1'>Guardar</button> </div>
            </>}
            {rol =='paciente' && <>
              <div className=' grid md:grid-cols-2 gap-x-5'>
                
                <AnotationsCard 
                  label={'Anotaciones'}
                  text={appointment.annotations}
                  image={annotation}
                />
                <AnotationsCard 
                  label={'Recomendaciones'}
                  text={appointment.recommendations}
                  image={care}
                />
              </div>
            
            </>}

          </div>
        </div>
      </main>
    </div>
  )
}
