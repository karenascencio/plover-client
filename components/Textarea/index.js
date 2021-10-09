import React from 'react'

export default function Textarea (props) {
  const { textName, textLabel, textValue, inputId, handleChange, handleBlur } = props
  return (
    <div className='my-5 flex flex-col flex-auto'>
      <label
        className='text-sm text-plover-blue mb-2.5'
        htmlFor={`${inputId}-input`}
      >{textLabel}
      </label>
      <textarea
        className='p-2.5 text-base border-b border-lighter-gray text-darker-gray bg-light-blue focus:outline-none'
        name={textName}
        id={`${inputId}-input`}
        placeholder='Escribe algo...'
        value={textValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  )
}
