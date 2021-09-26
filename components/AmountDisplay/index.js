import React from 'react'

export default function AmountDisplay (props) {
  const { totalAmount, remaining } = props
  return (
    <div className='my-5 text-right'>
      <p className='text-4xl text-lighter-gray font-thin mb-1'>
        ${totalAmount}
      </p>
      <p className='text-plover-blue text-base font-thin'>
        Saldo restante: ${remaining}
      </p>
    </div>
  )
}
