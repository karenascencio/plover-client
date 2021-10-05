import * as Yup from 'yup'

export const dentistSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Debe contener al menos 2 caracteres')
    .required('Required'),
  lastName: Yup.string()
    .min(2, 'El campo de apellidos no tiene ningun caracter')
    .required('Required'),
  birthDate: Yup.string()
    .max(40, 'debe contener 40 caracteres o menos')
    .required('Required'),
  gender: Yup.string()
    .required('required'),
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
    .min(10, 'El número debe contener al menos 10 digitos')
    .required('Este número es donde sus pacientes se contactaran con usted, debe ser llenado')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Número invalido'
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
    .max(10, 'la ceduhttp://localhost:3000/dentist-register?name=change+here&lastName=change+here&birthDate=change+here&gender=change+here&email=change+here&telephoneNumber=change+here&clinicName=change+here&clinicNumber=change+here&clinicAdress=change+here&neighborhood=change+here&zipCode=change+here&clinicEmail=change+here&degree=change+here&college=change+here&profesionalLicense=change+here&password=&verifyPassword=la profesional debe tener al menos entre 7 y 10 caracteres')
    .required('Required'),
  password: Yup.string()
    .required('Porfavor ingresa tu contraseña')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe contener al menos 8 caracteres, una letra mayuscula, una minuscula, un número y caracter especial'
    ),
  verifyPassword: Yup.string()
    .required('Porfavor reingresa tu contraseña')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben ser iguales')
})
