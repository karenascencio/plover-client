import React from 'react'
import Image from 'next/dist/client/image'

export default function AnotationsCard (props) {
  const { text, label, image } = props
  return (
    <div className=''>
      <p className='text-sm text-plover-blue pt-5 '>{label}</p>
      <div className='border shadow-md flex items-center px-5 py-3 mt-4 mb-5 rounded-lg '>
        <div className='w-full flex flex-col-reverse  sm:flex-row justify-between  items-center p-1'>
          {text && <p className='text-center sm:text-left text-base text-plover-blue mb-1 '>{text}</p>}
          {!text && <p className='text-center sm:text-left text-base text-plover-blue mb-1 '>{'No hay informacion disponible'}</p>}
          {image && <div className='min-w-100px sm:min-w-25% max-w-30%  w-1/3  sm:w-1/5'><Image src={image} /></div>}
        </div>
      </div>
    </div>
  )
}
