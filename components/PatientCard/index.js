import React from 'react'
import PatientCardInfo from '../PatientCardInfo'

export default function PatientCard (props) {
  const { patientName, patientImage, patientId } = props

  return (
    <div className='h-20 w-full border-b border-lighter-gray flex items-center justify-between'>
      <PatientCardInfo
        patientName={patientName}
        patientImage={patientImage}
        patientId={patientId}
      />
      <p>
        dummy content
      </p>
    </div>
  )
}
