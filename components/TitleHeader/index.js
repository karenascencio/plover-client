import React from 'react'
import H1 from '../H1'

export default function TitleHeader (props) {
  const { pageTitle, secondaryText, patientName, patientLastName, patientImage } = props
  return (
    pageTitle === 'Paciente'
      ? <div className='md:h-20 w-full flex justify-between items-center'>
        <H1
          textTitle={pageTitle}
          textColor='plover-blue'
          patientName={patientName}
          patientLastName={patientLastName}
        />
        <img
          className='h-10 w-10 rounded-full'
          src={patientImage}
          alt='patient-image'
        />
        </div>
      : <div className='md:h-20 w-full flex justify-between items-center'>
        <H1
          textTitle={pageTitle}
          textColor='plover-blue'
          patientName={patientName}
          patientLastName={patientLastName}
        />
        <p className='text-2xl text-plover-blue'>
          {secondaryText}
        </p>
        </div>
  )
}
