import React, { useState } from 'react'
import { Formik} from 'formik'
import FormInput from '../../components/FormInput'
import Textarea from '../../components/Textarea'
import RadioButtons from '../../components/RadioButtons'
import Select from '../../components/Select'
import useLocalStorage from '../../hooks/useLocalStorage'
import {useEffect,useContext} from 'react'
import H1 from '../../components/H1'
import H3 from '../../components/H3'
import api from '../../lib/api'
import { FormularioContext } from '../../components/Layout'



//single form
export default function Giform() {
  const value = useContext(FormularioContext);
  const formulario = value
  console.log(value)
 

  
  function stringToArray(string){
    if(typeof string == 'string'){
      return string.split(',').map(item=>item.trim()).filter(item=>item!=="")
    }
    return []
    }

    async function SeeState(values){
      console.log(values)
      values.idDetist='61511d3cf6273ea718ebd5f5'
      values.email = `user${Math.random()}@gmail.com`
      values.password=`password${Math.random()}@gmail.com`
      values.age=Number(values.age)
      values.height=Number(values.height)
      values.weight=Number(values.weight)

      values.familyBackground.father.pathologies = stringToArray( values.familyBackground.father.pathologies)
      values.familyBackground.mother.pathologies = stringToArray( values.familyBackground.mother.pathologies)
      values.familyBackground.grandFather.pathologies = stringToArray( values.familyBackground.grandFather.pathologies)
      values.familyBackground.grandMother.pathologies = stringToArray( values.familyBackground.grandMother.pathologies)
      values.familyBackground.partner.pathologies = stringToArray( values.familyBackground.partner.pathologies)
      values.familyBackground.brothers.pathologies = stringToArray( values.familyBackground.brothers.pathologies)
      values.pathologicalBackground.currentDiseases = stringToArray(values.pathologicalBackground.currentDiseases)
      values.pathologicalBackground.previousDiseases = stringToArray(values.pathologicalBackground.previousDiseases)
      values.pathologicalBackground.generalAllergies = stringToArray(values.pathologicalBackground.generalAllergies)
      values.pathologicalBackground.drugAllergies = stringToArray(values.pathologicalBackground.drugAllergies)
      values.pathologicalBackground.currentMedications =stringToArray(values.pathologicalBackground.currentMedications)
      values.nonPathologicalBackground.vaccines = stringToArray(values.nonPathologicalBackground.vaccines)
      values.nonPathologicalBackground.addictions = stringToArray(values.nonPathologicalBackground.addictions)
      values.nonPathologicalBackground.services = stringToArray(values.nonPathologicalBackground.services)
      values.nonPathologicalBackground.alcoholConsumption = values.nonPathologicalBackground.alcoholConsumption.toLowerCase()
      values.nonPathologicalBackground.cigarConsumption = values.nonPathologicalBackground.cigarConsumption.toLowerCase()
      await api.postPatient(values)
    }
    return (
        <div className='w-full max-w-screen-lg flex flex-col'>
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
            onSubmit={(values) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                }, 400);
            }}         
          >
          {({values,handleSubmit,handleChange,handleBlur,setFieldValue,errors,touched})=>(
            
            <form onSubmit={handleSubmit} >

            
            {/*aqui comienza el formulario de informacion general*/}
            {formulario =='General Information' && (
              <div id='General Information'>
                <div className='flex flex-col'>
                  <H1 textTitle='Información General' textColor='plover-blue' />
                  <H3 textTitle='Paciente' textColor='plover-blue'/>
                </div>
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
                    handleBlur={handleBlur}

                    />
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
              </div>)}
              {/*aqui termina el formulario de informacion general*/}
            
              {/*aqui comineza el formulario de antecedentes famililares*/}
              {formulario=='Family Background' && (
              <div id='Family Background'>
                <div className='flex flex-col'>
                  <H1 textTitle='Antecedentes familiares' textColor='plover-blue' />
                  <H3 textTitle='Patologías' textColor='plover-blue'/>
                </div>
                <div className={'grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8'}>
                <div className='flex flex-col border-b border-lighter-gray'>
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
                        textLabel='descripción' 
                        textValue={values.familyBackground.father.description}  
                        inputId='familyBackground.father.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col border-b border-lighter-gray'>
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
                        textLabel='descripción' 
                        textValue={values.familyBackground.mother.description}  
                        inputId='familyBackground.mother.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col border-b border-lighter-gray'>
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
                        textLabel='descripción' 
                        textValue={values.familyBackground.grandFather.description}  
                        inputId='familyBackground.grandFather.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col border-b border-lighter-gray'>
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
                        textLabel='descripción' 
                        textValue={values.familyBackground.grandMother.description}  
                        inputId='familyBackground.grandMother.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col border-b border-lighter-gray'>
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
                        textLabel='descripción' 
                        textValue={values.familyBackground.partner.description}  
                        inputId='familyBackground.partner.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>

                <div className='flex flex-col border-b border-lighter-gray'>
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
                        textLabel='descripción' 
                        textValue={values.familyBackground.brothers.description}  
                        inputId='familyBackground.brothers.description'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                    />
                    {/*touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div>*/}
                </div>
            </div>
            </div>)}
            {/*aqui termina el formulario de antecedentes familiares*/}

            {/*aqui comienza el formulario de antecedentes patologicos*/}
            {formulario=='Pathological Background' && (
            <div id='Pathological Background'>
            <H1 textTitle='Antecedentes patológicos' textColor='plover-blue' />
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
                <FormInput 
                    textName='pathologicalBackground.currentMedications'
                    textLabel='Medicacion actual' 
                    textValue={values.pathologicalBackground.currentMedications}  
                    inputId='pathologicalBackground.currentMedications'
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                />
                <RadioButtons 
                    textLabel='¿Has tomado pastillas anticonceptivas?'
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
                    textLabel='¿Has donado sangre en los últimos 6 meses?'
                    options={['si','no']}
                    setFieldValue={setFieldValue}
                    textValue={values.pathologicalBackground.bloodDonation}
                    textName='pathologicalBackground.bloodDonation'
                />
                <Textarea
                        textName='pathologicalBackground.observations' 
                        textLabel='observaciones'
                        textValue={values.pathologicalBackground.observations}  
                        inputId='pathologicalBackground.observations'
                        handleChange={handleChange}
                        handleBlur={handleBlur}
                />
              </div>
            </div>)}
            {/*aqui termina el formulario de antecedentes patologicos*/}


            {/*aqui comienza el formulario de antecedentes no patologicos*/}
            {formulario=='NonPathological Background' && (
            <div id='NonPathological Background'>
              <H1 textTitle='Antecedentes no patológicos' textColor='plover-blue' />
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
            </div>)}
            {/*aqui termina el formulario de antecedentes no patologiocos*/}
                <button type='submit' onClick={()=>SeeState(values)}>Enviar </button>
            </form>
          )}
          </Formik>  
        </div>
    )
}
