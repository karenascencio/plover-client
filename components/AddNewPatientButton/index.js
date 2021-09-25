
import Image from "next/image"
export default function AddNewPatientButton({title, imagen}) {
    return (
  <>
        <div className='flex flex-row flex-center justify-items-center justify-center w-180px h-30px md:w-30px p-1 item-center rounded hover:bg-light-blue bg-plover-blue border-2 '>
            <Image src={imagen} alt='img' height={15} width={15} href='#' />
            <a className=' ml-1  md:hidden text-white text-center align-middle text-14px sm:hidden lg:block w-30  ' href='#'>{title}</a>
        </div>
</>
    )
}
