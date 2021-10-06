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
      <div className='my-10'>
        <label
          className=' text-sm text-plover-blue mb-10px'
          htmlFor={props.id || props.name}
        >
          {label}
        </label>
        <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-280px md:w-408px lg:w-539px border-lighter-gray bg-light-blue focus:outline-none focus:bg-lighter-gray focus:text-black rounded'>
          <Image src={lock} heigth={40} width={40} />
          <input
            className='w-full py-1 pl-1 border-0 focus:outline-none border-lighter-gray bg-light-blue focus:outline-none focus:bg-lighter-gray'
            type={showPassword ? 'text' : 'password'}
            {...field}
            {...props}
          />
          <a className='flex' onClick={() => setShowPassword(!showPassword)}><Image src={showPassword ? showpsw : hidepsw} heigth={45} width={45} /></a>

        </div>
        {meta.touched && meta.error ? (
          <div className='text-red-500 bg-red-200 text-center rounded'>{meta.error}</div>
        ) : null}
      </div>
    </>
  )
}
export default PasswordInput
