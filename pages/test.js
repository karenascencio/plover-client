import React, { useState } from 'react'
import Image from 'next/image'
import ReactDOM from 'react-dom'
import { Formik, Form, useField } from 'formik'
import * as Yup from 'yup'
import lock from '../public/lock.svg'
import showpsw from '../public/showpsw.svg'
import hidepsw from '../public/hidepsw.svg'
// import PasswordInput from '../components/PasswordInput'

const RegisterInput = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className=' my-5 flex flex-col flex-auto'>
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

const MyTextInput = ({ label, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
  // which we can spread on <input>. We can use field meta to show an error
  // message if the field is invalid and it has been touched (i.e. visited)
  const [field, meta] = useField(props)
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className='text-input' {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </>
  )
}

const MySelect = ({ label, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className='error'>{meta.error}</div>
      ) : null}
    </div>
  )
}

// And now we can use these
export default function SignupForm () {
  return (
    <>
      <h1>Subscribe!</h1>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          acceptedTerms: false, // added for our checkbox
          jobType: '' // added for our
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          name: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          lastName: Yup.string()
            .max(20, 'Must be 20 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          jobType: Yup.string()
            .oneOf(
              ['designer', 'development', 'product', 'other'],
              'Invalid Job Type'
            )
            .required('Required')
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            setSubmitting(false)
          }, 400)
        }}
      >
        <Form>
          <div>
            <MyTextInput
              label='First Name'
              name='firstName'
              type='text'
              placeholder='Jane'
            />
            <RegisterInput
              label='Nombre'
              name='name'
              type='text'
              placeholder='Pluvianus'
            />
            <MyTextInput
              label='Last Name'
              name='lastName'
              type='text'
              placeholder='Doe'
            />

            <MyTextInput
              label='Email Address'
              name='email'
              type='email'
              placeholder='jane@formik.com'
            />

            <MySelect label='Job Type' name='jobType'>
              <option value=''>Select a job type</option>
              <option value='designer'>Designer</option>
              <option value='development'>Developer</option>
              <option value='product'>Product Manager</option>
              <option value='other'>Other</option>
            </MySelect>
            <button type='submit'>Submit</button>
          </div>
        </Form>
      </Formik>
    </>
  )
};
