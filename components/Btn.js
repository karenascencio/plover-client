import React, { useState } from 'react'
import classNames from 'classnames'

export default function Btn ({ onClick, voucherUrl }) {
  const [hasVoucher, setHasVoucher] = useState(false)
  const handleClick = () => {
    setHasVoucher(true)
  }
  return (
    <div onClick={handleClick} className={classNames('bg-blue-300 text-center cursor-pointer')}>
      {!hasVoucher && (
        <p>
          agregar
        </p>
      )}
      {hasVoucher && (
        <p>Mostrar</p>
      )}
    </div>
  )
}
