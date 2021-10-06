import { React, useState } from 'react'
import Image from 'next/dist/client/image'


export default function PopModal ({ imagen, closeModal }) {
  return (
    <div className=' modalBackground flex items-center justify-center fixed left-0 bottom-0 w-full border-black h-full'>
      <div className='flex flex-col justify-center justify-items-center content-center bg-white rounded border-darker-grey border-2 w-1/2'>
        <div className='flex justify-between  p-2  bg-plover-blue h-41px w-676px'>
          <h3 className='flex text-white text-center'>Documentos</h3>
          <button onClick={() => closeModal(false)} type='button' className='flex'><Image src={imagen} height={25} width={35} /></button>
        </div>
        <div className='flex  justify-center' />
      </div>
    </div>
  )
}
