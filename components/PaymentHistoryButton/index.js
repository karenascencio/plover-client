import Image from 'next/dist/client/image'
import Link from 'next/link'

export default function PaymentHistoryButton ({ image, reference }) {
  return (
    <Link href={reference}>
      <a className=' ml-5px md:ml-10px md:h-30px p-1 h-30px w-30px item-center place-content-center justify-items-center rounded hover:bg-light-blue border-plover-blue border-2 '>
        <div className='item-center place-content-center justify-items-center h-15px w-15px'>
          <Image src={image} alt='img' height={15} width={15} href='#' />
        </div>
      </a>
    </Link>
  )
}
