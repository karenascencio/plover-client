
import Image from 'next/image'
import Link from 'next/dist/client/link'
export default function AddNewPatientButton ({ title, imagen,idDentist}) {
  return (
    <>
      <div className=' h-30px w-30px lg:w-180px xl:w-180px flex justify-center justify-items-center items-center rounded hover:bg-login-blue bg-plover-blue'>
        <Image src={imagen} alt='img' height={15} width={15} href='#' />
        <Link href={`/patientform?idDentist=${idDentist}`}><a className=' ml-1 hidden md:hidden lg:display xl:display text-white text-center align-middle text-14px lg:block' href='#'>{title}</a></Link>
      </div>
    </>
  )
}

// flex flex-row flex-center justify-items-center justify-center h-30px md:w-30px  xl:w-180px p-1 item-center rounded hover:bg-light-blue bg-plover-blue
