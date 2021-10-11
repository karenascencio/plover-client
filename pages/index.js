import React from 'react'
import SuccessAlert from '../components/SuccessAlert'
import useAuth from '../hooks/useAuth'

export default function Index () {
  const tokenJson = useAuth()
  return (
    <>
      <div className='text-plover-blue text-9xl'>
        Welcome to Plover!
      </div>
      <SuccessAlert
        textAlert='Tu información fue actualizada correctamente.'
        status='¡Éxito!'
        mainColor='plover-blue'
        bgColor='light-blue'
      />
      <SuccessAlert
        textAlert='Tu información no fue actualizada correctamente, intenta de nuevo.'
        status='¡Error!'
        mainColor='red-700'
        bgColor='red-100'
      />
    </>
  )
}
