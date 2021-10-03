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



export default function NavBarDentist(props) {
    const {isHome,idPatient,idDentist} = props

    const options = [{title:'Home',link:'/'},
                {title:'Agregar cita',link:`/newappointment?dentistid=${idDentist}&patientid=${idPatient}`},
               {title:'Consultar citas',link:`/patients/${idPatient}`},
                {title:'Historial clínico',link:`/medicalrecord/${idPatient}`},
                {title:'Historial de pagos',link:`/payments/${idPatient}?dentistId=${idDentist}`},
                {title:'Configuración',link:'/configuration '},               
            ]

const optionsHome = [{title:'Home',link:'/'},
                {title:'Configuracion',link:`/configuration/${idDentist}`},               
            ]


    const items = isHome?optionsHome:options


    console.log(isHome)
    const [isOpen,setIsOpen] = useState(false)
    function handleHamburgerMenu(){
        setIsOpen(!isOpen)
    }
    return (

        <div className='z-50'>
            <div className='sm:sticky top-0 flex flex-row sm:flex-col justify-between sm:justify-start items-center px-080 sm:pt-10 h-20 w-100vw sm:h-100vh sm:w-30vw sm:max-w-sm  bg-plover-blue'>
                <H1 textTitle='Plover' textColor='white' />

                <ProfilePicture  profilePicture={'https://api.multiavatar.com/jorge%20castuera.png'} />
                <div className='hidden sm:block'><Greeting userName='mariana'/></div>
                
                
                <ul className='mt-10 hidden w-11/12 sm:block'>
                    {
                        items.map((item,key)=>{
                            return <li className='mb-6' key={key}><Link href={item.link}><a className='bg-white block text-plover-blue text-center text-xl  py-2 rounded-lg'>{item.title}</a></Link></li>
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
