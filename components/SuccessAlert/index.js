import React from 'react'

export default function SuccessAlert (props) {
  const { closeHandler, textAlert, status, mainColor, bgColor } = props
  return (
    <div className={`w-full bg-${bgColor} border border-${mainColor} text${mainColor} flex justify-between px-0.5 py-1`}>
      <h4><b>{status}!</b>{textAlert}</h4>
      <button onClick={closeHandler}>
        <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 fill-current text-white ' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
    </div>
  )
}
