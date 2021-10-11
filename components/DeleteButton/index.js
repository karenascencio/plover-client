import Image from 'next/image'

export default function DeleteButton ({ image, deleteHandler, idPatient }) {
  return (
    <>
      <button
        className=' ml-2 md:ml-10px md:h-30px p-1 h-30px w-30px item-center place-content-center justify-items-center rounded hover:border-darker-gray border-lighter-gray border-2'
        onClick={deleteHandler}
        id={idPatient}
      >
        <div className='item-center place-content-center justify-items-center h-15px w-15px'>
          <Image id={idPatient} src={image} alt='img' height={15} width={15} href='#' />
        </div>
      </button>
    </>
  )
}
