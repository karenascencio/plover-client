import React from 'react'
import { useS3Upload } from 'next-s3-upload'

export default function ChangePicture (props) {
  const { FileInput } = useS3Upload()
  const { profilePicture, uploadHandler, buttonHandler } = props
  return (
    <div className='w-034 h-034 relative'>
      <img
        className='w-full h-full rounded-full object-cover'
        src={profilePicture}
        alt='pfp'
      />
      <label
        htmlFor='profile-picture'
      >
        <button
          onClick={buttonHandler}
          className='absolute bottom-0 right-0 bg-input-gray h-8-5 w-8-5 rounded-full cursor-pointer flex justify-center items-center'
        >
          <svg width='17' height='17' viewBox='0 0 19 19' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path d='M16 5V7.99C16 7.99 14.01 8 14 7.99V5H11C11 5 11.01 3.01 11 3H14V0H16V3H19V5H16ZM13 9V6H10V3H2C0.9 3 0 3.9 0 5V17C0 18.1 0.9 19 2 19H14C15.1 19 16 18.1 16 17V9H13ZM2 17L5 13L7 16L10 12L14 17H2Z' fill='#274C77' />
          </svg>
        </button>
      </label>
      <FileInput
        className='hidden'
        type='file'
        id='profile-picture'
        onChange={uploadHandler}
      />
    </div>
  )
}
