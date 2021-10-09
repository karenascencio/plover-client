import React from 'react'

export default function H1 (props) {
  const { textTitle, textColor, patientName, patientLastName } = props

  return textTitle === 'Paciente'
    ? <div className='flex flex-col lg:flex-row'>
      <h1 className={`text-${textColor} font-bold text-4xl`}>
        {textTitle}
      </h1>
      <p className='text-lighter-gray font-thin text-4xl lg:pl-1 capitalize'>
        {patientName.split(' ', 1).join() + ' ' + patientLastName.split(' ', 1).join()}
      </p>
    </div>
    : <h1 className={`text-${textColor} font-bold text-4xl`}>
      {textTitle}
    </h1>
}
