import React from 'react'
import api from '../lib/api'
import Carrusel from '../components/Carrusel'
import Calendar from '../components/Calendar'
import H3 from '../components/H3'
import FormInput from '../components/FormInput'
import Textarea from '../components/Textarea'
import PlainText from '../components/PlainText'
import Toggle from '../components/Toggle'
import { useState,useEffect } from 'react'
import {useRouter} from 'next/router' 

//nota hay un bugsito en el manejo de estado de los toggles
//corregimos los errores de vercer, corregimos el pull request

const cardsInfo = [
  { name: 'Alfredo Castuera', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Anotonio ibarra', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Hector Hernandez', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Karen Ascencio', procedure: 'Resinas x4', date: '01 septiembre' }
]

export async function getStaticProps() {
  return {  
    props: {
        
      }
    }
  }



export default function Newappointment() {
    const router = useRouter()
    const {idPatient:patientId,idDentist:dentistId} = router.query
    console.log(router.query)
    
    const idPatient = '6154aa9a44729179b2c5d74f'
	const idDentist = '61511d3cf6273ea718ebd5f4'
    const [procedures,setProcedures] = useState([])
    const [procedure,setProcedure] = useState({name:'',price:0,status:false })
    const [appointment,setAppointment] = useState({
                                                idPatient,
                                                idDentist,
                                                procedures,
                                                annotations:'',
                                                recommendations:'',
                                                date:new Date()
                                            })

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
        await api.postAppointment(appointment)
    }


    return (
        <div className='flex flex-col items-center border border-red-800'>
                        <Carrusel cards={cardsInfo}/>
						<div className='self-end border border-red-800'><Calendar value={appointment.date} name={'date'} handleChange={handleChange}/></div>
						<div className='w-full flex flex-col border border-green-900'>
							<div className='self-start'><H3 textTitle='Citas' textColor='plover-blue'/></div>
							<div className='flex '>
                            <div className=' w-4/5 border border-red-500 grid grid-cols-3 gl:grid-cols-5 gap-x-5'>
								<div className='gl:col-span-2'><FormInput textLabel='Procedimiento' textName='name' textValue={procedure.name} inputID='Procedimiento' handleChange={handleProcedure} handleBlur={()=>console.log('blur')} /></div>
                                <div className='gl:col-span-2'><FormInput textLabel='Costo' textName='price' textValue={procedure.price} inputID='Costo' handleChange={handleProcedure} handleBlur={()=>console.log('blur')} /></div>
								<div className='flex flex-col border w-28 border-yellow-400 justify-around items-start pb-5 text-plover-blue '>
									
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
                            <div className=' grid md:grid-cols-2 gap-x-10 border border-red-700 '>
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
    )
}