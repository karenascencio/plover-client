import React from 'react'

export default function SuccessAlert (props) {
  const { closeHandler, textAlert, status, mainColor, bgColor } = props
  return (
    <div className={`w-full bg-${bgColor} text-sm border border-${mainColor} flex justify-between px-0.5 py-1 rounded`}>
      <h4 className={`text-${mainColor} `}><b className='pr-0.5'>{status}</b>{textAlert}</h4>
      <button onClick={closeHandler}>
        <svg xmlns='http://www.w3.org/2000/svg' className={`h-5 w-5 fill-current text-${mainColor} `} fill='none' viewBox='0 0 24 24' stroke='currentColor'>
          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
    </div>
  )
}
