import React from 'react'

export default function FormInput (props) {
  const { textLabel, textValue, inputID } = props
  return (
    <div className='my-5 flex flex-col flex-auto'>
      <label
        className='text-sm text-plover-blue mb-2.5'
        htmlFor={`${inputID}-input`}
      >
        {textLabel}
      </label>
      <input
        className='h-30px pl-1 text-base text-darker-gray border-b border-lighter-gray bg-light-blue focus:outline-none'
        type='text'
        id={`${inputID}-input`}
        placeholder={textValue}
        value={textValue}
      />
    </div>
  )
}
