import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc'
import Carrusel from '../../components/Carrusel'
import AmountDisplay from '../../components/AmountDisplay'
import TitleHeader from '../../components/TitleHeader'
import H1 from '../../components/H1'
import FormInput from '../../components/FormInput'
import PlainText from '../../components/PlainText'
import useAvailableToken from '../../hooks/useAvailableToken'
import router, { useRouter } from 'next/router'
import NavBarDentist from '../../components/NavBarDentist'
import bill from '../../public/bill.svg'
import Image from 'next/image' 
import { useS3Upload } from 'next-s3-upload'
import useUserInfo from '../../hooks/useUserInfo'

import dynamic from 'next/dynamic'

//const DocViewer = dynamic(() => import('react-doc-viewer'), { ssr: false })

//const DocViewerRenderers = dynamic(() =>
  //import('react-doc-viewer').then(module => module.DocViewerRenderers), {ssr:false});

import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

import VoucherButton from '../../components/voucherButton'

//incorporamos cambios de hector y karen
//librerias para trabajar con alertas 
import { ToastContainer, toast ,Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



// trabajando en payments
import {getAllPatientsIds,
        getPaymentsByPatientId,
        getAppointmentsByPatientId,
        getPatientById,
        getDentistById,
        postPayment

      } from '../../lib/api'
dayjs.extend(utc)

export async function getStaticPaths () {
  const ids = await getAllPatientsIds()
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
  const payments = await getPaymentsByPatientId(id)
  const appointments = await getAppointmentsByPatientId(id)
  const patient = await getPatientById(id)
  console.log(patient)
  const idDentist = patient.idDentist
  const dentistInfo = await getDentistById(idDentist)
  return {
    props: {
      payments,
      appointments,
      patient,
      dentistInfo
    }
  }
}

export default function Payments ({payments,appointments,patient,dentistInfo}) {
  useAvailableToken()
    //hook para traernos el id y el rol del usuario
    const [id,rol] = useUserInfo()
    console.log('el id del usuario es ',id)
    console.log('el rol del usuario es ',rol)


  // const [payments,setPayments] = useState(null)
  // const [appointments,setAppointmens] = useState(null)
  // const [patient,setPatient] = useState(null)

  
  // const router = useRouter()
  // useEffect(() => {
  //   if(!router.isReady) return
  //   (async () => {
  //     try{
  //       const idPatient = router.query.id
  //       const fetchedPayments = await api.getPaymentsByPatientId(idPatient)
  //       setPayments(fetchedPayments)
  //       const fetchedAppointmens = await api.getAppointmentsByPatientId(idPatient)
  //       setAppointmens(fetchedAppointmens)
  //       const fetchedPatient = await api.getPatientsById(idPatient)
  //       setPatient(fetchedPatient)
  //     }
  //     catch(error){
  //       console.log(error)
  //     }
  //     })()
  // },[router.isReady])



  

  // console.log(`los pagos son: ${payments}`)
  // console.log(`los citas son: ${appointments}`)
  // console.log(router.query)
  // const idPatient = router.query.id
  // console.log(`el id de paciente es ${idPatient}`)
  // const idDentist = router.query.idDentist
  // console.log(`el id de odontologo es ${idDentist}`)

  //console.log('pagos: ', payments)
  //console.log('citas: ', appointments)
  //console.log('paciente: ', patient)
  const {_id:idPatient,idDentist,name:pacientName,lastName:pacientLastName,userImage:pacientImage} = patient
  console.log(idPatient,idDentist)
  //informacion del dentista 
  const {name,userImage} = dentistInfo
  console.log(name,userImage) 


  

  //hook para subir archivos a s3
  // const { FileInput, openFileDialog, uploadToS3 } = useS3Upload()

   const [dynamicPayments, setDynamicPayments] = useState(payments)
   const [payment, setPayment] = useState({ total: '', date: '', receipt: '', idPatient, idDentist })
  // console.log(dynamicPayments)
   const fullPrice = getFullPrice(appointments)
   const [remaningPrice, setRemaningPrice] = useState(fullPrice - getPaidOut(dynamicPayments))
   
   const [initial, setInitial] = useState(false)
   const [error, setError] = useState(true)
   const [errorDate, setErrorDate] = useState(true)

   const [currentPayment, setCurrentPayment] = useState(null)
   const [visible, setVisible] = useState(false)

   const [toMuchPayment,setToMuchPayment] = useState(false)


  //logica para crear el arreglo de cards del carrusel
  const cardsInfo = []
  appointments.forEach(appointment => {
    const now = dayjs.utc()
    const appointmentDate = dayjs.utc(appointment.date)
    appointment.procedures.forEach(procedure => {
      appointmentDate >= now && cardsInfo.push({ title: appointmentDate.locale('es').format('dddd D MMMM'), subtitle: procedure.name })
    })
  })

    console.log(dynamicPayments)



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

   const notifyPayment = () => toast.success('Pago agregado', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    icon:false
    });


   async function handlePayment () {
     setInitial(true)
     payment.total = Number(payment.total)
     payment.date = new Date(payment.date)
     if(fullPrice-getPaidOut(dynamicPayments)-payment.total <0){
       console.log('no puedes pagar mas de lo que debes')
       setToMuchPayment(true)
       setTimeout(()=>{
          setToMuchPayment(false)
       },1000)
     }
     else{
      
      await postPayment(payment)
      notifyPayment()
      const newPayments = await getPaymentsByPatientId(idPatient)
      console.log(newPayments)
      setDynamicPayments(newPayments)
     }
}

  // // agregamos el manejador de la subida del archivo
  // const handleFileChange = async file => {
  //   const { url } = await uploadToS3(file)
  //   console.log(url)
  //   setFile(url)
  //   // payments[indexPaymentToUpdate].receipt = url
  //   // console.log(payments[indexPaymentToUpdate])

  //   // console.log('el id del pago que quires actualizar es: ', idPaymentPatched)
  //   // console.log('el documento que quieres subir es: ',url)
	//   }

  // function updatePayment (event) {
  //   const { id } = event.target
  //   console.log(event.target.id)
  //   console.log(file)
  //   setIndexPaymentToUpdate(id)
  // }

   function handleSeeFile (receipt) {
     setCurrentPayment(receipt)
     console.log(`el documento que quieres mostrar es: ${receipt}`)
     setVisible(true)
    }

  // useEffect(async () => {
  //   await api.patchPayment(indexPaymentToUpdate, { receipt: file })
  // }, [file])

  useEffect(() => {
     setRemaningPrice(fullPrice - getPaidOut(dynamicPayments))
 }, [dynamicPayments])

//   if(!payments && !appointments && !patient){
//     return <h1> no hay info</h1>
//   }
//   else{
     return ( 
      <>
      <div className='flex flex-col sm:flex-row '>
        <NavBarDentist
          rol={rol}
          isHome={false}
          idPatient={idPatient}
          idDentist={idDentist}
          name={rol=='paciente'?pacientName:name}
          image={rol=='paciente'?pacientImage:userImage}
        

        />
        <main className='flex justify-center flex-grow sm:w-65vw mx-11'>
          <div className='flex flex-col items-center max-w-screen-lg '>
            <TitleHeader
              pageTitle='Paciente'
              patientName={pacientName}
              patientLastName={pacientLastName}
              patientImage={pacientImage}
            />
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
                
                {rol=='dentista' &&
                  <button
                  disabled={errorDate}
                  onClick={handlePayment}
                  className={`text-white ${error ? 'bg-lighter-gray' : 'bg-plover-blue'}  rounded my-1 px-5 py-1`}
                >Agregar pago
                </button>}
                {toMuchPayment && <div className='text-sm text-plover-blue '>No puedes pagar mas de lo que debes</div>}
              </div>
              <div className='grid grid-cols-5 gap-x-5 place-items-stretch'>
                {rol=='dentista' && <>
                <div className='col-span-2 flex flex-col'>
                  <FormInput textLabel='Monto' textName='total' textValue={payment.total} inputID='Monto' handleChange={handleChange} handleBlur={() => console.log('blur')} />
                  {initial && error && <div className='text-sm text-plover-blue -mt-5'>Ingresa el costo </div>}
                </div>
                <div className='col-span-2  flex flex-col justify-end items-center pb-4'>
                  <label className='text-plover-blue text-sm pb-2 self-start' htmlFor='calendar'>
                    Fecha
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
                </>}
                {rol=='paciente' && <>
                <div className='col-span-2 text-plover-blue text-sm pt-5 rounded ml-1 py-1.5 px-1 w-full'>Monto</div>
                <div className='col-span-2 text-plover-blue text-sm pt-5 rounded ml-1 py-1.5 px-1 w-full'>Fecha</div>
                </>}
                <div className='text-plover-blue text-sm pt-5 rounded ml-1 py-1.5 px-1 w-full'>Comprobante</div>
                {!!dynamicPayments.lenght && (<div>aun no tienes pagos</div>)}
                {!dynamicPayments.lenght && dynamicPayments.map((item, key) => {
								  return (
  <React.Fragment key={key}>
    <div className='col-span-2'><PlainText text={item.total} /></div>
    <div className='col-span-2'><PlainText text={new Date(item.date).toLocaleDateString()} /></div>
    <VoucherButton
      rol={rol}
      payment={item}
      handleSeeFile={handleSeeFile}
    />
    
  </React.Fragment>
								  )
                })}
              </div>
            </div>
          </div>
        </main>
        <ToastContainer
          toastStyle={{backgroundColor:'#EDF5FC'}}
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          transition={Zoom}
        />
      </div>
    {/*aqui va la logica para mostrar el documento*/}
   {visible && (
        <>
          <div className='z-40 bg-plover-blue bg-opacity-25 w-full h-100vh fixed top-0 border border-red-500'>
            <DocViewer
              style={{ width: '100vw', height: '100vh' }}
              documents={[{ uri: currentPayment }]}
              pluginRenderers={DocViewerRenderers}
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
