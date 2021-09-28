import React from 'react'
import { Formik } from 'formik'
import FormInput from '../components/FormInput'
import Textarea from '../components/Textarea'
import RadioButtons from '../components/RadioButtons'
import Select from '../components/Select'
import useLocalStorage from '../hooks/useLocalStorage'
import H1 from '../components/H1'
import H3 from '../components/H3'

export default function patientForm() {
    const [patient,setPatient] = useLocalStorage('patient',{})
    function stringToArray(str){ 
         return str.split(',').map(item=>item.trim().split(' ')).reduce((acum,item)=>{
            return [...acum,...item]},[]).map(item=>item.toLowerCase()).filter(item=>item!=='')
    }

    return (
        <>
          <H1 textTitle='Antecedentes patológicos' textColor='plover-blue' />
          <Formik
            initialValues={{
                nonPathologicalBackground:{
                    feeding:'',
                    toothBrushingFrequency:'',
                    vaccines:'',
                    addictions:'',
                    alcoholConsumption:'',
                    cigarConsumption:'',
                    recentTattos:'',
                    hygieneDescription:'',
                    services:'',
                    unusualHabits:'',
                    observations:''
                }
            }}

            validate={(values)=>{
              let errors = {}
              //validaciones de presencia

              //validaciones por expresiones regulares
              return errors
            }}
            onSubmit={(values)=>{
                console.log(values)
            }}
          
          
          >
          {({values,handleSubmit,handleChange,handleBlur,setFieldValue,errors,touched})=>(
            <>
           
            <form action="" onSubmit={handleSubmit} >
              <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>
              <RadioButtons 
                    textLabel='¿Como considera su alimentacion?'
                    options={['buena','regular','mala']}
                    setFieldValue={setFieldValue}
                    textValue={values.nonPathologicalBackground.feeding}
                    textName='nonPathologicalBackground.feeding'
                />
                <FormInput 
                    textName='nonPathologicalBackground.toothBrushingFrequency'
                    textLabel='¿Con qué frecuencia se cepilla los dientes?' 
                    textValue={values.nonPathologicalBackground.toothBrushingFrequency}  
                    inputId='nonPathologicalBackground.toothBrushingFrequency'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <FormInput 
                    textName='nonPathologicalBackground.vaccines'
                    textLabel='Vacunas' 
                    textValue={values.nonPathologicalBackground.vaccines}  
                    inputId='nonPathologicalBackground.vaccines'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                  <FormInput 
                    textName='nonPathologicalBackground.addictions'
                    textLabel='Adicciones' 
                    textValue={values.nonPathologicalBackground.addictions}  
                    inputId='nonPathologicalBackground.addictions'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            </div>
            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>
              
              <Select 
                    selectID='alcohol' 
                    selectQuestion='¿Bebe alcohol frecuentemente?' 
                    outputOptions={[
                        'Nunca he tomado',
                        'No tomo',
                        'Una vez al día',
                        'Una vez cada quince días',
                        'Una vez al mes'
                    ]} />
              
              
              
              <RadioButtons 
                    textLabel='¿Como considera su alimentacion?'
                    options={['buena','regular','mala']}
                    setFieldValue={setFieldValue}
                    textValue={values.nonPathologicalBackground.feeding}
                    textName='nonPathologicalBackground.feeding'
                />
          
            </div>





              <button type='submit' onClick={()=>setPatient({...patient,...values})} >Enviar</button>
            </form>
            </>
          )}
          </Formik>  
        </>
    )
}
