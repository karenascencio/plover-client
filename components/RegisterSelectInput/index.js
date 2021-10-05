import React, { useState } from 'react'
import Image from 'next/image'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'

const RegisterSelectInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className=' my-5 flex flex-col flex-auto'>
      <label
        className='text-sm text-bold text-plover-blue mb-2.5'
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <select
        className='h-30px w-280px pl-1 text-plover-blue rounded text-darker-gray border-b border-lighter-gray bg-light-blue focus:outline-none focus:bg-input-hover focus:text-black'
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  )
}

export default RegisterSelectInput
