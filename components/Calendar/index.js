import React, { useState } from 'react'

export default function Calendar () {
  const dateInitializer = () => {
    const initialDate = new Date()
    return initialDate.toDateString()
  }
  const [date, setDate] = useState(dateInitializer())

  const appointmentDate = event => {
    const readableDate = new Date(event.target.value)
    setDate(readableDate.toGMTString())
  }

  return (
    <div className='my-5 text-right'>
      <p className='text-4xl text-lighter-gray font-thin mb-1'>
        {
          date.split(' ').slice(1, 4).join(' ')
        }
      </p>
      <div>
        <label className='text-plover-blue text-base font-thin' htmlFor='calendar'>
          Selecciona una fecha:
        </label>
        <input
          className='text-plover-blue text-base border rounded font-thin ml-1 px-1 hidden'
          type='date'
          onChange={appointmentDate}
          id='calendar'
        />
      </div>
    </div>
  )
}
