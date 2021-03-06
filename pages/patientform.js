import React, { useState, useEffect, useContext } from 'react'
import { Formik, getIn } from 'formik'
import FormInput from '../components/FormInput'
import Textarea from '../components/Textarea'
import RadioButtons from '../components/RadioButtons'
import Select from '../components/Select'
import useAvailableToken from '../hooks/useAvailableToken'
import H1 from '../components/H1'
import H3 from '../components/H3'
import NavBarPatient from '../components/NavBarPatient'
import TitleHeader from '../components/TitleHeader'
import { useRouter } from 'next/router'
import { postPatient } from '../lib/api'
import useUserInfo from '../hooks/useUserInfo'

import swal from 'sweetalert'


// single form
export default function Giform () {
  useAvailableToken()
  const router = useRouter()
  const [id, rol] = useUserInfo()
  console.log('el id es', id)
  console.log('el rol es ', rol)

  const [formulario, setFormulario] = useState('General Information')

  function handleOption (value) {
    setFormulario(value)
  }

  function stringToArray (string) {
    if (typeof string === 'string') {
      return string.split(',').map(item => item.trim()).filter(item => item !== '')
    }
    return []
  }
  function formatPatient (values) {
    console.log(values)
    values.password = values.email.split('@')[0]
    values.age = Number(values.age)
    values.height = Number(values.height)
    values.weight = Number(values.weight)

    values.familyBackground.father.pathologies = stringToArray(values.familyBackground.father.pathologies)
    values.familyBackground.mother.pathologies = stringToArray(values.familyBackground.mother.pathologies)
    values.familyBackground.grandFather.pathologies = stringToArray(values.familyBackground.grandFather.pathologies)
    values.familyBackground.grandMother.pathologies = stringToArray(values.familyBackground.grandMother.pathologies)
    values.familyBackground.partner.pathologies = stringToArray(values.familyBackground.partner.pathologies)
    values.familyBackground.brothers.pathologies = stringToArray(values.familyBackground.brothers.pathologies)
    values.pathologicalBackground.currentDiseases = stringToArray(values.pathologicalBackground.currentDiseases)
    values.pathologicalBackground.previousDiseases = stringToArray(values.pathologicalBackground.previousDiseases)
    values.pathologicalBackground.generalAllergies = stringToArray(values.pathologicalBackground.generalAllergies)
    values.pathologicalBackground.drugAllergies = stringToArray(values.pathologicalBackground.drugAllergies)
    values.pathologicalBackground.currentMedications = stringToArray(values.pathologicalBackground.currentMedications)
    values.nonPathologicalBackground.vaccines = stringToArray(values.nonPathologicalBackground.vaccines)
    values.nonPathologicalBackground.addictions = stringToArray(values.nonPathologicalBackground.addictions)
    values.nonPathologicalBackground.services = stringToArray(values.nonPathologicalBackground.services)
    values.nonPathologicalBackground.alcoholConsumption = values.nonPathologicalBackground.alcoholConsumption.toLowerCase()
    values.nonPathologicalBackground.cigarConsumption = values.nonPathologicalBackground.cigarConsumption.toLowerCase()
    values.idDentist = id
    values.userImage = `https://api.multiavatar.com/${values.name.split(' ')[0]}%20${values.lastName.split(' ')[0]}.png`
    // await postPatient(values)
    return values
  }
  const sendPatient = async (values) => {
    const formatedValues = formatPatient(values)
    console.log(formatedValues)
    // alert(JSON.stringify(formatedValues,null,2))
    await postPatient(formatedValues)
    swal('Nueva Paciente', 'creado exitosamente', 'success', {
      button: {
        className: 'bg-plover-blue',
        visible: false
      },
      timer: 2000
    })
      .then(() => {
        router.push(`/dentists/${id}`)
      })
    // router.push(`/dentists/${id}`)
  }

  return (
    <div className='sm:relative flex flex-col sm:flex-row '>
      <NavBarPatient
        formulario={formulario}
        handleOption={handleOption}
        idDentist={id}
      />
      <main className='sm:absolute right-0 flex w-ful justify-center flex-grow sm:w-60vw mx-11'>
        <div className='w-full max-w-screen-lg flex flex-col'>
          <Formik
            initialValues={{
              name: '',
              lastName: '',
              email: '',
              gender: 'masculino',
              age: '',
              height: '',
              weight: '',
              bloodType: 'A+',
              maritalStatus: 'soltero',
              address: {
                state: '',
                city: '',
                neighborhood: '',
                street: '',
                streetNumber: '',
                innerNumber: ''
              },
              familyPractitioner: {
                name: '',
                lastName: '',
                email: '',
                phoneNumber: ''
              },
              personInCharge: {
                name: '',
                lastName: '',
                email: '',
                phoneNumber: ''
              },
              familyBackground: {
                father: {
                  pathologies: '',
                  description: ''
                },
                mother: {
                  pathologies: '',
                  description: ''
                },
                grandFather: {
                  pathologies: '',
                  description: ''
                },
                grandMother: {
                  pathologies: '',
                  description: ''
                },
                partner: {
                  pathologies: '',
                  description: ''
                },
                brothers: {
                  pathologies: '',
                  description: ''
                }
              },
              pathologicalBackground: {
                currentDiseases: '',
                previousDiseases: '',
                generalAllergies: '',
                drugAllergies: '',
                currentMedications: '',
                previousOperations: 'no',
                bloodDonation: 'no',
                birthControlPills: 'no',
                observations: ''
              },
              nonPathologicalBackground: {
                feeding: 'buena',
                toothBrushingFrequency: '',
                vaccines: '',
                addictions: '',
                alcoholConsumption: 'Nunca he tomado',
                cigarConsumption: 'Nunca he fumado',
                recentTattos: 'si',
                hygieneDescription: '',
                services: '',
                unusualHabits: '',
                observations: ''
              }
            }}

            validate={(values) => {
              const errors = {}
              // validacion de nombre
              if (!values.name) {
                errors.name = 'Por favor ingrese el nombre del paciente'
              } else if (!/^[a-z ,.'-]+$/i.test(values.name)) errors.name = 'El nombre no puede contener numeros ni caracteres especiales'
              // validacion de apellido
              if (!values.lastName) errors.lastName = 'Por favor ingrese los apellidos del paciente'
              else if (!/^[a-z ,.'-]+$/i.test(values.lastName)) errors.lastName = 'Los apellidos no puede contener numeros ni caracteres especiales'
              // validacion por email
              if (!values.email) {
                errors.email = 'Por favor ingrese el nombre del paciente'
              } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
                errors.email = 'Ingresa un email valido'
              }
              // validacion por genero
              if (!values.gender) errors.gender = 'Por favor ingrese el genero del paciente'
              else if (!['masculino', 'femenio', 'otro'].includes(values.gender)) {
                errors.gender = 'el genero tiene que ser alguno de los siguientes: masculino,femenino u otro'
              }
              // validacion por edad
              if (!values.age) errors.age = 'Por favor ingrese la edad del paciente'
              else if (!/^[0-9]{1,3}$/.test(values.age)) {
                errors.age = 'La edad tiene que ser un numero no mayor de tres digitos y positivo'
              }
              // validacion por altura
              if (!values.height) errors.height = 'Por favor ingrese la altura del paciente'
              else if (!/^[0-9]{2,3}$/.test(values.height)) {
                errors.height = 'Ingresa la altura del paciente en centimetros por favor'
              }
              // validacion por peso
              if (!values.weight) errors.weight = 'Ingresa el peso del paciente'
              else if (!/^[0-9]{2,3}$/.test(values.weight)) {
                errors.weight = 'El peso debe estar en kilogramos'
              }
              // validacion de direccion
              // validacion de estado
              if (!values.address.state) {
                errors.state = 'Ingresa el estado donde reside el paciente'
              } else if (!/^[a-z ,.'-]+$/i.test(values.address.state)) {
                errors.state = 'El estado no puede contener numeros ni caracteres especiales'
              }
              // validacion de ciudad
              if (!values.address.city) {
                errors.city = 'Ingresa la ciudad donde reside el paciente'
              } else if (!/^[a-z ,.'-]+$/i.test(values.address.city)) {
                errors.city = 'La ciudad no puede contener numeros ni caracteres especiales'
              }
              // validacion de colonia
              if (!values.address.neighborhood) {
                errors.neighborhood = 'Ingresa la colonia donde reside el paciente'
              } else if (!/^[a-z ,.'-]+$/i.test(values.address.neighborhood)) {
                errors.neighborhood = 'La colonia no puede contener numeros ni caracteres especiales'
              }
              // validacion de calle
              if (!values.address.street) {
                errors.street = 'Ingresa la calle donde reside el paciente'
              } else if (!/^[a-z ,.'-]+$/i.test(values.address.street)) {
                errors.street = 'La caller no puede contener numeros ni caracteres especiales'
              }
              // validacion de numero exterior
              if (!values.address.streetNumber) { errors.streetNumber = 'Ingresa el numero exterior del paciente' } else if (!/^[0-9]{1,5}$/.test(values.address.streetNumber)) {
                errors.streetNumber = 'El numero exterior debe ser un numero positivo con no mas de 5 caracteres y no debe contener caracteres especiales'
              }
              // validaciones de numero interior
              if (!/^[0-9]{1,5}$/.test(values.address.innerNumber)) {
                errors.innerNumber = 'El numero interior debe ser un numero positivo con no mas de 5 caracteres y no debe contener caracteres especiales'
              }
              // validacion de medico familiar
              // validacion de nombre
              if (!/^[a-z ,.'-]+$/i.test(values.familyPractitioner.name)) {
                errors.doctorName = 'El nombre no puede contener numeros ni caracteres especiales'
              }
              if (!/^[a-z ,.'-]+$/i.test(values.familyPractitioner.lastName)) {
                errors.doctorLastName = 'Los apellidos no pueden contener numeros ni caracteres especiales'
              }
              if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.familyPractitioner.email)) {
                errors.doctorEmail = 'Ingresa un email valido'
              }
              if (!/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(values.familyPractitioner.phoneNumber)) {
                errors.doctorPhoneNumber = 'Ingrese un numero de telfono valido'
              }
              // validaciones de persona a cargo
              // validacion de nombre
              if (!values.personInCharge.name) {
                errors.personInChargeName = 'Ingrese el nombre de la persona a cargo del paciente.'
              } else if (!/^[a-z ,.'-]+$/i.test(values.personInCharge.name)) {
                errors.personInChargeName = 'El nombre no puede contener numeros ni caracteres especiales'
              }
              if (!values.personInCharge.lastName) {
                errors.personInChargeLastName = 'Ingresa los apellidos de la persona a cargo del paciente'
              } else if (!/^[a-z ,.'-]+$/i.test(values.personInCharge.lastName)) {
                errors.personInChargeLastName = 'Los apellidos no pueden contener numeros ni caracteres especiales'
              }
              if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.personInCharge.email)) {
                errors.personInChargeEmail = 'Ingresa un email valido'
              }
              if (!values.personInCharge.phoneNumber) {
                errors.personInChargePhoneNumber = 'ingresa el numero telefonico de la persona a cargo del paciente'
              } else if (!/^\(?(\d{3})\)?[-]?(\d{3})[-]?(\d{4})$/.test(values.personInCharge.phoneNumber)) {
                errors.personInChargePhoneNumber = 'Ingrese un numero de telfono valido'
              }
              // regex para validar palabras separadas por comas

              // validacion de numero interior
              // if(!values.address.innerNumber) errors.innerNumber ='Ingresa el numero interior del paciente'
              // else if(!/^[0-9]{1,5}$/.test(values.address.innerNumber)){
              // errors.innerNumber='El numero interior debe ser un numero positivo con no mas de 5 caracteres y no debe contener caracteres especiales'
              // }
              return errors
            }}
          //   onSubmit={async (values) => {
          //     const formatedValues = formatPatient(values)
          //     console.log(formatedValues)
          //     //alert(JSON.stringify(formatedValues,null,2))
          //     await postPatient(formatedValues)
          //     swal("Nueva Paciente", "creado exitosamente", "success",{
          //       button:{
          //       className:'bg-plover-blue'
          //       }
          //     });
          //     //router.push(`/dentists/${id}`)
          // }}
          >
            {({ values, handleSubmit, handleChange, handleBlur, setFieldValue, errors, touched }) => (

              <form className=' mt-16 sm:mt-0'>

                {/* aqui comienza el formulario de informacion general */}
                {formulario == 'General Information' && (
                  <div id='General Information' className='mt-10'>
                    <div className='flex flex-col'>
                      <TitleHeader
                          pageTitle='Informaci??n general'
                          secondaryText=''
                        />
                      <H3 textTitle='Paciente' textColor='plover-blue' />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='name'
                            textLabel='Nombres'
                            textValue={values.name}
                            inputId='name'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* validamos que el campo no venga vacio */}
                          {touched.name && errors.name && <div className='text-plover-blue text-sm'>{errors.name}</div>}
                        </div>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='lastName'
                            textLabel='Apellidos'
                            textValue={values.lastName}
                            inputId='lastName'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {touched.lastName && errors.lastName && <div className='text-plover-blue text-sm'>{errors.lastName}</div>}
                        </div>
                      {/* campo para el correo electronico */}
                      <div className='flex flex-col'>
                          <FormInput
                            textName='email'
                            textLabel='Email'
                            textValue={values.email}
                            inputId='email'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* validamos que el campo no venga vacio */}
                          {touched.email && errors.email && <div className='text-plover-blue text-sm'>{errors.email}</div>}
                        </div>

                      <div className='flex flex-col'>
                          <Select
                            selectID='gender'
                            textName='gender'
                            textValue={values.gender}
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                            selectQuestion='G??nero'
                            outputOptions={['masculino', 'femenino', 'otro']}
                          />
                        </div>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='age'
                            textLabel='Edad'
                            textValue={values.age}
                            inputId='age'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {touched.age && errors.age && <div className='text-plover-blue text-sm'>{errors.age}</div>}
                        </div>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='height'
                            textLabel='Altura'
                            textValue={values.height}
                            inputId='height'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {touched.height && errors.height && <div className='text-plover-blue text-sm'>{errors.height}</div>}
                        </div>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='weight'
                            textLabel='Peso'
                            textValue={values.weight}
                            inputId='weight'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {touched.weight && errors.weight && <div className='text-plover-blue text-sm'>{errors.weight}</div>}
                        </div>

                      <Select
                          selectID='bloodType'
                          textName='bloodType'
                          textValue={values.bloodType}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          selectQuestion='Tipo de sangre'
                          outputOptions={['A+', 'O+', 'B+', 'AB+', 'A-', 'O-', 'B-', 'AB-']}
                        />

                      <Select
                          selectID='maritalStatus'
                          textName='maritalStatus'
                          textValue={values.maritalStatus}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          selectQuestion='Estado civil'
                          outputOptions={['Soltero', 'Casado', 'Divorciado', 'Separaci??n en proceso judicial', 'Viudo', 'Concubinato']}
                        />
                    </div>

                    <H3 textTitle='Direcci??n' textColor='plover-blue' />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='address.state'
                            textLabel='Estado'
                            textValue={values.address.state}
                            inputId='address.state'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* validamos que el campo no venga vacio */}
                          {getIn(touched, 'address.state') && getIn(errors, 'state') && <div className='text-plover-blue text-sm'>{errors.state}</div>}

                        </div>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='address.city'
                            textLabel='Ciudad'
                            textValue={values.address.city}
                            inputId='address.city'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div> */}
                          {getIn(touched, 'address.city') && getIn(errors, 'city') && <div className='text-plover-blue text-sm'>{errors.city}</div>}
                        </div>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='address.neighborhood'
                            textLabel='Colonia'
                            textValue={values.address.neighborhood}
                            inputId='address.neighborhood'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {getIn(touched, 'address.neighborhood') && getIn(errors, 'neighborhood') && <div className='text-plover-blue text-sm'>{errors.neighborhood}</div>}

                        </div>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='address.street'
                            textLabel='Calle'
                            textValue={values.address.street}
                            inputId='address.street'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {getIn(touched, 'address.street') && getIn(errors, 'street') && <div className='text-plover-blue text-sm'>{errors.street}</div>}

                        </div>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='address.streetNumber'
                            textLabel='N??mero exterior'
                            textValue={values.address.streetNumber}
                            inputId='address.streetNumber'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {getIn(touched, 'address.streetNumber') && getIn(errors, 'streetNumber') && <div className='text-plover-blue text-sm'>{errors.streetNumber}</div>}
                        </div>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='address.innerNumber'
                            textLabel='N??mero interior (opcional)'
                            textValue={values.address.innerNumber}
                            inputId='address.innerNumber'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {getIn(touched, 'address.innerNumber') && getIn(errors, 'innerNumber') && <div className='text-plover-blue text-sm'>{errors.innerNumber}</div>}
                        </div>

                    </div>

                    <H3 textTitle='M??dico familiar (opcional)' textColor='plover-blue' />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'>
                      <div className='flex flex-col'>
                          <FormInput
                            textName='familyPractitioner.name'
                            textLabel='Nombres'
                            textValue={values.familyPractitioner.name}
                            inputId='familyPractitioner.name'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {getIn(touched, 'familyPractitioner.name') && getIn(errors, 'doctorName') && <div className='text-plover-blue text-sm'>{errors.doctorName}</div>}
                        </div>
                      {/* validamos que el campo no venga vacio */}
                      {/* touched.nombres && errors.nombres && <div>{errors.nombres}</div> */}
                      <div>
                          <FormInput
                            textName='familyPractitioner.lastName'
                            textLabel='Apellidos'
                            textValue={values.familyPractitioner.lastName}
                            inputId='familyPractitioner.lastName'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div> */}
                          {getIn(touched, 'familyPractitioner.lastName') && getIn(errors, 'doctorLastName') && <div className='text-plover-blue text-sm'>{errors.doctorLastName}</div>}
                        </div>
                      <div>
                          <FormInput
                            textName='familyPractitioner.email'
                            textLabel='Email'
                            textValue={values.familyPractitioner.email}
                            inputId='familyPractitioner.email'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {getIn(touched, 'familyPractitioner.email') && getIn(errors, 'doctorEmail') && <div className='text-plover-blue text-sm'>{errors.doctorEmail}</div>}
                        </div>
                      <div>
                          <FormInput
                            textName='familyPractitioner.phoneNumber'
                            textLabel='N??mero de tel??fono'
                            textValue={values.familyPractitioner.phoneNumber}
                            inputId='familyPractitioner.phoneNumber'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {getIn(touched, 'familyPractitioner.phoneNumber') && getIn(errors, 'doctorPhoneNumber') && <div className='text-plover-blue text-sm'>{errors.doctorPhoneNumber}</div>}
                        </div>
                    </div>
                    <H3 textTitle='Persona a cargo' textColor='plover-blue' />
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'>
                      <FormInput
                          textName='personInCharge.name'
                          textLabel='Nombres'
                          textValue={values.personInCharge.name}
                          inputId='personInCharge.name'
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                      {/* validamos que el campo no venga vacio */}
                      {/* touched.nombres && errors.nombres && <div>{errors.nombres}</div> */}
                      <FormInput
                          textName='personInCharge.lastName'
                          textLabel='Apellidos'
                          textValue={values.personInCharge.lastName}
                          inputId='personInCharge.lastName'
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                      {/* touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div> */}

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
                          textLabel='N??mero de tel??fono'
                          textValue={values.personInCharge.phoneNumber}
                          inputId='personInCharge.phoneNumber'
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                    </div>
                  </div>)}
                {/* aqui termina el formulario de informacion general */}

                {/* aqui comineza el formulario de antecedentes famililares */}
                {formulario == 'Family Background' && (
                  <div id='Family Background' className='mt-10'>
                    <div className='flex flex-col'>
                      <TitleHeader
                          pageTitle='Antecedentes Familiares'
                          secondaryText=''
                        />
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8'>
                      <H3 textTitle='Patolog??as' textColor='plover-blue' />
                      <p className='text-plover-blue pt-10'>Ingrese las enfermedades separadas por comas</p>

                      <div className='flex flex-col border-b border-lighter-gray'>
                          <FormInput
                            textName='familyBackground.father.pathologies'
                            textLabel='Padre'
                            textValue={values.familyBackground.father.pathologies}
                            inputId='familyBackground.father.pathologies'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* validamos que el campo no venga vacio */}
                          {/* touched.nombres && errors.nombres && <div>{errors.nombres}</div> */}
                          <Textarea
                            textName='familyBackground.father.description'
                            textLabel='descripci??n'
                            textValue={values.familyBackground.father.description}
                            inputId='familyBackground.father.description'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div> */}
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
                          {/* validamos que el campo no venga vacio */}
                          {/* touched.nombres && errors.nombres && <div>{errors.nombres}</div> */}
                          <Textarea
                            textName='familyBackground.mother.description'
                            textLabel='descripci??n'
                            textValue={values.familyBackground.mother.description}
                            inputId='familyBackground.mother.description'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div> */}
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
                          {/* validamos que el campo no venga vacio */}
                          {/* touched.nombres && errors.nombres && <div>{errors.nombres}</div> */}
                          <Textarea
                            textName='familyBackground.grandFather.description'
                            textLabel='descripci??n'
                            textValue={values.familyBackground.grandFather.description}
                            inputId='familyBackground.grandFather.description'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div> */}
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
                          {/* validamos que el campo no venga vacio */}
                          {/* touched.nombres && errors.nombres && <div>{errors.nombres}</div> */}
                          <Textarea
                            textName='familyBackground.grandMother.description'
                            textLabel='descripci??n'
                            textValue={values.familyBackground.grandMother.description}
                            inputId='familyBackground.grandMother.description'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div> */}
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
                          {/* validamos que el campo no venga vacio */}
                          {/* touched.nombres && errors.nombres && <div>{errors.nombres}</div> */}
                          <Textarea
                            textName='familyBackground.partner.description'
                            textLabel='descripci??n'
                            textValue={values.familyBackground.partner.description}
                            inputId='familyBackground.partner.description'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div> */}
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
                          {/* validamos que el campo no venga vacio */}
                          {/* touched.nombres && errors.nombres && <div>{errors.nombres}</div> */}
                          <Textarea
                            textName='familyBackground.brothers.description'
                            textLabel='descripci??n'
                            textValue={values.familyBackground.brothers.description}
                            inputId='familyBackground.brothers.description'
                            handleChange={handleChange}
                            handleBlur={handleBlur}
                          />
                          {/* touched.apellidos && errors.apellidos && <div>{errors.apellidos}</div> */}
                        </div>
                    </div>
                  </div>)}
                {/* aqui termina el formulario de antecedentes familiares */}

                {/* aqui comienza el formulario de antecedentes patologicos */}
                {formulario == 'Pathological Background' && (
                  <div id='Pathological Background' className='mt-10'>
                    <TitleHeader
                      pageTitle='Antecedentes patol??gicos'
                      secondaryText=''
                    />
                    <div className='mt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-8 border-b border-lighter-gray'>
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
                          textLabel='??Has tomado pastillas anticonceptivas?'
                          options={['si', 'no']}
                          setFieldValue={setFieldValue}
                          textValue={values.pathologicalBackground.birthControlPills}
                          textName='pathologicalBackground.birthControlPills'
                        />
                      <RadioButtons
                          textLabel='??Te has operado recientemente?'
                          options={['si', 'no']}
                          setFieldValue={setFieldValue}
                          textValue={values.pathologicalBackground.previousOperations}
                          textName='pathologicalBackground.previousOperations'
                        />
                      <RadioButtons
                          textLabel='??Has donado sangre en los ??ltimos 6 meses?'
                          options={['si', 'no']}
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
                {/* aqui termina el formulario de antecedentes patologicos */}

                {/* aqui comienza el formulario de antecedentes no patologicos */}
                {formulario == 'NonPathological Background' && (
                  <div id='NonPathological Background' className='mt-10'>
                    <TitleHeader
                      pageTitle='Antecedentes no patol??gicos'
                      secondaryText=''
                    />
                    <div className='mt-5 grid grid-cols-1 lg:grid-cols-2 gap-x-20 pb-5 border-b border-lighter-gray'>
                      <RadioButtons
                          textLabel='??Como considera su alimentacion?'
                          options={['buena', 'regular', 'mala']}
                          setFieldValue={setFieldValue}
                          textValue={values.nonPathologicalBackground.feeding}
                          textName='nonPathologicalBackground.feeding'
                        />
                      <FormInput
                          textName='nonPathologicalBackground.toothBrushingFrequency'
                          textLabel='??Con qu?? frecuencia se cepilla los dientes?'
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
                          selectQuestion='??Bebe alcohol frecuentemente?'
                          outputOptions={[
                            'Nunca he tomado',
                            'No tomo',
                            'Una vez al d??a',
                            'Una vez cada quince d??as',
                            'Una vez al mes'
                          ]}
                        />
                      <Select
                          selectID='cigarConsumption'
                          textName='nonPathologicalBackground.cigarConsumption'
                          textValue={values.nonPathologicalBackground.cigarConsumption}
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                          selectQuestion='??Con que frecuencia fuma?'
                          outputOptions={[
                            'Nunca he fumado',
                            'No fumo',
                            '10 ?? menos cajetillas por mes',
                            '11 a 20 cajetillas por mes',
                            '21 a 30 cajetillas por mes',
                            '31 cajetillas por mes ?? mas'
                          ]}
                        />
                      <RadioButtons
                          textLabel='??Te has tatuado en los ultimos 6 meses?'
                          options={['Si', 'No']}
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
                          textLabel='Servicios b??sicos'
                          textValue={values.nonPathologicalBackground.services}
                          inputId='nonPathologicalBackground.services'
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />

                      <Textarea
                          textName='nonPathologicalBackground.unusualHabits'
                          textLabel='H??bitos extra??os'
                          textValue={values.nonPathologicalBackground.unusualHabits}
                          inputId='nonPathologicalBackground.unusualHabits'
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />

                      <Textarea
                          textName='nonPathologicalBackground.observations'
                          textLabel='Observaci??nes'
                          textValue={values.nonPathologicalBackground.observations}
                          inputId='nonPathologicalBackground.observations'
                          handleChange={handleChange}
                          handleBlur={handleBlur}
                        />
                    </div>
                    <button type='button' onClick={() => sendPatient(values)} className='my-5 text-white text-sm pb-1 bg-plover-blue w-28 h-30px rounded my-1'>Guardar</button>

                  </div>)}
                {/* aqui termina el formulario de antecedentes no patologiocos */}

              </form>
            )}
          </Formik>
        </div>
      </main>
    </div>
  )
}
