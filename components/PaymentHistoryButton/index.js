import Image from 'next/dist/client/image'
export default function PaymentHistoryButton ({ imagen }) {
  return (
    <div className=' sm:ml-5px md:ml-10px md:h-30px p-1 h-30px w-30px item-center place-content-center justify-items-center rounded hover:bg-light-blue border-plover-blue border-2 '>
      <div className='item-center place-content-center justify-items-center h-15px w-15px'>
        <Image src={imagen} alt='img' height={15} width={15} href='#' />
      </div>
    </div>
  )
}
