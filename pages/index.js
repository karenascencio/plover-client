import React from 'react'
import SuccessAlert from '../components/SuccessAlert'
import useAuth from '../hooks/useAuth'

export default function Index () {
  // const tokenJson = useAuth()
  return (
    <>
      <div className='text-plover-blue text-9xl'>
        Welcome to Plover!
      </div>
    </>
  )
}
