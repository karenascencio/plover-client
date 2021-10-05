import React from 'react'
// My components
import TitleHeader from '../components/TitleHeader'
import NavBarDentist from '../components/NavBarDentist'
import ChangePicture from '../components/ChangePicture'
import Carrusel from '../components/Carrusel'

export default function Configuration () {
  return (
    <div className='flex flex-col sm:flex-row '>
      <NavBarDentist isHome={true} />
      <main className='flex w-full justify-center flex-grow sm:w-65vw mx-11'>
        <div className='max-w-screen-lg w-full flex flex-col items-center'>
          <TitleHeader
            pageTitle='Configuración'
          />
          <div className='flex justify-center items-center w-full py-5 border-b border-lighter-gray'>
            <ChangePicture
              profilePicture='https://api.multiavatar.com/karen%20ascencio.png'
            />
            <h2 className='text-lighter-gray font-thin text-2xl capitalize'>
              mariana salas
            </h2>
          </div>
        </div>
      </main>
    </div>
  )
}
