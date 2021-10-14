import React, { useState, useEffect, useContext } from 'react'
import { Formik, getIn } from 'formik'
import FormInput from '../../components/FormInput'
import Textarea from '../../components/Textarea'
import RadioButtons from '../../components/RadioButtons'
import Select from '../../components/Select'

import H1 from '../../components/H1'
import H3 from '../../components/H3'
import NavBarPatient from '../../components/NavBarPatient'
import TitleHeader from '../../components/TitleHeader'
import TextWithLabel from '../../components/TextWithLabel'
import PlainList from '../../components/PlainList'
import AnotationsCard from '../../components/AnotationsCard'
import medicine from '../../public/medicine.png'
import blood from '../../public/blood-bag.png'
import operations from '../../public/surgery-tools.png'
import annotations from '../../public/post-it.png'
import father from '../../public/father.png'
import mother from '../../public/mother.png'
import grandfather from '../../public/grandpa.png'
import grandMother from '../../public/grandma.png'
import couple from '../../public/couple.png'
import brothers from '../../public/brother.png'
import food from '../../public/salad.png'
import brush from '../../public/toothbrushes.png'
import alcohol from '../../public/alcoholic.png'
import cigar from '../../public/cigar.png'
import tattoo from '../../public/tattoo-machine.png'
import higiene from '../../public/hygienic.png'
import oddHabits from '../../public/broken-tooth.png'
import useUserInfo from '../../hooks/useUserInfo'
import useAvailableToken from '../../hooks/useAvailableToken'

import { getAllPatientsIds,
          getPatientById} from '../../lib/api'     


export async function getStaticPaths () {
  const ids = await getAllPatientsIds()
  const paths = ids.map(item => {
    return {
      params: { id: item }
    }
  })

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps (context) {
  const id = context.params.id
  const patient = await getPatientById(id)
  return {
    props: {
      patientFetched: patient
    }
  }
}

export default function Medicalrecord ({ patientFetched }) {
  useAvailableToken()
  console.log(patientFetched)
  const [id,rol] = useUserInfo()
  console.log(patientFetched)
  const {idDentist,_id:idPatient} = patientFetched
  const [formulario, setFormulario] = useState('General Information')
  function handleOption (value) {
    setFormulario(value)
  }

  function capitalizeName (string) {
    return string.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1)).join(' ')
  }
  function capitalize (string) {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (

    <div className='flex flex-col sm:flex-row '>
      <NavBarPatient 
        rol={rol}
        formulario={formulario} 
        handleOption={handleOption} 
        idDentist={idDentist}
        idPatient={idPatient}
        />
      <main className='flex mt-16 sm:mt-1 justify-center flex-grow sm:w-65vw mx-11'>
        <div className='w-full max-w-screen-lg flex flex-col'>
          {/* aqui comienza el formulario de informacion general */}
          {formulario == 'General Information' && (
            <div id='General Information' className='pt-14 md:pt-10'>
              <div className='flex flex-col'>
                <TitleHeader
                  pageTitle='Información general'
                  secondaryText=''
                />
                <H3 textTitle='Paciente' textColor='plover-blue' />
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5 pb-8 border-b border-lighter-gray'>
                <TextWithLabel
                  textId='names'
                  textLabel='Nombres'
                  textValue={capitalizeName(patientFetched.name)}
                />
                <TextWithLabel
                  textId='lastNames'
                  textLabel='Apellidos'
                  textValue={capitalizeName(patientFetched.lastName)}
                />
                <TextWithLabel
                  textId='gender'
                  textLabel='Género'
                  textValue={capitalizeName(patientFetched.gender)}
                />
                <TextWithLabel
                  textId='age'
                  textLabel='Edad'
                  textValue={patientFetched.age + ' años'}
                />
                <TextWithLabel
                  textId='height'
                  textLabel='Altura'
                  textValue={patientFetched.height + ' cm'}
                />
                <TextWithLabel
                  textId='weigth'
                  textLabel='Peso'
                  textValue={patientFetched.weight + ' kg'}
                />
                <TextWithLabel
                  textId='bloodType'
                  textLabel='Tipo de sangre'
                  textValue={patientFetched.bloodType}
                />
                <TextWithLabel
                  textId='maritalStatus'
                  textLabel='Estado civil'
                  textValue={capitalizeName(patientFetched.maritalStatus)}
                />
              </div>
              <H3 textTitle='Dirección' textColor='plover-blue' />
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5 pb-8 border-b border-lighter-gray'>
                <TextWithLabel
                  textId='address.state'
                  textLabel='Estado'
                  textValue={capitalizeName(patientFetched.address.state)}
                />
                <TextWithLabel
                  textId='address.city'
                  textLabel='Ciudad'
                  textValue={capitalizeName(patientFetched.address.city)}
                />
                <TextWithLabel
                  textId='address.neighborhood'
                  textLabel='Colonia'
                  textValue={capitalizeName(patientFetched.address.neighborhood)}
                />
                <TextWithLabel
                  textId='address.street'
                  textLabel='Calle'
                  textValue={capitalizeName(patientFetched.address.street)}
                />
                <TextWithLabel
                  textId='address.streetNumber'
                  textLabel='Número exterior'
                  textValue={patientFetched.address.streetNumber}
                />
                <TextWithLabel
                  textId='address.innerNumber'
                  textLabel='Número interior'
                  textValue={patientFetched.address.innerNumber}
                />
              </div>

              <H3 textTitle='Médico familiar' textColor='plover-blue' />
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5 pb-8 border-b border-lighter-gray'>
                <TextWithLabel
                  textId='familyPractitioner.name'
                  textLabel='Nombres'
                  textValue={capitalizeName(patientFetched.familyPractitioner.name)}
                />
                <TextWithLabel
                  textId='familyPractitioner.lastName'
                  textLabel='Apellidos'
                  textValue={capitalizeName(patientFetched.familyPractitioner.lastName)}
                />
                <TextWithLabel
                  textId='familyPractitioner.email'
                  textLabel='Email'
                  textValue={patientFetched.familyPractitioner.email}
                />
                <TextWithLabel
                  textId='familyPractitioner.phoneNumber'
                  textLabel='Número de teléfono'
                  textValue={patientFetched.familyPractitioner.phoneNumber}
                />
              </div>

              <H3 textTitle='Persona a cargo' textColor='plover-blue' />
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5 pb-8 border-b border-lighter-gray'>
                <TextWithLabel
                  textId='personInCharge.name'
                  textLabel='Nombres'
                  textValue={capitalizeName(patientFetched.personInCharge.name)}
                />
                <TextWithLabel
                  textId='personInCharge.lastName'
                  textLabel='Apellidos'
                  textValue={capitalizeName(patientFetched.personInCharge.lastName)}
                />
                <TextWithLabel
                  textId='personInCharge.email'
                  textLabel='Email'
                  textValue={patientFetched.personInCharge.email}
                />
                <TextWithLabel
                  textId='personInCharge.phoneNumber'
                  textLabel='Número de teléfono'
                  textValue={patientFetched.personInCharge.phoneNumber}
                />

              </div>
            </div>)}
          {/* aqui termina el formulario de informacion general */}

          {/* aqui comineza el formulario de antecedentes famililares */}
          {formulario == 'Family Background' && (
            <div id='Family Background' className='pt-14 md:pt-10'>
              <div className='flex flex-col'>
                <TitleHeader
                  pageTitle='Antecedentes Familiares'
                  secondaryText=''
                />
                <H3 textTitle='Patologías' textColor='plover-blue' />
              </div>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10 pb-8'>
                <div className='flex flex-col justify-between border-b border-lighter-gray'>
                  <PlainList
                    textId='familyBackground.father.pathologies'
                    textLabel='Padre'
                    textValues={patientFetched.familyBackground.father.pathologies}
                  />
                  <AnotationsCard
                    label='Anotaciones'
                    text={capitalize(patientFetched.familyBackground.father.description)}
                    image={father}
                  />

                  {/* validamos que el campo no venga vacio */}
                  {/* touched.nombres && errors.nombres && <div>{errors.nombres}</div> */}

                </div>
                <div className='flex flex-col justify-between border-b border-lighter-gray '>
                  <PlainList
                    textId='familyBackground.mother.pathologies'
                    textLabel='Madre'
                    textValues={patientFetched.familyBackground.mother.pathologies}
                  />
                  <AnotationsCard
                    label='Anotaciones'
                    text={capitalize(patientFetched.familyBackground.mother.description)}
                    image={mother}
                  />
                </div>
                <div className='flex flex-col justify-between border-b border-lighter-gray'>
                  <PlainList
                    textId='familyBackground.grandFather.pathologies'
                    textLabel='Abuelo'
                    textValues={patientFetched.familyBackground.grandFather.pathologies}
                  />
                  <AnotationsCard
                    label='Anotaciones'
                    text={capitalize(patientFetched.familyBackground.grandFather.description)}
                    image={grandfather}
                  />
                </div>

                <div className='flex flex-col justify-between border-b border-lighter-gray'>
                  <PlainList
                    textId='familyBackground.grandMother.pathologies'
                    textLabel='Abuela'
                    textValues={patientFetched.familyBackground.grandMother.pathologies}
                  />
                  <AnotationsCard
                    label='Anotaciones'
                    text={capitalize(patientFetched.familyBackground.grandMother.description)}
                    image={grandMother}
                  />
                </div>

                <div className='flex flex-col justify-between border-b border-lighter-gray'>
                  <PlainList
                    textId='familyBackground.partner.pathologies'
                    textLabel='Pareja'
                    textValues={patientFetched.familyBackground.partner.pathologies}
                  />
                  <AnotationsCard
                    label='Anotaciones'
                    text={capitalize(patientFetched.familyBackground.partner.description)}
                    image={couple}
                  />
                </div>

                <div className='flex flex-col justify-between  border-b border-lighter-gray'>
                  <PlainList
                    textId='familyBackground.brothers.pathologies'
                    textLabel='Hermanos'
                    textValues={patientFetched.familyBackground.brothers.pathologies}
                  />
                  <AnotationsCard
                    label='Anotaciones'
                    text={capitalize(patientFetched.familyBackground.brothers.description)}
                    image={brothers}
                  />
                </div>
              </div>
            </div>)}
          {/* aqui termina el formulario de antecedentes familiares */}

          {/* aqui comienza el formulario de antecedentes patologicos */}
          {formulario == 'Pathological Background' && (
            <div id='Pathological Background' className='pt-14 md:pt-10'>
              <TitleHeader
                pageTitle='Antecedentes patológicos'
                secondaryText=''
              />
              <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-10 pb-8 border-b border-lighter-gray'>
                <PlainList
                  textId='pathologicalBackground.currentDiseases'
                  textLabel='Enfermedades actuales'
                  textValues={patientFetched.pathologicalBackground.currentDiseases}
                />
                <PlainList
                  textId='pathologicalBackground.previousDiseases'
                  textLabel='Enfermedades previas'
                  textValues={patientFetched.pathologicalBackground.previousDiseases}
                />
                <PlainList
                  textId='pathologicalBackground.drugAllergies'
                  textLabel='Alergias a medicamentos'
                  textValues={patientFetched.pathologicalBackground.drugAllergies}
                />
                <PlainList
                  textId='pathologicalBackground.currentMedications'
                  textLabel='Medicamentos tomados actualmente'
                  textValues={patientFetched.pathologicalBackground.currentMedications}
                />
                <AnotationsCard
                  label='Pastillas anticonceptivas'
                  text={
                            patientFetched.pathologicalBackground.birthControlPills == 'si'
                              ? 'El paciente toma pastillas anticonceptivas actualmente'
                              : 'El paciente no toma pastillas anticonceptivas actualmente'
                            }
                  image={medicine}
                />
                <AnotationsCard
                  label='Operaciones recientes'
                  text={
                            patientFetched.pathologicalBackground.previousOperations == 'si'
                              ? 'El paciente se ha operado recientemente'
                              : 'El paciente no se ha operado recientemente'
                            }
                  image={operations}
                />
                <AnotationsCard
                  label='Donacion de sangre'
                  text={
                            patientFetched.pathologicalBackground.bloodDonation == 'si'
                              ? 'El paciente ha donado sangre en los utlimos 6 meses'
                              : 'El paciente no ha donado sangre en los ultimos 6 meses'
                            }
                  image={blood}
                />
                <AnotationsCard
                  label='Observaciones'
                  text={capitalize(patientFetched.pathologicalBackground.observations)}
                  image={annotations}
                />
              </div>
            </div>)}
          {/* aqui termina el formulario de antecedentes patologicos */}

          {/* aqui comienza el formulario de antecedentes no patologicos */}
          {formulario == 'NonPathological Background' && (
            <div id='NonPathological Background' className='pt-14 md:pt-10'>
              <TitleHeader
                pageTitle='Antecedentes no patológicos'
                secondaryText=''
              />
              <div className='mt-10 grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'>

                <PlainList
                  textId='pathologicalBackground.vaccines'
                  textLabel='Vacunas'
                  textValues={patientFetched.nonPathologicalBackground.vaccines}
                />
                <PlainList
                  textId='pathologicalBackground.addictions'
                  textLabel='Adicciones'
                  textValues={patientFetched.nonPathologicalBackground.addictions}
                />
                <PlainList
                  textId='nonPathologicalBackground.services'
                  textLabel='Servicios basicos'
                  textValues={patientFetched.nonPathologicalBackground.services}
                />
                <AnotationsCard
                  label='Alimentacion'
                  text={patientFetched.nonPathologicalBackground.feeding == 'buena'
                    ? 'El paciente cuenta con buena alimentacion'
                    : patientFetched.nonPathologicalBackground.feeding == 'regular'
                      ? 'El paciente tiene una alimentacion regular'
                      : 'El paciente tiene una alimentacion mala'}
                  image={food}
                />

                <AnotationsCard
                  label='Higiene dental'
                  text={`El paciente se cepilla los dientes ${patientFetched.nonPathologicalBackground.toothBrushingFrequency} veces al dia`}
                  image={brush}
                />
                <AnotationsCard
                  label='Consumo de alcohol'
                  text={capitalize(patientFetched.nonPathologicalBackground.alcoholConsumption)}
                  image={alcohol}
                />
                <AnotationsCard
                  label='Consumo de cigarros'
                  text={capitalize(patientFetched.nonPathologicalBackground.cigarConsumption)}
                  image={cigar}
                />
                <AnotationsCard
                  label='Tatuajes recientes'
                  text={patientFetched.nonPathologicalBackground.cigarConsumption == 'si'
                    ? 'El paciente se ha tatuado en los ultimos seis meses'
                    : 'El paciente no se ha tatuado en los ultimos sesi meses'}
                  image={tattoo}
                />
                <AnotationsCard
                  label='Higiene personal'
                  text={patientFetched.nonPathologicalBackground.hygieneDescription}
                  image={higiene}
                />
                <AnotationsCard
                  label='Hábitos extraños'
                  text={patientFetched.nonPathologicalBackground.unusualHabits}
                  image={oddHabits}
                />
                <AnotationsCard
                  label='Observaciónes'
                  text={patientFetched.nonPathologicalBackground.observations}
                  image={annotations}
                />
              </div>
            </div>)}
          {/* aqui termina el formulario de antecedentes no patologiocos */}

        </div>
      </main>
    </div>
  )
}
