import React from 'react'
import api from '../lib/api'
import Carrusel from '../components/Carrusel'
import AmountDisplay from '../components/AmountDisplay'
import H3 from '../components/H3'
import FormInput from '../components/FormInput'
import PlainText from '../components/PlainText'
import { useState,useEffect } from 'react'

const cardsInfo = [
  { name: 'Alfredo Castuera', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Anotonio ibarra', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Hector Hernandez', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Karen Ascencio', procedure: 'Resinas x4', date: '01 septiembre' }
]




export async function getStaticProps() {
  const payments = await api.getPaymentsByPatientId('61511de2f6273ea718ebd5f7')
  return {  
    props: {
			payments
      }
    }
  }



export default function Payments({payments}) {
	const idPatient = '61511de2f6273ea718ebd5f7'
	const idDentist = '61511d3cf6273ea718ebd5f4'
	const [payment,setPayment] = useState({total:'',date:'',file:'some file',idDentist,idPatient})

	function handleChange(event){
		console.log(payment)
		const {name,value} = event.target
		setPayment({...payment,[name]:value})
	}
	async function handleSubmit(){
			payment.total = Number(payment.total)
			payment.date = new Date(payment.date)
			await api.postPayment(payment)

	}

    return (
        <div className='flex flex-col '>
            <Carrusel cards={cardsInfo}/>
						<AmountDisplay totalAmount={10000} remaining={1000}/>
						<div className='flex flex-col '>
							<H3 textTitle='Pagos' textColor='plover-blue'/>
							<div className='grid grid-cols-3 gl:grid-cols-5 gap-x-5'>
								<div className='gl:col-span-2'><FormInput textLabel='Monto' textName='total' textValue={payment.total} inputID='Monto' handleChange={handleChange} handleBlur={()=>console.log('blur')} /></div>
								<div className='gl:col-span-2  flex flex-col justify-end items-center pb-4 lg:flex-row lg:justify-start lg:items-end lg:pb-7'>
								<label className='text-plover-blue text-base font-thin' htmlFor='calendar'>
          				Selecciona una fecha:
       				 </label>
        				<input
          				className='text-plover-blue text-base border rounded font-thin ml-1 px-1'
          				type='date'
          				id='calendar'
									name='date'
									value={payment.date}
									onChange={handleChange}
        					/>
								</div>
								<div className='flex flex-col border w-28 border-yellow-400 justify-around items-start pb-5 text-plover-blue '>
									<button onClick={handleSubmit} className='text-white bg-plover-blue w-28 h-30px rounded my-1'>Agregar pago</button>
									<span className=''>Comprobante</span>
									</div>

								{
									payments.map((item,key)=>{
										return (
											<React.Fragment key={key}>
											<div className='gl:col-span-2'><PlainText text={item.total}/></div>
											<div className='gl:col-span-2'><PlainText text={new Date(item.date).toLocaleDateString()}/></div>
											<button className='text-white bg-plover-blue w-28 h-30px rounded my-1'>{'agregar'}</button>
											</React.Fragment>
										)
									})
								}
							</div>
						</div>
        </div>
    )
}
