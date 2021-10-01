import React from 'react'
import Link from 'next/link'

export default function ProcedureCard (props) {
  const { procedureName, procedureDate, procedureStatus, anchor } = props
  return (
    <Link href={`/appointments/${anchor}`}>
      <a className='h-20 w-full border-b border-lighter-gray flex items-center justify-between'>
        <div>
          <p className='text-lg font-lato text-plover-blue capitalize'>
            {procedureName}
          </p>
          <p className='text-xs font-lato text-lighter-gray'>
            {procedureDate}
          </p>
        </div>
        <div>
          <p className='text-lg text-darker-gray capitalize'>
            {procedureStatus}
          </p>
        </div>
      </a>
    </Link>
  )
}
