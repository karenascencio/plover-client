import React from 'react'
import api from '../../lib/api'
import Carrusel from '../../components/Carrusel'
import AmountDisplay from '../../components/AmountDisplay'
import H3 from '../../components/H3'
import H1 from '../../components/H1'
import FormInput from '../../components/FormInput'
import PlainText from '../../components/PlainText'
import { useState,useEffect } from 'react'
import { useRouter } from 'next/router'
import NavBarDentist from '../../components/NavBarDentist'

const cardsInfo = [
  { name: 'Alfredo Castuera', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Anotonio ibarra', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Hector Hernandez', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Karen Ascencio', procedure: 'Resinas x4', date: '01 septiembre' }
]



export async function getStaticPaths(){
    const ids = await api.getAllPatientsIds()
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
  console.log(`el id es: ${id}`)
  const payments = await api.getPaymentsByPatientId(id)
  const appointments = await api.getAppointmentsByPatientId(id)
  return {  
    props: {
			payments,
			appointments,
      }
    }
  }



export default function Payments({payments,appointments}){
    console.log(`los pagos son: ${payments}`)
    console.log(`los citas son: ${appointments}`)
    const router = useRouter()
    console.log(router.query)
    const idPatient = router.query.id
    console.log(`el id de paciente es ${idPatient}`)
    const idDentist = router.query.dentistId
    console.log(`el id de odontologo  es ${idDentist}`)
    


	const [dynamicPayments,setDynamicPayments] = useState(payments)
	const [payment,setPayment] = useState({total:'',date:'',file:'some file',idDentist,idPatient})
	console.log(dynamicPayments)
	const [fullPrice,setFullPrice] = useState(getFullPrice(appointments))
	const [remaningPrice,setRemaningPrice] = useState(fullPrice-getPaidOut(dynamicPayments))

	console.log(`el total a pagar es ${fullPrice}`)
	console.log(`el total pagado es ${getPaidOut(dynamicPayments)}`)
	function getPaidOut(dynamicPayments){
		return dynamicPayments.reduce((acum,payment)=>{
			return acum+payment.total
		},0)
	}

	function getFullPrice(appointments){
		return appointments.reduce((acum,appointment)=>{
		  return acum+appointment.procedures.reduce((acum,procedure)=>{
			return acum+procedure.price
		  },0)
		},0)
	  }
	

	function handleChange(event){
		console.log(payment)
		const {name,value} = event.target
		setPayment({...payment,[name]:value})
	}
	async function handlePayment(){
			payment.total = Number(payment.total)
			payment.date = new Date(payment.date)
			await api.postPayment(payment)
			setDynamicPayments([...dynamicPayments,payment])
	}

	useEffect(()=>{
		setRemaningPrice(fullPrice-getPaidOut(dynamicPayments))
	},[dynamicPayments])
    return (
<div className='flex flex-col sm:flex-row '>
    <NavBarDentist isHome={false} idPatient={idPatient} idDentist={idDentist}/>
        <main className= 'flex w-ful justify-center flex-grow sm:w-65vw mx-11'>
        <div className='flex flex-col items-center max-w-screen-lg '>
            <Carrusel cards={cardsInfo}/>
						<div className='w-full flex justify-between' >
							<H1 textTitle='Pagos' textColor='plover-blue'/>
							<AmountDisplay  totalAmount={fullPrice} remaining={remaningPrice}/>
						</div>
						<div className='w-full flex flex-col'>
							<div className='self-start'>
								<button onClick={handlePayment} className='text-white bg-plover-blue w-28 h-30px rounded my-1'>Agregar pago</button>
							</div>
							<div className='grid grid-cols-5 gap-x-5'>
								<div className='col-span-2'><FormInput textLabel='Monto' textName='total' textValue={payment.total} inputID='Monto' handleChange={handleChange} handleBlur={()=>console.log('blur')} /></div>
								<div className='col-span-2  flex flex-col justify-end items-center pb-4'>
									<label className='text-plover-blue text-sm pb-2 self-start' htmlFor='calendar'>
          								Fecha:
       				 				</label>
        							<input
          								className='text-plover-blue text-sm border rounded ml-1 py-1.5 px-1 w-full'
          								type='date'
          								id='calendar'
										name='date'
										value={payment.date}
										onChange={handleChange}
        							/>
								</div>
								<div className='flex flex-col  w-28  justify-around items-start pb-5 text-plover-blue '>
									<span className=''>Comprobante</span>
									</div>

								{
									dynamicPayments.map((item,key)=>{
										return (
											<React.Fragment key={key}>
											<div className='col-span-2'><PlainText text={item.total}/></div>
											<div className='col-span-2'><PlainText text={new Date(item.date).toLocaleDateString()}/></div>
											<button className='text-white bg-plover-blue w-30px h-30px rounded my-1'>{'+'}</button>
											</React.Fragment>
										)
									})
								}
							</div>
						</div>
                </div>
            </main>
        </div>
    )
}
