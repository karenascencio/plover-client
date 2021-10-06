import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PatientCardInfo (props) {
  const { patientImage, patientName, patientId } = props
  return (
    <div className='flex items-center mb-3 md:mb-0'>
      <img
        src={patientImage}
        alt='dentist-profile'
        className='w-11 md:w-12 h-11 md:h-12 rounded-full object-cover'
      />
      <Link href={`/patients/${patientId}`}>
        <a className='capitalize text-plover-blue text-lg md:text-lg m-2.5'>
          {patientName}
        </a>
      </Link>
    </div>
  )
}
