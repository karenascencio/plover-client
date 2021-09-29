import React from 'react'

export default function PlainText (props) {
  const { text } = props
  return (
    <div className='pl-1 h-30px flex items-end border-b border-lighter-gray '>
      <p className='text-base text-plover-blue mb-1'>
        {text}
      </p>
    </div>
  )
}
