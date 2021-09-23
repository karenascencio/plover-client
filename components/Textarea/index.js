import React from 'react'

export default function Textarea (props) {
  const { textLabel, textareaID } = props
  return (
    <div className='my-5 flex flex-col flex-auto'>
      <label
        className='text-sm text-plover-blue mb-2.5'
        htmlFor={`${textareaID}-input`}
      >{textLabel}
      </label>
      <textarea
        className='p-2.5 text-base border-b border-lighter-gray text-darker-gray bg-light-blue focus:outline-none'
        id={`${textareaID}-input`}
        placeholder='Escribe algo...'
      />
    </div>
  )
}
