import React from 'react'

export default function Greeting (props) {
  const { userName } = props
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-3xl text-plover-blue'>
        Hola,
      </h2>
      <p className='text-3xl text-plover-blue font-semibold'>
        {userName}!
      </p>
    </div>
  )
}
