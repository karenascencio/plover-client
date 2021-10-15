import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
// .: Components
import H1 from '../components/H1'
import H3 from '../components/H3'
import HomeSection from '../components/HomeSection'
import NavBarHome from '../components/NavBarHome'
// .: Images
import logo from '../public/logo.svg'
import clinic from '../public/dentist-clinic.png'
import anyDevice from '../public/works-any-device.png'

export default function Landing () {
  return (
    <>
      <NavBarHome />
      <div
        className='flex justify-center w-screen'
      >
        <Image
          src={clinic}
          alt='clinic'
          className='w-full'
        />
      </div>
      <div className='w-full py-20 flex flex-col items-center'>
        <h2 className='text-plover-blue text-4xl md:text-6xl w-6/12 font-semibold text-center'>
          Tus pacientes a un clic de distancia.
        </h2>
        <p className='my-5 text-xl md:text-3xl text-center w-4/5 text-gray-700 font-thin'>
          <span className='text-plover-blue font-medium'>Plover</span> es la herramienta que te ayudará a administrar
          a tus pacientes de una manera sencilla. Así que no más papeleo.
        </p>
      </div>
      <div className='w-full pb-20 flex flex-col items-center'>
        <Image
          src={anyDevice}
          alt='mobile'
          className='w-full'
        />
        <h2 className='text-plover-blue text-4xl md:text-6xl w-6/12 font-semibold text-center'>
          Funciona en todos tus dispositivos.
        </h2>
        <p className='my-5 text-xl md:text-3xl text-center w-4/5 text-gray-700 font-thin'>
          También tus pacientes podrán acceder a toda su información.
        </p>
      </div>
    </>
  )
}
