import React from 'react'
import { Formik } from 'formik'
import FormInput from '../components/FormInput'
import Textarea from '../components/Textarea'
import RadioButtons from '../components/RadioButtons'
import useLocalStorage from '../hooks/useLocalStorage'
import H1 from '../components/H1'
import H3 from '../components/H3'

export default function pbform() {
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
                pathologicalBackground:{
                currentDiseases:"",
                previousDiseases:"",
                generalAllergies:"",
                drugAllergies:"",
                currentMedications:"",
                previousOperations:"",
                bloodDonation:"",
                birthControlPills:"",
                observations:""
            },
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
                <FormInput 
                    textName='pathologicalBackground.currentDiseases'
                    textLabel='Enfermedades actuales' 
                    textValue={values.pathologicalBackground.currentDiseases}  
                    inputId='pathologicalBackground.currentDiseases'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <FormInput 
                    textName='pathologicalBackground.previousDiseases'
                    textLabel='Enfermedades previas' 
                    textValue={values.pathologicalBackground.previousDiseases}  
                    inputId='pathologicalBackground.previousDiseases'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <FormInput 
                    textName='pathologicalBackground.generalAllergies'
                    textLabel='Alergias' 
                    textValue={values.pathologicalBackground.generalAllergies}  
                    inputId='pathologicalBackground.generalAllergies'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                  <FormInput 
                    textName='pathologicalBackground.drugAllergies'
                    textLabel='Alergias a medicamentos' 
                    textValue={values.pathologicalBackground.drugAllergies}  
                    inputId='pathologicalBackground.drugAllergies'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
            </div>
            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>
                <FormInput 
                    textName='pathologicalBackground.currentMedications'
                    textLabel='Medicacion actual' 
                    textValue={values.pathologicalBackground.currentMedications}  
                    inputId='pathologicalBackground.currentMedications'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <RadioButtons 
                    textLabel='¿Has tomado pastillas anticonseptivas?'
                    options={['si','no']}
                    setFieldValue={setFieldValue}
                    textValue={values.pathologicalBackground.birthControlPills}
                    textName='pathologicalBackground.birthControlPills'
                />
                <RadioButtons 
                    textLabel='¿Te has operado recientemente?'
                    options={['si','no']}
                    setFieldValue={setFieldValue}
                    textValue={values.pathologicalBackground.previousOperations}
                    textName='pathologicalBackground.previousOperations'
                />
                <RadioButtons 
                    textLabel='¿Has donado sangre en los ultimos 6 meses?'
                    options={['si','no']}
                    setFieldValue={setFieldValue}
                    textValue={values.pathologicalBackground.bloodDonation}
                    textName='pathologicalBackground.bloodDonation'
                />
            </div>
            <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>
                <Textarea
                        textName='pathologicalBackground.observations' 
                        textLabel='observaciones'
                        textValue={values.pathologicalBackground.observations}  
                        inputId='pathologicalBackground.observations'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
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
