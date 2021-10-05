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
      <div className='flex justify-center justify-items-start mt-50px mb-50px border-b-2 mb-4 border-black w-280px md:w-408px lg:w-539px'>
        <Image src={lock} heigth={40} width={40} />
        <input
          className='w-full py-1 pl-1 border-0 focus:outline-none'
          type={showPassword ? 'text' : 'password'}
          {...field}
          {...props}
        />
        <button onClick={() => setShowPassword(!showPassword)}><Image src={showPassword ? showpsw : hidepsw} heigth={45} width={45} /></button>

      </div>
      {meta.touched && meta.error ? (
        <div className='text-red-500 bg-red-200 text-center rounded'>{meta.error}</div>
      ) : null}
    </>
  )
}
export default PasswordInput
