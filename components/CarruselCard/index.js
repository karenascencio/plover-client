import React from 'react'

export default function CarruselCard (props) {
  const { title, subtitle, thirdTitle } = props
  return (
    <div className='flex justify-center items-center border bg-white shadow-xl h-90px mx-30px my-5 rounded-lg'>
      <div className='flex flex-col'>
        <p className='text-14px text-plover-blue'>{title}</p>
        <p className='text-10px text-lighter-gray'>{subtitle}</p>
        <p className='text-10px text-darker-gray'>{thirdTitle}</p>
      </div>
    </div>
  )
}
