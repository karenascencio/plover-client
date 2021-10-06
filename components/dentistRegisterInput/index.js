import React, { useState } from 'react'
import Image from 'next/image'
import { Formik, Form, useField} from 'formik'
import * as Yup from 'yup'

const RegisterInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className='w-280px md:w-408px lg:w-539px my-5 flex flex-col flex-auto'>
      <label
        className='text-sm text-plover-blue mb-2.5'
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className='h-30px pl-1 text-base rounded text-darker-gray border-b border-lighter-gray bg-light-blue focus:outline-none focus:bg-lighter-gray focus:text-black'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='text-red-500 bg-red-200 text-center rounded'>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default RegisterInput