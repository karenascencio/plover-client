import React from 'react'

export default function LoginButtons ({ title, type, buttonHandler }) {
  return (
    <>
      <button onClick={buttonHandler} type={type}  className=' mr-1 w-250px md:w-408px lg:w-539px h-30px mb-1 bg-plover-blue hover:bg-blue-700 text-white font-normal rounded'>
        {title}
      </button>
    </>
  )
}
