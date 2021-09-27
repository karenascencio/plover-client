
import Image from 'next/image'
export default function AddNewPatientButton ({ title, imagen }) {
  return (
    <>
      <div className=' h-30px sm:w-30px xl:w-180px flex justify-center justify-items-center items-center rounded hover:bg-light-blue bg-plover-blue'>
        <Image src={imagen} alt='img' height={15} width={15} href='#' />
        <a className=' ml-1 sm:hidden md:hidden text-white text-center align-middle text-14px lg:block' href='#'>{title}</a>
      </div>
    </>
  )
}

// flex flex-row flex-center justify-items-center justify-center h-30px md:w-30px  xl:w-180px p-1 item-center rounded hover:bg-light-blue bg-plover-blue
