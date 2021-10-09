import React, { useState } from 'react'
import H1 from '../H1'
import H3 from '../H3'
import HamburgerMenu from 'react-hamburger-menu'

import useWindowSize from '../../hooks/useWindowSize'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import logo from '../../public/logo.svg'
import Image from 'next/image'

const forms = [{ title: 'Informacion general', form: 'General Information' },
  { title: 'Antecedentes familiares', form: 'Family Background' },
  { title: 'Antecedentes patologicos', form: 'Pathological Background' },
  { title: 'Antecedentes no-patologicos', form: 'NonPathological Background' }

]

export default function NavBarPatient (props) {
  const { formulario, handleOption } = props

  const [isOpen, setIsOpen] = useState(false)
  function handleHamburgerMenu () {
    setIsOpen(!isOpen)
  }
  return (
    <div className='z-50 fixed sm:static '>

      <div className='border border-red-500  flex flex-row sm:flex-col justify-between sm:justify-start items-center px-080 sm:pt-10 h-20 w-100vw sm:h-100% sm:w-30vw sm:max-w-sm lg:max-w-18rem xl:max-w-26rem  bg-plover-blue'>
        <div className='flex flex-col items-start'>
          <div className='mt-5'><H1 textTitle='Plover' textColor='white' /></div>
        </div>
        <ul className=' mb-10 mt-20 hidden sm:flex sm:flex-col sm:justify-around sm:items-center h-80 '>
          {forms.map((item, key) => (
            <motion.li
              swhileHover={{ scale: 1.2 }}
              className='mb-10 ' key={key}
            >
              <button
                onClick={(() => handleOption(item.form))}
                className='text-white text-lg '
              >
                {item.title}
              </button>
            </motion.li>
          )
          )}

        </ul>
        <Link href='/'>
          <motion.a
            whileHover={{ scale: 1.2 }}
            className=' w-11/12 hidden sm:block max-w-10rem bg-white block text-plover-blue text-center text-sm md:text-base py-1   rounded-lg'
          >
            Home
          </motion.a>
        </Link>
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
            className='py-5 bg-plover-blue w-100vw text-center  absolute sm:hidden'
          >
            {forms.map((item, key) => (
              <li className='mb-4' key={key}><button onClick={(() => handleOption(item.form))} className='text-white text-base '>{item.title}</button></li>
            ))}
            <li className='mb-4'><Link href='/'><a className='text-white text-base'>Home</a></Link></li>
          </motion.ul>)}
      </AnimatePresence>
    </div>
  )
}
