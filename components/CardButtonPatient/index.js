import Image from 'next/image'
import index from '../AsideLeftButtons'
import Link from 'next/link'

export default function CardButtonPatient ({ title, image, reference }) {
  return (
    <Link href={reference}>
      <div className=' align-middle justify-center p-1 ml-5px md:ml-10px pb-x h-30px w-30px xl:w-auto item-center rounded hover:bg-light-blue border-plover-blue border-2 '>

        <div className='xl:hidden items-center object-fill'>
          <Image src={image} alt='img' height={15} width={15} />
        </div>
        <a className='flex align-middle invisible xl:visible text-center lg:object-fit text-14px lg:block w-30 text-plover-blue' href='#'>{title}</a>
      </div>
    </Link>
  )
}
