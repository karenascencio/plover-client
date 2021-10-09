import * as Yup from 'yup'

export const dentistSchema = Yup.object({
  name: Yup.string()
    .min(2, 'El nombre debe contener al menos 2 caracteres.')
    .required('El nombre es requerido.'),
  lastName: Yup.string()
    .min(2, 'Los apellidos deben contener al menos 2 caracteres.')
    .required('Los apellidos son un dato requerido.'),
  gender: Yup.string()
    .oneOf(
      ['femenino', 'masculino', 'otro'],
      'Selecciona una de las opciones.'
    )
    .required('El género es requerido.'),
  email: Yup.string()
    .email('Por favor, ingresa un correo valido.')
    .required('El correo electrónico es un dato requerido.'),
  telephoneNumber: Yup.string()
    .required('Por favor, ingresa un número telefónico.')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Ingresa los 10 dígitos del número telefónico.'
    ),
  clinicName: Yup.string()
    .min(2, 'El nombre debe contener al menos 2 caracteres.')
    .required('El nombre de la clínica es requerido.'),
  clinicNumber: Yup.string()
    .required('Por favor, ingresa el número telefónico de la clínica.')
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      'Ingresa los 10 dígitos del número telefónico.'
    ),
  clinicAdress: Yup.string()
    .max(100, 'La dirección debe tener un máximo de 100 caracteres.')
    .min(5, 'La dirección debe contener al menos 5 caracteres.')
    .required('Por favor, ingresa la dirección de la clínica.'),
  neighborhood: Yup.string()
    .max(40, 'La colonia debe tener un máximo de 40 caracteres.')
    .min(5, 'La colonia debe contener al menos 5 caracteres.')
    .required('Por favor, ingresa la colonia.'),
  zipCode: Yup.string()
    .required('El código postal es requerido.'),
  degree: Yup.string()
    .min(8, 'La licenciatura debe contener al menos 8 caracteres.')
    .max(50, 'La licenciatura debe tener un máximo de 50 caracteres.')
    .required('La licenciatura es un dato requerido.'),
  college: Yup.string()
    .min(8, 'La universidad debe contener al menos 8 caracteres.')
    .max(50, 'La universidad debe tener un máximo de 50 caracteres.')
    .required('La universidad es requerida.'),
  profesionalLicense: Yup.string()
    .min(7, 'La cédula profesional debe contener al menos 7 caracteres')
    .max(10, 'La cédula profesional debe tener un máximo de 10 caracteres')
    .required('La cédula profesional es un dato requerido.'),
  password: Yup.string()
    .required('Por favor, ingresa una contraseña.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe contener al menos ocho caracteres, una mayúscula, una minúscula, un dígito y un caracter especial (#, ?, @, /, ...).'
    ),
  comparePassword: Yup.string()
    .required('Por favor, confirma la contraseña.')
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden.')
})

export const loggedPasswordSchema = Yup.object({
  password: Yup.string()
    .required('Por favor, ingresa tu contraseña actual.'),
  newPassword: Yup.string()
    .required('Por favor, ingresa una contraseña.')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'La contraseña debe contener al menos ocho caracteres, una mayúscula, una minúscula, un dígito y un caracter especial (#, ?, @, /, ...).'
    ),
  comparePassword: Yup.string()
    .required('Por favor, confirma la contraseña.')
    .oneOf([Yup.ref('newPassword'), null], 'Las contraseñas no coinciden.')
})
