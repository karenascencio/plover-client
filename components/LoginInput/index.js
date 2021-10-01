import React, {useState} from 'react'
import Image from 'next/image'


export default function LoginInput( {name, imagen, placeHolder, type, Login} ) {
  const [searchValue, setSearchValue] = useState({email: ''})
  
  const handlerInputChange = event => {
    setSearchValue(event.target.value);
  }
  return(
  <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-250px md:w-408px lg:w-539px'  >
    <Image src={imagen} heigth={40} width={40} />
    <input
      className='w-full py-1 pl-1 border-0 focus:outline-none'
      type={type}
      placeholder={placeHolder}
      name={name}
      value={searchValue}
      onChange={handlerInputChange}
      Login={searchValue}
      required
    />
  </div>
  )
}