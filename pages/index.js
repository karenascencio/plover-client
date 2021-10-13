import React, { useState } from 'react'
import { useRouter } from 'next/router'

// .: Components
import H1 from '../components/H1'
import H3 from '../components/H3'
import HomeSection from '../components/HomeSection'
import NavBarHome from '../components/NavBarHome'
// .: Images
import logo from '../public/logo.svg'

export default function Landing () {
  return (
    <>
      <NavBarHome />
      <div className='flex flex-wrap justify-center content-evenly m-4'>
        <div className='flex flex-col justify-center text-center bg-red-100 border-black h-auto w-auto'>
          <H1 textTitle='Lorem ipsum dolor sit amet consectetur adipscing' textColor='plover-blue' />
          <H3 textTitle='Aquila Non Capit Muscas' />
        </div>
        <div className='flex flex-col justify-center mb-4 mt-4 lg:ml-8'>
          <input 
            className='h-30px pl-1 text-base rounded text-darker-gray border-b border-lighter-gray bg-light-blue focus:outline-none focus:bg-input-hover focus:text-black'
            placeholder='Ingresa tu email'
          />
          <button
            className=' mt-6 mr-1 w-280px md:w-408px h-30px mb-1 bg-plover-blue hover:bg-blue-700 text-white font-normal rounded'
          >Conozca más</button>
        </div>
      </div>
      <HomeSection image={logo} title='Title' textInfo='Acta est Fabula' />
      <HomeSection image={logo} title='Title' textInfo='Vitam regit fortuna, non sapientia.' />
      <HomeSection image={logo} title='Title' textInfo='Ars longa, vita brevis.' />
      <HomeSection image={logo} title='Title' textInfo='Aut viam inveniam aut faciam-' />
    </>
  )
}
