import Image from 'next/image'
export default function index({title, imagen}) {
    return (
        <>
            {/*<button className="bg-white hover:bg-light-blue text-plover-blue font-normal m-2 py-2 px-4 border-2 border-plover-blue rounded shadow">
            {title}
            </button>*/}

            <div className='box-border h-30 w-30 rounded ml-2  border-plover-blue border-2 '>
                <Image src={imagen} alt='img' height={30} width={30} />
            </div>
        </>
    )
}
