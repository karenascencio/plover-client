import React from 'react'

export default function AnotationsCard(props) {
    const {text,label} = props
    return (
        <div className=''>
            <p className='text-sm text-plover-blue pt-5 '>{label}</p>
            <div className='border shadow-md flex flex-col px-2 py-3 mt-4 mb-5 rounded-lg '>
                <p className='text-base text-plover-blue mb-1'>{text}</p>
            </div>
        </div>
    )
}
