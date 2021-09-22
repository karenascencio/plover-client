import React from 'react'
import Image from 'next/image'

export default function PatientCardInfo (props) {
  const { patientImage, patientName } = props
  return (
    <div>
      <img
        src={patientImage} 
        alt='dentist-profile'
        className='w-050 md:w-060 h-050 md:h-060 rounded-full object-cover'
      />
    </div>
  )
}
