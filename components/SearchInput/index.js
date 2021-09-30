import React from 'react'

export default function SearchInput (props) {
<<<<<<< HEAD
  const { textPlaceholder, searchInput } = props
=======
  const { textPlaceholder, searchHandler, searchValue } = props
>>>>>>> a6734b24fd866779e29330860116bbe74d0281e0
  return (
    <div className='flex-grow mr-2.5'>
      <label htmlFor='' />
      <input
        type='text'
        className='w-full h-12 pl-1 text-base placeholder-plover-blue text-plover-blue bg-input-gray focus:outline-none'
        placeholder={textPlaceholder}
<<<<<<< HEAD
        onChange={searchInput}
=======
        onChange={searchHandler}
        value={searchValue}
>>>>>>> a6734b24fd866779e29330860116bbe74d0281e0
      />
    </div>
  )
}
