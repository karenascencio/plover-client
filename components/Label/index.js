import React from 'react'

export default function Label (props) {
  const { labelText } = props
  return (
    <p className='text-sm text-plover-blue mb-2.5'>
      {labelText}
    </p>
  )
}
