import React, {useState} from 'react'
import Image from 'next/image'


export default function LoginInput( {name, image, Login, Email} ) {
  const [searchValue, setSearchValue] = useState({email: ''})
  
  const handlerInputChange = event => {
    setSearchValue(event.target.value);
  }
  return(
    <div className='flex justify-center justify-items-start border-b-2 mb-4 border-black w-250px md:w-408px lg:w-539px'>
              <Image src={image} heigth={40} width={40} />
              <input
                className='w-full py-1 pl-1 border-0 focus:outline-none'
                type='email'
                placeholder='Correo'
                onChange={event => setSearchValue({ ...searchValue, email: event.target.value })}
                value={searchValue.email}
                required
                Email={image}
              />
     </div>
  )
}