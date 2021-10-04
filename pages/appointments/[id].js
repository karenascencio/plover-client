import React from 'react'
import api from '../../lib/api'
import Carrusel from '../../components/Carrusel'
import Calendar from '../../components/Calendar'
import H3 from '../../components/H3'
import FormInput from '../../components/FormInput'
import Textarea from '../../components/Textarea'
import PlainText from '../../components/PlainText'
import Toggle from '../../components/Toggle'
import { useState,useEffect } from 'react'
import NavBarDentist from '../../components/NavBarDentist'

//nota hay un bugsito en el manejo de estado de los toggles
//corregimos los errores de vercer, corregimos el pull request
//corregimos el carrusel y los links y los erroes de vercel

const cardsInfo = [
  { name: 'Alfredo Castuera', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Anotonio ibarra', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Hector Hernandez', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Karen Ascencio', procedure: 'Resinas x4', date: '01 septiembre' }
]

export async function getStaticPaths(){
    const ids = await api.getAllAppointmentsIds()
    const paths = ids.map(item=>{
        return {
            params:{id:item}
        }
    })

    return {
        paths,
        fallback:false
    }
}

export async function getStaticProps(context) {
    const id = context.params.id
    const appointment = await api.getAppointmentById(id)
    return {  
      props: {
          appointmentFetched:appointment
        }
      }
    }


export default function Appointment({appointmentFetched}) {
    const {idPatient,idDentist} = appointmentFetched
    console.log('el id de paciente es ', idPatient)
    console.log('el id de odontologo es ', idDentist)

    const [procedures,setProcedures] = useState(appointmentFetched.procedures)
    const [procedure,setProcedure] = useState({name:'',price:0,status:false })
    const [appointment,setAppointment] = useState(appointmentFetched)

    useEffect(()=>{
        setAppointment({...appointment,procedures})
    },[procedures])

    function handleProcedure(event){
        const {name,value} = event.target
        setProcedure({...procedure,[name]:value})
    }
    function handleAddProcedure(){
        setProcedures([...procedures,procedure])
    }
    function handleToggle(index){
        procedures[index].status= !procedures[index].status 
        setProcedures([...procedures])
    }
    function handleChange(event){
        const {name,value} = event.target
        setAppointment({...appointment,[name]:value})
    }
    async function handleSubmit(){
        await api.patchAppointment(appointment,appointmentFetched._id)
    }


    return (

        <div className='flex flex-col sm:flex-row '>
        	<NavBarDentist isHome={false} idPatient={idPatient} idDentist={idDentist}/>
        		<main className= 'flex w-ful justify-center flex-grow sm:w-65vw mx-11'>
                    <div className='flex flex-col items-center '>
                        <Carrusel cards={cardsInfo}/>
						<div className='self-end '><Calendar value={appointment.date} name={'date'} handleChange={handleChange}/></div>
						<div className='w-full flex flex-col '>
							<div className='self-start'><H3 textTitle='Citas' textColor='plover-blue'/></div>
							<div className='flex '>
                            <div className=' w-4/5  grid grid-cols-3 gl:grid-cols-5 gap-x-5'>
								<div className='gl:col-span-2'><FormInput textLabel='Procedimiento' textName='name' textValue={procedure.name} inputID='Procedimiento' handleChange={handleProcedure} handleBlur={()=>console.log('blur')} /></div>
                                <div className='gl:col-span-2'><FormInput textLabel='Costo' textName='price' textValue={procedure.price} inputID='Costo' handleChange={handleProcedure} handleBlur={()=>console.log('blur')} /></div>
								<div className='flex flex-col  w-28  justify-around items-start pb-5 text-plover-blue '>
									
									<span className=''>Estado</span>
									</div>
								{
									procedures.map((procedure,key)=>{
										return (
											<React.Fragment key={key}>
											<div className='gl:col-span-2'><PlainText text={procedure.name}/></div>
											<div className='gl:col-span-2'><PlainText text={procedure.price}/></div>
                                            <Toggle id={key}  handleToggle={handleToggle}/>

											</React.Fragment>
										)
									})
							    }
							</div>
                                <div><button onClick={handleAddProcedure} className='text-white bg-plover-blue w-28 h-30px rounded my-1'>Agregar</button> </div>
                            </div>
                            <div className=' grid md:grid-cols-2 gap-x-10 '>
                                <Textarea 
                                    textName='annotations'
                                    textLabel='Anotaciones'
                                    textValue={appointment.annotations}
                                    inputId='annotations'
                                    handleChange={handleChange}
                                    handleBlur={()=>console.log('blur')}
                                    />
                                <Textarea 
                                    textLabel='Recomendaciones'
                                    textValue={appointment.recommendations}
                                    inputId='recommendations'
                                    textName='recommendations'
                                    handleChange={handleChange}
                                    handleBlur={()=>console.log('blur')}

                                />
                            </div>
                            <div><button onClick={handleSubmit} className='text-white bg-plover-blue w-28 h-30px rounded my-1'>Enviar</button> </div>
						</div>
                    </div>
                </main>
            </div>
    )
}