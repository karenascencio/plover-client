import React from 'react'

export default function ProfilePicture (props) {
  const { profilePicture } = props
  return (
    <div className='w-36 h-36 mt-10 mb-5 rounded-full hidden sm:block '>
      <img
        className='object-cover w-full h-full rounded-full'
        src={profilePicture}
        alt='pfp'
      />
    </div>
  )
}
