import React from 'react'

export default function CarruselCard (props) {
  const { name, procedure, date } = props
  return (
    <div className='flex justify-center items-center bg-white shadow h-90px w-full mx-3 rounded-lg'>
      <div className='flex flex-col'>
        <p className='text-14px text-plover-blue'>{name}</p>
        <p className='text-10px text-lighter-gray'>{procedure}</p>
        <p className='text-10px text-darker-gray'>{date}</p>
      </div>
    </div>
  )
}
