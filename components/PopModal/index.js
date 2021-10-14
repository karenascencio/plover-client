import { React, useState } from 'react'
import Image from 'next/dist/client/image'

export default function PopModal ({ image, closeModal }) {
  return (
    <div className=' modalBackground flex items-center justify-center fixed left-0 bottom-0 w-full border-black h-full'>
      <div className='flex flex-col justify-center justify-items-center content-center bg-white rounded border-darker-grey border-2 w-280px'>
        <div className='flex justify-middle  p-2  bg-login-blue h-41px w-676px'>
          <h3 className='flex text-white text-center'>Alerta</h3>
          <button onClick={() => closeModal(false)} type='button' className='flex'><Image src={image} height={25} width={35} /></button>
        </div>

        <div className='flex  justify-center' />
      </div>
    </div>
  )
}
