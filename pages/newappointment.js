import React from 'react'
import api from '../lib/api'
import Carrusel from '../components/Carrusel'
import Calendar from '../components/Calendar'
import H3 from '../components/H3'
import FormInput from '../components/FormInput'
import Textarea from '../components/Textarea'
import PlainText from '../components/PlainText'
import Toggle from '../components/Toggle'
import NavBarDentist from '../components/NavBarDentist'
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
		console.log(router.query)
    const {patientId:idPatient,dentistId:idDentist} = router.query

		console.log('el id de paciente es: ',idPatient)
		console.log('el id de dentista es: ',idDentist)
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
        <div className='flex flex-col sm:flex-row '>
        	<NavBarDentist isHome={false} idPatient ={idPatient} idDentist={idDentist}/>
                {/*el w-full rompe el layout*/}
        		<main className= 'flex w-ful justify-center flex-grow sm:w-65vw mx-11'>
              <div className='max-w-screen-lg w-full flex flex-col items-center'>
						<div className='self-end '><Calendar value={appointment.date} name={'date'} handleChange={handleChange}/></div>
						<div className='w-full flex flex-col w-1/2 '>
                            <div className='flex justify-between items-center'>
							    <div className='self-start '><H3 textTitle='Lista de Procedimientos' textColor='plover-blue'/></div>
                                <div><button onClick={handleAddProcedure} className='text-white bg-plover-blue w-28 h-30px rounded my-1'>Agregar</button> </div>
                            </div>
                            <div className='flex border border-red-500 '>
                            <div className='w-full grid grid-cols-6 gap-x-5'>
								<div className='col-span-3'><FormInput textLabel='Procedimiento' textName='name' textValue={procedure.name} inputID='Procedimiento' handleChange={handleProcedure} handleBlur={()=>console.log('blur')} /></div>
                                <div className='col-span-2'><FormInput textLabel='Costo' textName='price' textValue={procedure.price} inputID='Costo' handleChange={handleProcedure} handleBlur={()=>console.log('blur')} /></div>
								<div className='flex flex-col  justify-around items-start pb-5 text-plover-blue '>
									
									</div>
								{
									procedures.map((procedure,key)=>{
										return (
											<React.Fragment key={key}>
											<div className='col-span-3'><PlainText text={procedure.name}/></div>
											<div className='col-span-2'><PlainText text={procedure.price}/></div>
                                            <div className=''>
                                                <Toggle id={key}  handleToggle={handleToggle}/>
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