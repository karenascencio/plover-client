import React from 'react'
import SuccessAlert from '../components/SuccessAlert'
import useSWR from 'swr'
import { getDentistById } from '../lib/api'
import { useAuth } from '../lib/Hooks'

export default function Index () {
  const idDentist = useAuth()

  const fetcher = async () => {
    const data = getDentistById('61511d3cf6273ea718ebd5f4')
    return data
  }

  const { data, error } = useSWR('patientInfo', fetcher)

  if (error) {
    return (
      <h1 className='text-9xl text-red-700'>
        Error!
      </h1>
    )
  }

  if (!data) {
    return (
      <h1 className='text-9xl text-green-500'>
        Loading...
      </h1>
    )
  }
  return (
    <h1 className='text-9xl text-plover-blue capitalize'>
      {data.name}
    </h1>
  )

  // return (
  //   <>
  //     <div className='text-plover-blue text-9xl'>
  //       Welcome to Plover!
  //     </div>
  //     <SuccessAlert
  //       textAlert='Tu información fue actualizada correctamente.'
  //       status='¡Éxito!'
  //       mainColor='plover-blue'
  //       bgColor='light-blue'
  //     />
  //     <SuccessAlert
  //       textAlert='Tu información no fue actualizada correctamente, intenta de nuevo.'
  //       status='¡Error!'
  //       mainColor='red-700'
  //       bgColor='red-100'
  //     />
  //   </>
  // )
}
