import React from 'react'
import Image from 'next/image'

export default function PatientCardInfo (props) {
  const { patientImage, patientName } = props
  return (
    <div className='flex items-center'>
      <img
        src={patientImage}
        alt='dentist-profile'
        className='w-050 md:w-060 h-050 md:h-060 rounded-full object-cover'
      />
      <p className='capitalize text-plover-blue text-sm md:text-lg m-2.5'>
        {patientName}
      </p>
    </div>
  )
}
