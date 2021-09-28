import React from 'react'
import { Formik } from 'formik'
import FormInput from '../components/FormInput'
import Textarea from '../components/Textarea'
import useLocalStorage from '../hooks/useLocalStorage'
import H1 from '../components/H1'
import H3 from '../components/H3'
export default function fbform() {
    const [patient,setPatient] = useLocalStorage('patient',{})
    function stringToArray(str){ 
         return str.split(',').map(item=>item.trim().split(' ')).reduce((acum,item)=>{
            return [...acum,...item]},[]).map(item=>item.toLowerCase()).filter(item=>item!=='')
    }

    return (
        <>
          <H1 textTitle='Antecedentes familiares' textColor='plover-blue' />
          <Formik
            initialValues={{
                familyBackground:{
                    father:{
                        pathologies:"",
                        description:"",
                    },
                    mother:{
                        pathologies:"",
                        description:"",
                    },
                    grandFather:{
                        pathologies:"",
                        description:"",
                    },
                    grandMother:{
                        pathologies:"",
                        description:"",
                    },
                    partner:{
                        pathologies:"",
                        description:"",
                    },
                    brothers:{
                        pathologies:"",
                        description:"",
                    }
                },
            }}

            validate={(values)=>{
              let errors = {}
              //validaciones de presencia
              if(!values.familyBackground.father.pathologies){}
        
              if(!values.familyBackground.father.description){}
              
              if(!values.familyBackground.mother.pathologies){}

              if(!values.familyBackground.mother.description){}
              
              if(!values.familyBackground.grandFather.pathologies){}
   
              if(!values.familyBackground.grandFather.description){} 

              if(!values.familyBackground.grandMother.pathologies){}
      
              if(!values.familyBackground.grandMother.description){} 

              if(!values.familyBackground.partner.pathologies){}
      
              if(!values.familyBackground.partner.description){} 
                
              if(!values.familyBackground.brothers.pathologies){} 
      
              if(!values.familyBackground.brothers.description){} 

              //validaciones por expresiones regulares
              return errors
            }}
            onSubmit={(values)=>{
                console.log(values)
            }}
          
          
          >
          {({values,handleSubmit,handleChange,handleBlur,errors,touched})=>(
            <>
            <H3 textTitle='Patologías' textColor='plover-blue'/>
            <form action="" onSubmit={handleSubmit} >
              <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>
                <div className='flex flex-col'>
                    <FormInput
                        textName='familyBackground.father.pathologies'
                        textLabel='Padre' 
                        textValue={values.familyBackground.father.pathologies}  
                        inputId='familyBackground.father.pathologies'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*validamos que el campo no venga vacio*/}
                    {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
                    <Textarea
                        textName='familyBackground.father.description' 
                        textLabel='descripcion' 
                        textValue={values.familyBackground.father.description}  
                        inputId='familyBackground.father.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col'>
                    <FormInput
                        textName='familyBackground.mother.pathologies'
                        textLabel='Madre' 
                        textValue={values.familyBackground.mother.pathologies}  
                        inputId='familyBackground.mother.pathologies'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*validamos que el campo no venga vacio*/}
                    {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
                    <Textarea
                        textName='familyBackground.mother.description' 
                        textLabel='descripcion' 
                        textValue={values.familyBackground.mother.description}  
                        inputId='familyBackground.mother.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col'>
                    <FormInput
                        textName='familyBackground.grandFather.pathologies'
                        textLabel='Abuelo' 
                        textValue={values.familyBackground.grandFather.pathologies}  
                        inputId='familyBackground.grandFather.pathologies'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*validamos que el campo no venga vacio*/}
                    {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
                    <Textarea
                        textName='familyBackground.grandFather.description' 
                        textLabel='descripcion' 
                        textValue={values.familyBackground.grandFather.description}  
                        inputId='familyBackground.grandFather.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col'>
                    <FormInput
                        textName='familyBackground.grandMother.pathologies'
                        textLabel='Abuela' 
                        textValue={values.familyBackground.grandMother.pathologies}  
                        inputId='familyBackground.grandMother.pathologies'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*validamos que el campo no venga vacio*/}
                    {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
                    <Textarea
                        textName='familyBackground.grandMother.description' 
                        textLabel='descripcion' 
                        textValue={values.familyBackground.grandMother.description}  
                        inputId='familyBackground.grandMother.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col'>
                    <FormInput
                        textName='familyBackground.partner.pathologies'
                        textLabel='Pareja' 
                        textValue={values.familyBackground.partner.pathologies}  
                        inputId='familyBackground.partner.pathologies'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*validamos que el campo no venga vacio*/}
                    {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
                    <Textarea
                        textName='familyBackground.partner.description' 
                        textLabel='descripcion' 
                        textValue={values.familyBackground.partner.description}  
                        inputId='familyBackground.partner.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col'>
                    <FormInput
                        textName='familyBackground.brothers.pathologies'
                        textLabel='Hermanos' 
                        textValue={values.familyBackground.brothers.pathologies}  
                        inputId='familyBackground.brothers.pathologies'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*validamos que el campo no venga vacio*/}
                    {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
                    <Textarea
                        textName='familyBackground.brothers.description' 
                        textLabel='descripcion' 
                        textValue={values.familyBackground.brothers.description}  
                        inputId='familyBackground.brothers.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

            </div>
              <button type='submit' onClick={()=>setPatient({...patient,...values})} >Enviar</button>
            </form>
            </>
          )}
          </Formik>  
        </>
    )
}
