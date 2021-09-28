import React from 'react'

export default function H1 (props) {
  const { textTitle, textColor } = props

  return (
    <h1 className={`text-${textColor} font-bold text-4xl`}>
      {textTitle}
    </h1>
  )
}
