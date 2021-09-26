import React from 'react'

export default function DateInput (props) {
  const { inputID, textLabel } = props
  return (
    <div className='my-5 flex flex-col flex-auto'>
      <label
        className='text-sm text-plover-blue mb-2.5'
        htmlFor={`${inputID}-input`}
      >
        {textLabel}
      </label>
      <input
        className='h-8 pl-1 text-base text-darker-gray border-b border-lighter-gray bg-light-blue focus:outline-none'
        type='date'
        id={`${inputID}-input`}
      />
    </div>
  )
}
