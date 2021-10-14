import React, { useState } from 'react'
import dayjs from 'dayjs'
import 'dayjs/locale/es'
import utc from 'dayjs/plugin/utc' 

dayjs.extend(utc) 

export default function Calendar (props) {
  const { value, handleChange, name } = props
  const dateInitializer = (value) => {
    const initialDate = dayjs.utc(value)
    return initialDate
  }
  const [date, setDate] = useState(dateInitializer(value))

  const appointmentDate = event => {
    const readableDate = dayjs.utc(event.target.value)
    setDate(readableDate)
  }

  return (
    <div className='my-5 text-right'>
      <p className='text-4xl text-lighter-gray font-thin mb-1'>
        {
          
          date.locale('es').format('dddd D MMMM')
        }
      </p>
      <div>
        <label className='text-plover-blue text-base font-thin' htmlFor='calendar'>
          Selecciona una fecha:
        </label>
        <input
          className='text-plover-blue text-base border rounded font-thin ml-1 px-1'
          type='date'
          name={name}
          onChange={(event) => { appointmentDate(event); handleChange(event) }}
          value={value}
          id='calendar'
        />
      </div>
    </div>
  )
}
