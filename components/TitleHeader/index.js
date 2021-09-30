import React from 'react'
import H1 from '../H1'

export default function TitleHeader (props) {
  const { pageTitle, secondaryText } = props
  return (
    <div className='h-20 w-full flex justify-between items-center'>
      <H1
        textTitle={pageTitle}
        textColor='plover-blue'
      />
      <p className='text-2xl text-plover-blue'>
        {secondaryText}
      </p>
    </div>
  )
}
