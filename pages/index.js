import React from 'react'
import SuccessAlert from '../components/SuccessAlert'
import useAvailableToken from '../hooks/useAvailableToken'

export default function Index () {
  useAvailableToken()
  return (
    <>
      <div className='text-plover-blue text-9xl'>
        Welcome to Plover!
      </div>
    </>
  )
}
