<RegisterInput
label='Número de celular'
name='telephoneNumber'
type='text'
placeholder='(123)-123-1234'
/>
{/* Section 2 */}
<div className='mt-90px mb-50px border-b-2 border-black'>
<h3 className='text-plover-blue text-center text-2xl'>Datos del consultorio</h3>
</div>
<RegisterInput
label='Nombre del consultorio'
name='clinicName'
type='text'
placeholder='Consultorios Plover'
/>
<RegisterInput
label='Número telefónico del consultorio'
name='clinicNumber'
type='text'
placeholder='(123)-123-1234'
/>
<RegisterInput
label='Correo del consultorio'
name='clinicEmail'
type='email'
placeholder='consultoriosPlover@plover.com'
/>
<RegisterInput
label='Dirección del consultorio'
name='clinicAndress'
type='text'
placeholder='Jupiter #5'
/>
<RegisterInput
label='Colonia'
name='neihborhood'
type='text'
placeholder='Vialactea'
/>
<RegisterInput
label='Codigo Postal C.P.'
name='zipCode'
type='number'
placeholder='8080'
/>
{/* Section 3 */}
<div className='mt-90px mb-50px border-b-2 border-black'>
<h3 className='text-plover-blue text-center text-2xl'>Datos Profesionales</h3>
</div>
<RegisterInput
label='Licenciatura'
name='degree'
type='string'
placeholder='Cirujano Dentista'
/>
<RegisterInput
label='Universidad de egreso'
name='college'
type='string'
placeholder='Universidad Rio Nilo'
/>
<RegisterInput
label='Cedula profesional'
name='profesionalLicense'
type='string'
placeholder=''
/>
{/* Inputs Password */}
<div className='mt-90px mb-50px  border-b-2 border-black mb-50px'>
<h3 className='text-plover-blue text-center text-2xl'>Registro de cuenta</h3>
</div>
<RegisterInput
label='Correo para registrar la cuenta'
name='email'
type='email'
placeholder='plover@dev.com'
/>




initialValues={{
    name: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    telephoneNumber: '',
    clinicName: '',
    clinicNumber: '',
    clinicAdress: '',
    neighborhood: '',
    zipCode: '',
    clinicEmail: '',
    degree: '',
    college: '',
    profesionalLicense: ''
  }}


  email: Yup.string()
  .email('Introduce un correo valido')
  .required('Correo es necesario para registrar la cuenta')
  .matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Ingresa un correo valido'
  ),
telephoneNumber: Yup.string()
  .required('El número es necesario')
  .matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    'Introduce solo números'
  ),
clinicName: Yup.string()
  .max(50, 'El nombre del debe tener 50 o menos caracteres')
  .min(2, 'El nombre del consultorio debe tener entre 2 o 50 caracteres')
  .required('Este campo esta vacio'),
clinicNumber: Yup.string()
  .required('El número es necesario')
  .matches(
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
    'Introduce solo números'
  ),
clinicAdress: Yup.string()
  .max(100, 'El nombre del debe tener 100 o menos caracteres')
  .min(5, 'El nombre del consultorio debe tener entre 5 o 100 caracteres')
  .required('Este campo esta vacio'),
neighborhood: Yup.string()
  .max(40, 'El nombre del debe tener 40 o menos caracteres')
  .min(5, 'El nombre del consultorio debe tener entre 5 o 40 caracteres')
  .required('Este campo esta vacio'),
zipCode: Yup.number()
  .required('Se debe ingresar el codigo postal de su consultorio'),
clinicEmail: Yup.string()
  .email()
  .matches(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'Ingresa un correo valido'
  ),
degree: Yup.string()
  .min(8, ' se debe ingresar al menos 8 caracteres')
  .max(50, 'El campo debe contener al 50 caracteres o menos')
  .required('La licenciatura debe ser llenada'),
college: Yup.string()
  .min(8, ' se debe ingresar al menos 8 caracteres')
  .max(50, 'El campo debe contener al 50 caracteres o menos')
  .required('Required'),
profesionalLicense: Yup.string()
  .min(7, 'La cedula profesional debe tener al menos entre 7 y 10 caracteres')
  .max(10, 'la cedula profesional debe tener al menos entre 7 y 10 caracteres')
  .required('Required')