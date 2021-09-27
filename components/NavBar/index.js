import React from 'react'
import H1 from '../H1'
import H3 from '../H3'
import HamburgerMenu from 'react-hamburger-menu'
import {useState} from 'react'
import useWindowSize from '../../hooks/useWindowSize'
import {motion,AnimatePresence} from 'framer-motion'
const links = ['Informacion general',
                'Antecedentes familiares',
               'Antecedentes patologicos',
                'Antecedentes no-patologicos',
                'Documentos'
            ]

export default function NavBar() {
    const size = useWindowSize()
    const [isOpen,setIsOpen] = useState(false)
    function handleHamburgerMenu(){
        setIsOpen(!isOpen)
    }
    return (
        <div className=''>
        <div className='sm:sticky top-0 flex flex-row sm:flex-col justify-between sm:justify-start items-center px-5 sm:pt-10 h-20 w-100vw sm:h-100vh sm:w-30vw sm:max-w-sm  bg-plover-blue'>
                <H1 textTitle='Plover' textColor='white' />
                <ul className='mt-10 hidden sm:block'>
                    {
                        links.map((link,key)=>{
                            return <li key={key}><H3 className='' textTitle={link} textColor='white'  /></li>
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
                    className={` bg-plover-blue w-100vw text-center absolute md:hidden`}>
                    {
                        links.map((link,key)=>{
                            return <li key ={key} className='border-2 border-white'><H3 className=''textTitle={link} textColor='white'  /></li>
                        })
                    }
                </motion.ul>)
                }
                </AnimatePresence>
            </div>
    )
}
