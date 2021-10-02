import Image from 'next/image'
import index from '../AsideLeftButtons'
import Link from 'next/link'

export default function CardButtonPatient ({ title, image, reference }) {
  return (
    <Link href={reference}>
      <a className=' ml-5px md:ml-10px p-1 h-30px item-center rounded hover:bg-light-blue border-plover-blue border-2 '>

        <div className=' lg:hidden items-center object-fill'>
          <Image src={image} alt='img' height={15} width={15} />
        </div>

        <a className=' text-center align-middle text-14px sm:hidden lg:block w-30 text-plover-blue' href='#'>{title}</a>
      </a>
    </Link>
  )
}
