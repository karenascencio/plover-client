import React from 'react'
import ChangePicture from '../ChangePicture'

export default function SettingsProfileCard (props) {
  const { userName, profilePicture } = props
  return (
    <div className='py-5 flex flex-col items-center border-b border-lighter-gray'>
      <ChangePicture
        profilePicture={profilePicture}
      />
      <h3 className='text-2xl text-lighter-gray font-light mt-2.5'>
        {userName}
      </h3>
    </div>
  )
}
