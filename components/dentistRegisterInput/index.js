import React from 'react'

export default function RegisterInput (props) {
  const { textLabel, textValue, inputID, handleChange, handleBlur, textName, typeInput } = props
  return (
    <div className=' my-5 flex flex-col flex-auto'>
      <label
        className='text-sm text-plover-blue mb-2.5'
        htmlFor={`${inputID}-input`}
      >
        {textLabel}
      </label>
      <input
        className='h-30px pl-1 text-base rounded text-darker-gray border-b border-lighter-gray bg-light-blue focus:outline-none focus:bg-lighter-gray focus:text-black'
        name={textName}
        type={typeInput}
        id={`${inputID}-input`}
        value={textValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  )
}