import React from 'react'

export default function ProfilePicture (props) {
  const { profilePicture } = props
  return (
    <div className='w-1/2  mt-10 mb-5'>
      <img
        className='w-full rounded-full'
        src={profilePicture}
        alt='pfp'
      />
    </div>
  )
}