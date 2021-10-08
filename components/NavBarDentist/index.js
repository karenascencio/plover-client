import React from 'react'
import H1 from '../H1'
import H3 from '../H3'
import Greeting from '../Greeting'
import HamburgerMenu from 'react-hamburger-menu'
import {useState} from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {motion,AnimatePresence} from 'framer-motion'
import Link from 'next/link'
import ProfilePicture from '../ProfilePicture'
import logo from '../../public/logo.svg'
import Image from 'next/image'


export default function NavBarDentist(props) {
    const {isHome,idPatient,idDentist} = props

    const options = [{title:'Home',link:'/'},
                {title:'Agregar cita',link:`/newappointment?idDentist=${idDentist}&idPatient=${idPatient}`},
                {title:'Consultar citas',link:`/patients/${idPatient}`},
                {title:'Historial clínico',link:`/medicalrecords/${idPatient}`},
                {title:'Historial de pagos',link:`/payments/${idPatient}?idDentist=${idDentist}`},
                {title:'Configuración',link:'/configuration '},               
            ]

const optionsHome = [{title:'Home',link:'/'},
                {title:'Configuración ',link:`/configuration/${idDentist}`},               
            ]


    const items = isHome?optionsHome:options


    console.log(isHome)
    const [isOpen,setIsOpen] = useState(false)
    function handleHamburgerMenu(){
        setIsOpen(!isOpen)
    }
    return (   
        <div className='z-50 '>
        
            <div className='sm:sticky top-0 flex flex-row sm:flex-col justify-between sm:justify-start items-center px-080 sm:pt-10 h-20 w-100vw sm:h-100vh sm:w-30vw lg:max-w-18rem xl:max-w-26rem  bg-gradient-to-b from-plover-blue'>
                <div className='flex  '>
                    <H1 textTitle='Plover' textColor='white' />
                </div>
                <ProfilePicture  profilePicture={'https://api.multiavatar.com/jorge%20castuera.png'} />
                <div className='hidden sm:block'><Greeting userName='mariana'/></div>
                
                
                <ul className='mt-10 hidden w-11/12 sm:block max-w-10rem'>
                    {
                        items.map((item,key)=>{
                            return <motion.li 
                                 whileHover={{ scale: 1.2 }}
                                className='mb-5' key={key}><Link href={item.link}><a className='bg-white block text-plover-blue text-center text-sm md:text-base py-1  rounded-lg'>{item.title}</a></Link></motion.li>
                        })
                    }
                </ul>
                <HamburgerMenu className='sm:hidden mr-3'
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
                { isOpen &&(
                    <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={` bg-plover-blue w-100vw text-center  absolute md:hidden`}>
                    {
                        items.map((item,key)=>{
                            return <li className='mb-10' key={key}><Link href={item.link}><a className='text-white text-xl '>{item.title }</a></Link></li>
                        })
                    }
                </motion.ul>)
                }
                </AnimatePresence>
            </div>
            
    )
}
