import React, { useState } from 'react'
import H1 from '../H1'
import H3 from '../H3'
import Greeting from '../Greeting'
import HamburgerMenu from 'react-hamburger-menu'
import useWindowSize from '../../hooks/useWindowSize'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import ProfilePicture from '../ProfilePicture'
import logo from '../../public/logo.svg'
import Image from 'next/image'
import LogOutButton from '../LogOutButton'
import ploverLogo from '../../public/plover-logo.png'


export default function NavBarDentist (props) {
  const { isHome, idPatient, idDentist, image,name,rol } = props

  const options = [
    { title: 'Home', link: `/dentists/${idDentist}` },
    { title: 'Agregar cita', link: `/newappointment?idDentist=${idDentist}&idPatient=${idPatient}` },
    { title: 'Consultar citas', link: `/patients/${idPatient}` },
    { title: 'Historial clínico', link: `/medicalrecords/${idPatient}` },
    { title: 'Historial de pagos', link: `/payments/${idPatient}` },
    { title: 'Configuración', link: `/configuration/${idDentist} ` }
  ]

  const optionsHome = [
    { title: 'Home', link: `/dentists/${idDentist}` },
    { title: 'Configuración ', link: `/configuration/${idDentist}` }
  ]

  const optionsPatient = [
    { title: 'Home', link: `/patients/${idPatient}` },
    { title: 'Consultar citas', link: `/patients/${idPatient}` },
    { title: 'Historial clínico', link: `/medicalrecords/${idPatient}` },
    { title: 'Historial de pagos', link: `/payments/${idPatient}` },
    { title: 'Configuración', link: `/patientconfiguration/${idPatient}`}
    // { title: 'Configuración', link: `/configuration/${idDentist} ` }

  ]
  
  //const items = isHome ? optionsHome : options    
  let items
  if(isHome==true){
    console.log('estamos en home')
    items = optionsHome
  }
  else if(isHome==false){
    items=options
  }
  if(rol=='paciente'){
    items=optionsPatient
  }

  console.log(isHome)
  const [isOpen, setIsOpen] = useState(false)
  function handleHamburgerMenu () {
    setIsOpen(!isOpen)
  }
  //arreglaremos el navBar de denstista
  console.log('el rol desde el navBar es: ',rol)
  return (
    <div className='z-50 sm:absolute'>
      <div className='sm:fixed flex flex-row sm:flex-col justify-between sm:justify-start items-center px-080 sm:pt-10 h-20 w-100vw sm:h-100% sm:w-30vw sm:max-w-sm lg:max-w-18rem xl:max-w-26rem  bg-plover-blue'>
        <div className='h-16 flex justify-center'>
          <div className='hidden md:block h-16 w-015 mr-3'>
            <Image src={ploverLogo} />
          </div>
          <p
            className='mt-2 sm:mt-0 text-white text-3xl md:text-5xl font-thin '
          >
            Plover
          </p>
        </div>
        <ProfilePicture profilePicture={image?image:''} />
        <div className='hidden sm:block'><Greeting userName={name?name.split(' ')[0]:'fulano'} rol={rol}/></div>

        <ul className='mt-10 hidden w-11/12 sm:block max-w-10rem'>
          {
                        items.map((item, key) => {
                          return (
                            <motion.li
                              whileHover={{ scale: 1.2 }}
                              className='mb-5' key={key}
                            ><Link href={item.link}><a className='bg-white block text-plover-blue text-center text-sm md:text-base py-1  rounded-lg'>{item.title}</a></Link>
                            </motion.li>
                          )
                        })
                    }
            <motion.li
               whileHover={{ scale: 1.2 }}
            > <LogOutButton /></motion.li>
        </ul>
       
        <HamburgerMenu
          className='sm:hidden mr-3'
          isOpen={isOpen}
          menuClicked={handleHamburgerMenu}
          width={18}
          height={15}
          strokeWidth={2}
          rotate={0}
          color='white'
          borderRadius={0}
          animationDuration={0.5}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className=' bg-plover-blue w-100vw text-center  absolute md:hidden'
          >
            {
                        items.map((item, key) => {
                          return <li className='mb-10' key={key}><Link href={item.link}><a className='text-white text-xl '>{item.title}</a></Link></li>
                        })
                    }
          </motion.ul>)}
      </AnimatePresence>
    </div>

  )
}
