import Image from 'next/image'

// .: Images
export default function HomeSection ({ image, textInfo, title }) {
  return (
    <div className='flex flex-wrap justify-center mt-4 lg:justify-evenly lg:mb-70px'>
      <div className='order-2 flex justify-center w-280px bg-blue-300 '>
        <Image className='object-fit' src={image} height={150} width={280} />
      </div>
      <div className='order-1 flex justify-center flex-col text-center w-280px bg-green-300'>
        <div>
          <h3>{title}</h3>
        </div>
        <div>
          <p>{textInfo}</p>
        </div>
      </div>
    </div>
  )
}
