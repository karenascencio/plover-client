import React from 'react'
import FormInput from '../components/FormInput'
import TextWithLabel from '../components/TextWithLabel'
import RadioButtons from '../components/RadioButtons';
import H3 from '../components/H3';
export default function Aboutme () {
    const title='Informacion personal'
    const infoGroup= [
        {'clave':'nombres','valor':'jorge alfredo','isInput':false},
        {'clave':'apellidos','valor':'castuera arroyo','isInput':false },
        {'clave':'fecha de nacimiento','valor':'03/03/1996','isInput':false },
        {'clave':'genero','valor':'masculino','isInput':false },
        {'clave':'numero telefonico','valor':'327-106-52-61','isInput':true },
        {'clave':'email','valor':'freddycastuera@gmail.com','isInput':false }
    ]; 
  return (
      <>
     <H3 textTitle={title} textColor='plover-blue'/>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-10'>

      {infoGroup.map((item,key)=>{
          return item.isInput? <FormInput 
                                    key={key}
                                    textLabel={item.clave}
                                    textValue=''
                                    inputId={key}  
                                    />:
                                <TextWithLabel 
                                    key={key}
                                    textLabel={item.clave}
                                    textValue=''
                                    textId={key}  
                                    />
      })}
      </div>
      <RadioButtons 
        textLabel='¿Has tomado pastillas anticonceptivas?'
        options={['si','no']}
        handleChange={()=>{console.log('cambio')}}
        handleBlur={()=>{console.log('blur')}}
        textName='alimentacion'
          />

<RadioButtons 
        textLabel='¿Has tomado pastillas anticonceptivas?'
        options={['buena','regular','mala']}
        handleChange={()=>{console.log('cambio')}}
        handleBlur={()=>{console.log('blur')}}
        textName='alimentacion'
          />
      </>
  )
}
