import React from 'react'

export default function LoginButtons ({ title }) {
  return (
    <>
      <button className=' mr-1 w-180px h-30px bg-plover-blue hover:bg-blue-700 text-white font-normal rounded'>
        {title}
      </button>
    </>
  )
}
