import React from 'react'
import api from '../lib/api'
import Carrusel from '../components/Carrusel'
import AmountDisplay from '../components/AmountDisplay'
import H3 from '../components/H3'
import FormInput from '../components/FormInput'
import PlainText from '../components/PlainText'

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
		console.log(payments)
    return (
        <div className='flex flex-col'>
            <Carrusel cards={cardsInfo}/>
						<AmountDisplay totalAmount={10000} remaining={1000}/>
						<div className='flex flex-col'>
							<H3 textTitle='Pagos' textColor='plover-blue'/>
							<div className='grid grid-cols-5 gap-x-5'>
								<div className='col-span-2'><FormInput textLabel='Monto'/></div>
								<div className='col-span-2'><FormInput textLabel='Fecha'/></div>
								<span></span>

								{
									payments.map((item,key)=>{
										return (
											<>
											<div className='col-span-2'><PlainText text={item.total}/></div>
											<div className='col-span-2'><PlainText text={item.date}/></div>
											<span>{'agregar'}</span>
											</>
										)
									})
								}


							</div>
						</div>

        </div>
    )
}
