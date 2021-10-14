import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function PatientCardInfo (props) {
  const { patientImage, patientName, idPatient } = props
  return (
    <div className='min-w-200 md:min-w-0 flex justify-between md:justify-start items-center'>
      <img
        src={patientImage}
        alt='dentist-profile'
        className='w-11 md:w-12 h-11 md:h-12 rounded-full object-cover'
      />
      <Link href={`/patients/${idPatient}`}>
        <a className='capitalize text-plover-blue text-lg md:text-lg md:ml-2.5'>
          {patientName}
        </a>
      </Link>
    </div>
  )
}
