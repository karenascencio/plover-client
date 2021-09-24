import React from 'react'

export default function LoginButtons({title}) {
    
    return (
        <>
            <button className='bg-plover-blue hover:bg-blue-700 text-white font-normal m-2 py-2 px-4 rounded'   >
                {title}
            </button>
        </>
    )
}