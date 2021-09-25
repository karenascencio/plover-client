import React from 'react'
import NavBar from '../NavBar'

export default function Layout({children}){
    return(
    
        <div className='flex flex-col sm:flex-row'>
            <NavBar />
            <main>{children}</main>
        </div> 
    )
}

