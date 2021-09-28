import React from 'react'

export default function Select (props) {
  const { selectID, selectQuestion, outputOptions } = props
  return (
    <div className='flex flex-col my-5'>
      <label
        className='w-full text-sm text-plover-blue mb-2.5'
        htmlFor={`${selectID}-select`}
      >
        {selectQuestion}
      </label>
      <select
        className='w-full h-30px bg-light-blue text-plover-blue text-sm border-b border-lighter-gray'
        id={`${selectID}-select`}
      >
        {
          outputOptions.map((item, index) => {
            return (
              <option
                className='w-full h-30px bg-light-blue text-plover-blue text-sm border-b border-lighter-gray'
                key={index}
                value={item}
              >
                {item}
              </option>
            )
          })
        }
      </select>
    </div>
  )
}
