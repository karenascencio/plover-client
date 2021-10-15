import React from 'react'
import Image from 'next/dist/client/image'
// My images
import Tootsie from '../../public/nothing-to-see-here.png'

export default function NothingToSee () {
  return (
    <div
      className='w-full flex flex-col justify-center items-center py-8'
    >
      <p
        className='text-plover-blue text-xl md:text-2xl text-center'
      >
        Parece que estás chimuelo de información.
      </p>
      <div className='w-2/6 h-2/6 md:w-1/6 md:h-1/6 mt-5'>
        <Image
          src={Tootsie}
        />
      </div>
    </div>
  )
}
