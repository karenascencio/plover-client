import React, { useState } from 'react'
import Image from 'next/image'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
// .: images
import lock from '../../public/lock.svg'
import showpsw from '../../public/showpsw.svg'
import hidepsw from '../../public/hidepsw.svg'

const PasswordInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  const [showPassword, setShowPassword] = useState(false)
  return (
    <>
      <div className='my-10 w-auto'>
        <div className='flex content-center w-auto mb-10px'>
          <Image className='' src={lock} heigth={40} width={40} />
          <label
            className=' text-sm text-plover-blue  w-280px'
            htmlFor={props.id || props.name}
          >
            {label}
          </label>
        </div>
        <div className='flex justify-center justify-items-start border-b-2 mb-1 border-black w-280px md:w-408px lg:w-539px border-lighter-gray bg-light-blue focus:outline-none focus:bg-lighter-gray focus:text-black rounded'>
          <input
            className='w-full py-1 pl-1 border-0 border-lighter-gray bg-light-blue focus:outline-none focus:bg-input-hover'
            type={showPassword ? 'text' : 'password'}
            {...field}
            {...props}
          />
          <a className='flex' onClick={() => setShowPassword(!showPassword)}><Image src={showPassword ? showpsw : hidepsw} heigth={45} width={45} /></a>

        </div>
        {meta.touched && meta.error ? <div className='flex justify-center text-red-500  bg-red-200 text-center rounded p-1 w-280px md:w-408px lg:w-539px'>{meta.error}</div> : null}
      </div>
    </>
  )
}
export default PasswordInput
