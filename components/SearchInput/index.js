import React from 'react'

export default function SearchInput (props) {
  const { textPlaceholder } = props
  return (
    <div>
      <label htmlFor='' />
      <input
        type='text'
        className='h-12 pl-1 text-base placeholder-plover-blue text-plover-blue bg-input-gray focus:outline-none'
        placeholder={textPlaceholder}
      />
    </div>
  )
}
