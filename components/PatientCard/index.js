import React from 'react'
import PatientCardInfo from '../PatientCardInfo'

export default function PatientCard (props) {
  const { patientName, dummyContent, patientImage } = props

  return (
    <div className='h-20 border-t border-b border-lighter-gray flex items-center justify-between'>
      <PatientCardInfo
        patientName={patientName}
        patientImage={patientImage}
      />
      {dummyContent}
    </div>
  )
}
