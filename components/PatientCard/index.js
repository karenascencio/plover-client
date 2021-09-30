import React from 'react'
import PatientCardInfo from '../PatientCardInfo'

export default function PatientCard (props) {
  const { patientName, patientImage, key } = props

  return (
    <div className='h-20 w-full border-b border-lighter-gray flex items-center justify-between'>
      <PatientCardInfo
        patientName={patientName}
        patientImage={patientImage}
        id={key}
      />
      <p>
        dummy content
      </p>
    </div>
  )
}
