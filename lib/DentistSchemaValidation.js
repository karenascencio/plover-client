import * as Yup from 'yup'

export const dentistSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Debe contener al menos 2 caracteres')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'El campo de apellidos no tiene ningun caracter')
    .required('Required'),
  gender: Yup.string()
    .oneOf(
      ['femenino', 'masculino', 'otro'],
      'Escoge una de las opciones'
    )
    .required('Required'),
  email: Yup.string()
    .email('Introduce un correo valido')
    .required('Correo es necesario para registrar la cuenta'),
  telephoneNumber: Yup.string()
    .required('El número es necesario')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Introduce solo números'
    ),
  clinicName: Yup.string()
    .min(2, 'Debe contener al menos 2 caracteres')
    .required('Required'),
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
  zipCode: Yup.string()
    .required('Este campo esta vacio'),
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
    .required('Required'),
  password: Yup.string()
    .required('Se debe ingresar una contraseña')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe contener al menos una letra mayúscula, una minúscula, un digito y un caracter especial(?@/.. etc)'
    ),
  comparePassword: Yup.string()
    .required('Se debe confirmar la contraseña')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser igual')
})
