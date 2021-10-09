import React, { useState, useEffect } from 'react'
import api from '../../lib/api'
import Carrusel from '../../components/Carrusel'
import AmountDisplay from '../../components/AmountDisplay'
import H3 from '../../components/H3'
import H1 from '../../components/H1'
import FormInput from '../../components/FormInput'
import PlainText from '../../components/PlainText'

import router, { useRouter } from 'next/router'
import NavBarDentist from '../../components/NavBarDentist'
import bill from '../../public/bill.svg'
import Image from 'next/image'
import { useS3Upload } from 'next-s3-upload'
import DocViewer, { DocViewerRenderers } from 'react-doc-viewer'

// trabajando en payments

const cardsInfo = [
  { name: 'Alfredo Castuera', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Anotonio ibarra', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Hector Hernandez', procedure: 'Resinas x4', date: '01 septiembre' },
  { name: 'Karen Ascencio', procedure: 'Resinas x4', date: '01 septiembre' }
]

export async function getStaticPaths () {
  const ids = await api.getAllPatientsIds()
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
  console.log(`el id es: ${id}`)
  const payments = await api.getPaymentsByPatientId(id)
  const appointments = await api.getAppointmentsByPatientId(id)
  return {
    props: {
      payments,
      appointments
    }
  }
}

export default function Payments ({ payments, appointments }) {
  // console.log(`los pagos son: ${payments}`)
  // console.log(`los citas son: ${appointments}`)
  const router = useRouter()
  // console.log(router.query)
  // const idPatient = router.query.id
  // console.log(`el id de paciente es ${idPatient}`)
  // const idDentist = router.query.idDentist
  // console.log(`el id de odontologo es ${idDentist}`)

  const firstPayment = payments[0]
  const { idPatient, idDentist } = firstPayment

  console.log(firstPayment)
  // hook para subir archivos a s3
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

  const [dynamicPayments, setDynamicPayments] = useState(payments)
  const [payment, setPayment] = useState({ total: '', date: '', receipt: '', idPatient, idDentist })
  // console.log(dynamicPayments)
  const [fullPrice, setFullPrice] = useState(getFullPrice(appointments))
  const [remaningPrice, setRemaningPrice] = useState(fullPrice - getPaidOut(dynamicPayments))
  const [initial, setInitial] = useState(false)
  const [error, setError] = useState(true)
  const [errorDate, setErrorDate] = useState(true)

  const [file, setFile] = useState('')
  const [indexPaymentToUpdate, setIndexPaymentToUpdate] = useState(null)

  const [currentPayment, setCurrentPayment] = useState(null)
  const [visible, setVisible] = useState(false)

  // console.log(`el total a pagar es ${fullPrice}`)
  // console.log(`el total pagado es ${getPaidOut(dynamicPayments)}`)
  function getPaidOut (dynamicPayments) {
    return dynamicPayments.reduce((acum, payment) => {
      return acum + payment.total
    }, 0)
  }

  function getFullPrice (appointments) {
    return appointments.reduce((acum, appointment) => {
		  return acum + appointment.procedures.reduce((acum, procedure) => {
        return acum + procedure.price
		  }, 0)
    }, 0)
	  }

  function handleChange (event) {
    setInitial(true)
    console.log(payment)
    const { name, value } = event.target
    console.log(`el nombre del input es ${name} y su valor es ${value}`)
    if (name == 'total' && (isNaN(value) || value == '' || Number(value) <= 0)) {
      setError(true)
    } else if (name == 'total' && !isNaN(value)) {
      setError(false)
    }
    if (name == 'date' && value == '') {
      setErrorDate(true)
    } else if (name == 'date' && value != ' ') {
      setErrorDate(false)
    }
    setPayment({ ...payment, [name]: value })
  }
  async function handlePayment () {
    setInitial(true)
    payment.total = Number(payment.total)
    payment.date = new Date(payment.date)
    await api.postPayment(payment)
    const newPayments = await api.getPaymentsByPatientId(idPatient)
    console.log(newPayments)
    setDynamicPayments(newPayments)
  }

  // agregamos el manejador de la subida del archivo
  const handleFileChange = async file => {
    const { url } = await uploadToS3(file)
    console.log(url)
    setFile(url)
    // payments[indexPaymentToUpdate].receipt = url
    // console.log(payments[indexPaymentToUpdate])

    // console.log('el id del pago que quires actualizar es: ', idPaymentPatched)
    // console.log('el documento que quieres subir es: ',url)
	  }

  async function updatePayment (event) {
    const { id } = event.target
    console.log(event.target.id)
    console.log(file)
    setIndexPaymentToUpdate(id)
  }

  function handleSeeFile (event) {
    setCurrentPayment(event.target.id)
    setVisible(true)
  }

  useEffect(async () => {
    await api.patchPayment(indexPaymentToUpdate, { receipt: file })
  }, [file])

  useEffect(() => {
    setRemaningPrice(fullPrice - getPaidOut(dynamicPayments))
  }, [dynamicPayments])

  return (
    <>
      <div className='flex flex-col sm:flex-row '>
        <NavBarDentist
          isHome={false}
          idPatient={idPatient}
          idDentist={idDentist}
        />
        <main className='flex justify-center flex-grow sm:w-65vw mx-11'>
          <div className='flex flex-col items-center max-w-screen-lg '>
            <Carrusel cards={cardsInfo} />
            <div className='w-full flex justify-between'>
              <H1 textTitle='Pagos' textColor='plover-blue' />
              <div className='mr-4'>
                <AmountDisplay
                  totalAmount={fullPrice}
                  remaining={remaningPrice}
                />
              </div>
            </div>
            <div className='w-full flex flex-col'>
              <div className='self-start'>
                <button
                  disabled={errorDate}
                  onClick={handlePayment}
                  className={`text-white ${error ? 'bg-lighter-gray' : 'bg-plover-blue'} w-28 h-30px rounded my-1 `}
                >Agregar pago
                </button>
              </div>
              <div className='grid grid-cols-5 gap-x-5 place-items-stretch'>
                <div className='col-span-2 flex flex-col'>
                  <FormInput textLabel='Monto' textName='total' textValue={payment.total} inputID='Monto' handleChange={handleChange} handleBlur={() => console.log('blur')} />
                  {initial && error && <div className='text-sm text-plover-blue -mt-5'>Ingresa el costo </div>}
                </div>
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
                {dynamicPayments.map((item, key) => {
								  return (
  <React.Fragment key={key}>
    <div className='col-span-2'><PlainText text={item.total} /></div>
    <div className='col-span-2'><PlainText text={new Date(item.date).toLocaleDateString()} /></div>
    {item.receipt == '' ? (
      <div className='lg:px-6'>
        <FileInput onChange={handleFileChange} />
        <button
          id={item._id}
          onClick={(event) => { openFileDialog(); updatePayment(event) }}
          className='p-1 text-white bg-plover-blue  rounded my-1'
        >Agregar comprobabte
        </button>
      </div>)
      : <button
          id={item.receipt}
          className='p-1 text-white bg-plover-blue  rounded my-1'
          onClick={handleSeeFile}
        >mostrar comprobante
      </button>}
  </React.Fragment>
								  )
                })}
              </div>
            </div>
          </div>
        </main>
      </div>
      {visible && (
        <>
          <div className='z-40 bg-plover-blue bg-opacity-25 w-full h-100vh fixed top-0 border border-red-500'>
            <DocViewer
              className='bg-no-repeat'
              style={{ width: '100vw', height: '100vh' }}
              pluginRenderers={DocViewerRenderers}
              documents={[{ uri: currentPayment }]}
            />
            <button
              className='z-50 w-2/12 h-1/5 bg-red-500 absolute top-0 right-0'
              onClick={() => setVisible(false)}
            >cerrar
            </button>
          </div>
        </>
      )}
    </>
  )
}
