import React from 'react'
import H1 from '../H1'

export default function TitleHeader (props) {
  const { pageTitle, secondaryText, patientName, patientLastName } = props
  return (
    <div className='md:h-20 w-full flex justify-between items-center'>
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
