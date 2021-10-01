import { Formik } from 'formik'
import FormInput from '../../components/FormInput'
import Textarea from '../../components/Textarea'
import RadioButtons from '../../components/RadioButtons'
import Select from '../../components/Select'
import useLocalStorage from '../../hooks/useLocalStorage'
import H1 from '../../components/H1'
import H3 from '../../components/H3'
import { useEffect } from 'react'

export default function Npbform() {
    const [patient,setPatient] = useLocalStorage('patient',{})
    function stringToArray(str){ 
         return str.split(',').map(item=>item.trim().split(' ')).reduce((acum,item)=>{
            return [...acum,...item]},[]).map(item=>item.toLowerCase()).filter(item=>item!=='')
    }
    

    return (
        <div className='flex flex-col pt-10'>
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
                    selectID='alcoholConsumption' 
                    textName='nonPathologicalBackground.alcoholConsumption'
                    textValue={values.nonPathologicalBackground.alcoholConsumption}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    selectQuestion='¿Bebe alcohol frecuentemente?' 
                    outputOptions={[
                        'Nunca he tomado',
                        'No tomo',
                        'Una vez al día',
                        'Una vez cada quince días',
                        'Una vez al mes'
                    ]} />
                <Select 
                    selectID='cigarConsumption' 
                    textName='nonPathologicalBackground.cigarConsumption'
                    textValue={values.nonPathologicalBackground.cigarConsumption}
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    selectQuestion='¿Con que frecuencia fuma?' 
                    outputOptions={[
                        'Nunca he fumado',
                        'No fumo',
                        '10 ó menos cajetillas por mes',
                        '11 a 20 cajetillas por mes',
                        '21 a 30 cajetillas por mes',
                        '31 cajetillas por mes ó mas'
                    ]} />
              <RadioButtons 
                    textLabel='¿Te has tatuado en los ultimos 6 meses?'
                    options={['Si','No']}
                    setFieldValue={setFieldValue}
                    textValue={values.nonPathologicalBackground.recentTattos}
                    textName='nonPathologicalBackground.recentTattos'
                />

            <Textarea
                    textName='nonPathologicalBackground.hygieneDescription' 
                    textLabel='Describa su higiene personal' 
                    textValue={values.nonPathologicalBackground.hygieneDescription}  
                    inputId='nonPathologicalBackground.hygieneDescription'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                </div>
                <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>

            <FormInput 
                    textName='nonPathologicalBackground.services'
                    textLabel='Servicios básicos' 
                    textValue={values.nonPathologicalBackground.services}  
                    inputId='nonPathologicalBackground.services'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />

            <Textarea
                    textName='nonPathologicalBackground.unusualHabits' 
                    textLabel='Hábitos extraños' 
                    textValue={values.nonPathologicalBackground.unusualHabits}  
                    inputId='nonPathologicalBackground.unusualHabits'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />

            <Textarea
                    textName='nonPathologicalBackground.observations' 
                    textLabel='Observaciónes' 
                    textValue={values.nonPathologicalBackground.observations}  
                    inputId='nonPathologicalBackground.observations'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />

            </div>





              <button type='submit' onClick={()=>setPatient({...patient,...values})} >Enviar</button>
            </form>
            </>
          )}
          </Formik>  
        </div>
    )
}
