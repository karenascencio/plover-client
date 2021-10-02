import React,{useState} from 'react'
import NavBar from '../NavBar'

export const FormularioContext = React.createContext();
export default function Layout ({ children }) {
  const [formulario,setFormulario] = useState('General Information')
  function handleForm(valor){
    setFormulario(valor)
  }
  return (
    <div className='flex flex-col sm:flex-row '>
      <NavBar handleForm={handleForm}/>
      <FormularioContext.Provider value={formulario}>
        <main formulario='General Information' className='flex w-ful justify-center flex-grow sm:w-65vw mx-11'>{children}</main>
      </FormularioContext.Provider>
    </div>
  )
}
