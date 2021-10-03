import React, { useState } from 'react'

export default function Toggle (props) {
  const {id,handleToggle, disabled} = props
  const [state, setState] = useState(disabled?true:false)

  function handleChange(){
    setState(!state)
    handleToggle(id)
  }
  return (
    <React.Fragment>
      {/* switch */}
      <label
        htmlFor={`toggle-${id}`}
        className={`mb-2 flex lg:justify-around flex-${!state ? 'row' : 'row-reverse'} items-center w-12 md:w-16  lg:w-110px h-8 px-1 transition duration-500 ease-in-out transform bg-${!state ? 'plover-blue' : 'darker-gray'}`}
        style={{ borderRadius: '30px' }}
      >
        {/* checkbox */}
        <input
          id={`toggle-${id}`}
          type='checkbox'
          checked={state}
          onChange={handleChange}
          className='hidden'
          disabled={disabled}
        />
        {/* slider */}
        <div
          className='w-4 h-4 bg-white'
          style={{ borderRadius: '50%' }}
        />
        {state
          ? <span className='hidden lg:block text-sm text-white pb-1'>hecho</span>
          : <span className='hidden lg:block  text-sm text-white pb-1'>pendiente</span>}
      </label>
    </React.Fragment>
  )
}
