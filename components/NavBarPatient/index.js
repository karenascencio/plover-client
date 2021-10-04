import React from 'react'
import H1 from '../H1'
import H3 from '../H3'
import HamburgerMenu from 'react-hamburger-menu'
import {useState} from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {motion,AnimatePresence} from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'
import logo from '../../public/logo.svg'
import Image from 'next/image'

const forms = [{title:'Informacion general',form:'General Information'},
                {title:'Antecedentes familiares',form:'Family Background'},
               {title:'Antecedentes patologicos',form:'Pathological Background'},
                {title:'Antecedentes no-patologicos',form:'NonPathological Background'},
               
            ]

export default function NavBarPatient(props) {
    const {formulario,handleOption} = props

    const [isOpen,setIsOpen] = useState(false)
    function handleHamburgerMenu(){
        setIsOpen(!isOpen)
    }
    return (
        <div className='z-50'>
     
        <div className='sm:sticky top-0 flex flex-row sm:flex-col justify-between sm:justify-start items-center px-080 sm:pt-10 h-20 w-100vw sm:h-100vh sm:w-30vw sm:max-w-sm lg:max-w-18rem xl:max-w-26rem  bg-plover-blue'>
                <div className='flex flex-col '>
                    <div className='mt-5'><H1 textTitle='Plover' textColor='white' /></div>
                </div>
                <ul className='mt-10 hidden sm:flex sm:flex-col sm:justify-around sm:items-center h-80 '>
                    {
                        forms.map((item,key)=>{
                            return <li className='mb-10 ' key={key}><button onClick={(()=>handleOption(item.form))} className='text-white text-lg '>{item.title }</button></li>
                        })
                    }
                </ul>
                <Link href='/'><a className='w-11/12 sm:block max-w-10rem bg-white block text-plover-blue text-center text-sm md:text-base py-1   rounded-lg'>Home</a></Link>
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
                        forms.map((item,key)=>{
                            return <li className='mb-10' key={key}><button onClick={(()=>handleForm(item.form))} className='text-white text-xl '>{item.title }</button></li>
                        })
                    }
                </motion.ul>)
                }
                </AnimatePresence>
            </div>
       
    )
}
