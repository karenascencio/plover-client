import React from 'react'

export default function ConfirmationModal (props) {
  const { closeHandler, deleteHandler } = props
  return (
    <div className='bg-lighter-gray bg-opacity-60 absolute inset-0 flex justify-center items-center z-50'>
      <div className='bg-white max-w-md rounded shadow-xl'>
        <div className='flex justify-between items-center bg-plover-blue rounded-t px-2 py-2'>
          <h4 className='text-sm md:text-base font-semibold text-white'>
            Eliminar paciente
          </h4>
          <button onClick={closeHandler}>
            <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 fill-current text-white ' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
        <div className='px-2 pb-2 pt-3'>
          <p className='text-sm md:text-base text-gray-700'>
            ¿Estás seguro que deseas <b className='text-red-500'>eliminar</b> el paciente? Esta acción es <b className='text-red-500'>irreversible</b>.
          </p>
        </div>
        <div className='px-2 pt-3 pb-2 flex justify-end space-x-4'>
          <button
            className='px-3 py-1 rounded border-2 text-lighter-gray text-xs md:text-sm border-lighter-gray hover:text-darker-gray hover:border-darker-gray'
            onClick={closeHandler}
          >
            Cancelar
          </button>
          <button
            className='px-3 py-1 rounded font-bold text-white text-xs md:text-sm bg-red-500 hover:bg-red-600'
            onClick={deleteHandler}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
