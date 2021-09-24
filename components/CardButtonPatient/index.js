import Image from 'next/image'
export default function index({ title, imagen}) {
  return (
  <>
    {/*<button className="bg-white hover:bg-light-blue text-plover-blue font-normal m-2 py-2 px-4 border-2 border-plover-blue rounded shadow">
    {title}
    </button>*/}

    <div className=' w-30 h-30 pt-1 pl-1 pr-1 rounded ml-2 hover:bg-light-blue  border-plover-blue border-2 '>
      <div className=' lg:hidden items center object-fill'>
        <Image src={imagen} alt='img' height={15} width={18} href='#' />
      </div>
      <a className=' sm:hidden lg:block w-30 m-1 text-plover-blue' href='#'>{title}</a>
    </div>
  </>
  )
}
