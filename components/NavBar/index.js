import React from 'react'
import H1 from '../H1'
import H3 from '../H3'
import HamburgerMenu from 'react-hamburger-menu'
import {useState} from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {motion,AnimatePresence} from 'framer-motion'
import Link from 'next/link'
const links = [{title:'Informacion general',link:'/patientform/giform'},
                {title:'Antecedentes familiares',link:'/patientform/fbform'},
               {title:'Antecedentes patologicos',link:'/patientform/pbform'},
                {title:'Antecedentes no-patologicos',link:'/patientform/npbform'},
               
            ]

export default function NavBar() {
    const size = useWindowSize()
    const [isOpen,setIsOpen] = useState(false)
    function handleHamburgerMenu(){
        setIsOpen(!isOpen)
    }
    return (
        <div className=''>
        <div className='sm:sticky top-0 flex flex-row sm:flex-col justify-between sm:justify-start items-center px-080 sm:pt-10 h-20 w-100vw sm:h-100vh sm:w-30vw sm:max-w-sm  bg-plover-blue'>
                <H1 textTitle='Plover' textColor='white' />
                <ul className='mt-10 hidden sm:block '>
                    {
                        links.map((item,key)=>{
                            return <li className='mb-10' key={key}><Link href={`${item.link}`}><a className='text-white text-xl '>{item.title }</a></Link></li>
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
                        links.map((link,key)=>{
                            return <li key ={key} className=''><a className='text-white'></a></li>
                        })
                    }
                </motion.ul>)
                }
                </AnimatePresence>
            </div>
    )
}
