import {React, useState} from 'react'
import Image from 'next/dist/client/image'

export default function Modal({imagen, closeModal}) {
  

    return (
<div className=' modalBackground flex items-center justify-center fixed left-0 bottom-0 w-full border-black h-full'>
  <div className='flex flex-col justify-center justify-items-center content-center bg-white rounded border-darker-grey border-2 w-1/2'>
  <div className='flex justify-between  p-2  bg-plover-blue h-41px w-676px'>
    <h3 className='flex text-white text-center'>Documentos</h3>
    <button onClick={()=> closeModal(false)} type='button' className='flex'><Image src={imagen} height={25} width={35} /></button>
  </div>
  <div className='flex  justify-center'>  
    <table className='border-collapse justify-self-center table-fixed mt-70px mb-90px border border-darker-gray'>
    <thead className='bg-plover-blue text-white '>
        <tr>
          <th className='w-41px border border-darker-gray ...'>#</th>
          <th className='w-292px border border-darker-gray...'>Documentos</th>
          <th className='w-92px border border-darker-gray...'>Enlaces</th>
          </tr>
    </thead>
    <tbody>
        <tr className='border border-dark-gray'>
          <td className='text-center border border-dark-gray'>1</td>
          <td className='border border-dark-gray'> Foto caries diente 13</td>
          <td className='text-center text-plover-blue' href='#'>Link</td>
        </tr>
        <tr className='border border-dark-gray'>
          <td className='text-center border border-dark-gray'>1</td>
          <td className='border border-dark-gray'> Foto caries diente 13</td>
          <td className='text-center text-plover-blue' href='#'>Link</td>
        </tr>
        <tr className='border border-dark-gray'>
          <td className='text-center border border-dark-gray'>1</td>
          <td className='border border-dark-gray'> Foto caries diente 13</td>
          <td className='text-center text-plover-blue' href='#'>Link</td>
        </tr>
    </tbody>
    </table>
    </div>
  </div>
</div>
    )
}