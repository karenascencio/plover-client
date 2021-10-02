import React,{useContext,createContext} from 'react';
import { useRouter } from 'next/router'


export default function App() {
  const router = useRouter()
  console.log(router)
  
  return (
      <Nav behavior={'dentista'}/>
  )
}

function Nav(props) {
  const {behavior} = props
  const listaFormulario = [
    'Informacion Genera',
    'Antecedentes Familiares',
    'Antecedentes Patologios',
    'Antecedentes no Patologicos'
  ]

  const listaOdontologo = [
    'crear paciente',
    'crear cita',
    'crear pago',
    'ver paciente',
    'ver citas',
    'ver pagos'
  ]    
  return (
    <div className='flex flex-col'>
    {
      behavior === 'formulario' && 
        listaFormulario.map(item=> <div>{item}</div>)
    }
    {
      behavior === 'dentista' && 
        listaOdontologo.map(item=> <div>{item}</div>)
    }
    </div>
    )
}