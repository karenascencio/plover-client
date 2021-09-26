import React from 'react'

export default function H3 (props) {
  const { textTitle, textColor } = props

  return (
    <h3 className={`text-${textColor} text-2xl py-5`}>
      {textTitle}
    </h3>
  )
}
