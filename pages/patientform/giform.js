import React, { useState } from 'react'
import { Formik} from 'formik'
import FormInput from '../../components/FormInput'
import useLocalStorage from '../../hooks/useLocalStorage'
import {useEffect,useRef} from 'react'
import H1 from '../../components/H1'
import H3 from '../../components/H3'
export default function Giform() {


    return (
        <div className='w-full max-w-screen-lg flex flex-col'>
          <H1 textTitle='Información General' textColor='plover-blue' />
          <Formik
            initialValues={{
              name:'',
              lastName:'',
              gender:'',
              age:'',
              height:'',
              weight:'',
              bloodType:'',
              maritalStatus:'',
              address:{
                state:'',
                city:'',
                neighborhood:'',
                street:'',
                streetNumber:'',
                innerNumber:''
              },
              familyPractitioner:{
                name:"",
                lastName:"",
                email:"",
                phoneNumber:""
              },
              personInCharge:{
                name:"",
                lastName:"",
                email:"",
                phoneNumber:""
              },

            }}

            validate={(values)=>{
              let errors = {}
              //validaciones de presencia
              if(!values.name) errors.name='Por favor, ingresa tus nombres'
              if(!values.lastName) errors.lastName='Por favor, ingresa tus apellidos'
              if(!values.gender) errors.gender='Por favor, ingresa tu género'
              if(!values.age) errors.age='Por favor, ingresa tu edad'
              if(!values.height) errors.height='Por favor, ingresa tu altura'
              if(!values.weight) errors.weight='Por favor, ingresa tus peso'
              if(!values.bloodType) errors.bloodType='Por favor, ingresa tus tipo de sangre'
              if(!values.maritalState) errors.maritalState='Por favor, ingresa tus estado civil'
              //validaciones por expresiones regulares
              return errors

            }}
    
            onSubmit={(values)=>{
              console.log(values)
              console.log('formulario')
            }}          
          
          >
          {({values,handleSubmit,handleChange,handleBlur,errors,touched})=>(
            
            <form action="" onSubmit={handleSubmit} >
              <H3 textTitle='Paciente' textColor='plover-blue'/>
              <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>
              <FormInput
                textName='name'
                textLabel='Nombres' 
                textValue={values.name}  
                inputId='name'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
                {/*validamos que el campo no venga vacio*/}
                {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
              <FormInput 
                textName='lastName' 
                textLabel='Apellidos' 
                textValue={values.lastName}  
                inputId='lastName'
                handleChange={handleChange}
                handleBlur={handleBlur}                />
                {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}

              <FormInput 
                textName='gender'
                textLabel='Género' 
                textValue={values.gender}  
                inputId='gender'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='age' 
                textLabel='Edad' 
                textValue={values.age}  
                inputId='age'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='height'
                textLabel='Altura' 
                textValue={values.height}  
                inputId='height'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='weight' 
                textLabel='Peso' 
                textValue={values.weight} 
                inputId='weight'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='bloodType'
                textLabel='Tipo de sangre' 
                textValue={values.bloodType}  
                inputId='bloodType'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='maritalStatus' 
                textLabel='Estado Civil' 
                textValue={values.maritalStatus}  
                inputId='maritalStatus'
                handleChange={handleChange}
                handleBlur={handleBlur}                />
                </div>
                
                <H3 textTitle='Dirección' textColor='plover-blue'/>
                <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>
              <FormInput
                textName='address.state'
                textLabel='Estado' 
                textValue={values.address.state}  
                inputId='address.state'
                handleChange={handleChange}
                handleBlur={handleBlur}                />
                {/*validamos que el campo no venga vacio*/}
                {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
              <FormInput 
                textName='address.city' 
                textLabel='Ciudad' 
                textValue={values.address.city}  
                inputId='address.city'
                handleChange={handleChange}
                handleBlur={handleBlur}                />
                {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}

              <FormInput 
                textName='address.neighborhood'
                textLabel='Colonia' 
                textValue={values.address.neighborhood}  
                inputId='address.neighborhood'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='address.street' 
                textLabel='Calle' 
                textValue={values.address.street}  
                inputId='address.street'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='address.streetNumber'
                textLabel='Número exterior' 
                textValue={values.address.streetNumber}  
                inputId='address.streetNumber'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='address.innerNumber' 
                textLabel='Número interior' 
                textValue={values.address.innerNumber} 
                inputId='address.innerNumber'
                handleChange={handleChange}
                handleBlur={handleBlur}                />
                </div>

                <H3 textTitle='Médico familiar' textColor='plover-blue'/>
                <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>
              <FormInput
                textName='familyPractitioner.name'
                textLabel='Nombres' 
                textValue={values.familyPractitioner.name}  
                inputId='familyPractitioner.name'
                handleChange={handleChange}
                handleBlur={handleBlur}                />
                {/*validamos que el campo no venga vacio*/}
                {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
              <FormInput 
                textName='familyPractitioner.lastName' 
                textLabel='Apellidos' 
                textValue={values.familyPractitioner.lastName}  
                inputId='familyPractitioner.lastName'
                handleChange={handleChange}
                handleBlur={handleBlur}                />
                {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}

              <FormInput 
                textName='familyPractitioner.email'
                textLabel='Email' 
                textValue={values.familyPractitioner.email}  
                inputId='familyPractitioner.email'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='familyPractitioner.phoneNumber' 
                textLabel='Número de teléfono' 
                textValue={values.familyPractitioner.phoneNumber}  
                inputId='familyPractitioner.phoneNumber'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
                </div>

                <H3 textTitle='Persona a cargo' textColor='plover-blue'/>
                <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'}>
              <FormInput
                textName='personInCharge.name'
                textLabel='Nombres' 
                textValue={values.personInCharge.name}  
                inputId='personInCharge.name'
                handleChange={handleChange}
                handleBlur={handleBlur}                />
                {/*validamos que el campo no venga vacio*/}
                {/*touched.nombres && errors.nombres && <div>{errors.nombres}</div>*/}
              <FormInput 
                textName='personInCharge.lastName' 
                textLabel='Apellidos' 
                textValue={values.personInCharge.lastName}  
                inputId='personInCharge.lastName'
                handleChange={handleChange}
                handleBlur={handleBlur}                />
                {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}

              <FormInput 
                textName='personInCharge.email'
                textLabel='Email' 
                textValue={values.personInCharge.email}  
                inputId='personInCharge.email'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
              <FormInput 
                textName='personInCharge.phoneNumber' 
                textLabel='Número de teléfono' 
                textValue={values.personInCharge.phoneNumber}  
                inputId='personInCharge.phoneNumber'
                handleChange={handleChange}
                handleBlur={handleBlur}
                />
                </div>
            </form>
          )}
          </Formik>  
        </div>
    )
}
