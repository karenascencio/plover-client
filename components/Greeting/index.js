import React from 'react'

export default function Greeting (props) {
  const { userName,rol } = props
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-2xl text-white'>
        Hola,
      </h2>
      <p className='text-2xl text-white font-semibold capitalize'>
        {rol=='dentista' ? `Dr. ${userName}!` : `${userName}`}
      </p>
    </div>
  )
}
