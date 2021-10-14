import React from 'react'
import H1 from '../H1'

export default function TitleHeader (props) {
  const { pageTitle, secondaryText, patientName, patientLastName, patientImage } = props
  return (
    pageTitle === 'Paciente'
      ? <div className='my-5 md:my-0 md:h-20 w-full flex justify-between items-center'>
        <H1
          textTitle={pageTitle}
          textColor='plover-blue'
          patientName={patientName}
          patientLastName={patientLastName}
        />
        <img
          className='h-10 w-10 rounded-full hidden md:block object-cover'
          src={patientImage}
          alt='patient-image'
        />
      </div>
      : <div className='my-5 md:my-0 md:h-20 w-full flex justify-between items-center'>
        <H1
          textTitle={pageTitle}
          textColor='plover-blue'
          patientName={patientName}
          patientLastName={patientLastName}
        />
      </div>
  )
}
