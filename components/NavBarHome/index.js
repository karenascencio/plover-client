import React, { useState } from 'react'
import H1 from '../H1'
import Greeting from '../Greeting'
import HamburgerMenu from 'react-hamburger-menu'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function NavBarHome () {
  // const { isHome, idPatient, idDentist, name } = props

  const optionsHome = [{ title: 'Iniciar sesión', link: '/login' },
    { title: 'Registrarse', link: '/dentist-register' }
  ]

  // const items = isHome ? optionsHome : options

  const [isOpen, setIsOpen] = useState(false)
  function handleHamburgerMenu () {
    setIsOpen(!isOpen)
  }
  return (
    <div className='z-40 '>
      <div className='flex justify-between items-center h-20 md:w-screen bg-plover-blue'>
        <div className='flex pl-1'>
          <H1 textTitle='Plover' textColor='white' />
        </div>

        <div className='w-280px'>
        <ul className='flex  justify-evenly invisible md:visible'>
          {
                        optionsHome.map((item, key) => {
                          return (
                            <motion.li
                              whileHover={{ scale: 1.2 }}
                              className='' key={key}
                            ><Link href={item.link}><a className='bg-white block text-plover-blue text-center text-sm p-1 rounded'>{item.title}</a></Link>
                            </motion.li>
                          )
                        })
                    }
        </ul>
        </div>
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
                          optionsHome.map((item, key) => {
                            return <li className='mb-10' key={key}><Link href={item.link}><a className='text-white text-xl '>{item.title}</a></Link></li>
                          })
                    }
          </motion.ul>)}
      </AnimatePresence>
    </div>

  )
}
