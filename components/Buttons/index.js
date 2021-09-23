import React from 'react'

export default function Buttons() {
    return (
        <>
            <button className='bg-plover-blue hover:bg-blue-700 text-white font-normal m-2 py-2 px-4 rounded'   >
                INICIAR SESIÓN
            </button>

            <button className="bg-white hover:bg-gray-100 text-plover-blue font-normal py-2 px-4 border border-gray-400 rounded shadow">
                Home
            </button>

            <button className="bg-white hover:bg-gray-100 text-plover-blue font-normal m-2 py-2 px-4 border-2 border-plover-blue rounded shadow">
                Agregar cita
            </button>
            <button className="bg-white hover:bg-gray-100 text-plover-blue font-normal text-center m-2 py-2 px-4 border-2 border-plover-blue rounded shadow w-8 h-8">
            IMG
            </button>
        </>
    )
}