import Image from 'next/image'
import index from '../AsideLeftButtons'

export default function CardButtonPatient ({ title, imagen }) {
  return (
    <>
      <div className=' sm:ml-5px md:ml-10px p-1 h-30px item-center rounded hover:bg-light-blue border-plover-blue border-2 '>

        <div className=' lg:hidden items-center object-fill'>
          <Image src={imagen} alt='img' height={15} width={15} href='#' />
        </div>

        <a className=' text-center align-middle text-14px sm:hidden lg:block w-30 text-plover-blue' href='#'>{title}</a>
      </div>
    </>
  )
}
