import React from 'react'

export default function PatientCard (props) {
  const { patientName } = props

  return (
    <div className='h-20 border-t border-b border-lighter-gray flex items-center justify-between'>
      {patientName}
    </div>
  )
}
