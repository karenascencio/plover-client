// aqui ponemos todas las funciones para hacer peticiones y las
// exportamos en un objecto al final, arreglamos el deploy
const BASE_URL = 'https://plover-api-humble-nyala-nw.mybluemix.net'
//const BASE_URL = 'http://localhost:8080'
const api = {
  parseJwt (token) {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))

    return JSON.parse(jsonPayload)
  },
  async signIn (dentistData) {
    const signin = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application7json'
      },
      body: JSON.stringify(dentistData)
    }
    const signInDentist = await fetch(`${BASE_URL}/dentists/register`, signin)
    const response = await signInDentist.json()
    console.log('register', response)
    return response
  },
  async login (loginData) {
	  const login = {
		  method: 'POST',
		  headers: {
			  Accept: 'application/json',
			  		  'Content-Type': 'application/json'
		  },
		  body: JSON.stringify(loginData)
	  }
	  const accountLogin = await fetch(`${BASE_URL}/auth/login`, login)
	  const response = await accountLogin.json()
	  console.log('api', response.success)
    return response
  },
  async recovery (email) {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
		  'Content-Type': 'application/json'
      },
      body: JSON.stringify(email)
    }
    const recoveryEmail = await fetch(`${BASE_URL}/recovery`, config)
    const response = await recoveryEmail.json()
    console.log(response)
	  },
  async resetPassword (newPassword, id) {
    const passwordData = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPassword, id)
    }
    const resetCredentials = await fetch(`${BASE_URL}/recovery/reset/${id}`, passwordData)
    const response = await resetCredentials.json()
    console.log(response)
  },
  async getPaymentsByPatientId (id) {
    const response = await fetch(`${BASE_URL}/patients/${id}/payments`)
    const json = await response.json()
    return json.data.paymentsPatient
  },
  async getAppointmentsByPatientId (id) {
    const response = await fetch(`${BASE_URL}/patients/${id}/appointments`)
    const json = await response.json()
    return json.data.appointmentsPatient
  },
  async getAppointmentsByDentistId (id) {
    const response = await fetch(`${BASE_URL}/dentists/${id}/appointments`)
    const json = await response.json()
    return json.data.appointmentsDentist
  },
  async postPayment (payment) {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payment)
    }
    const newPayment = await fetch(`${BASE_URL}/payments`, config)
    const response = await newPayment.json()
    console.log(response)
  },
  async postAppointment (appointment) {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointment)
    }
    const newPayment = await fetch(`${BASE_URL}/appointments`, config)
    const response = await newPayment.json()
    console.log(response)
  },

  async patchAppointment (appointment, id) {
    const config = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(appointment)
    }
    const newAppointment = await fetch(`${BASE_URL}/appointments/${id}`, config)
    const response = await newAppointment.json()
    console.log(response)
  },

  async getPatientsById (id) {
    const response = await fetch(`${BASE_URL}/patients/${id}`)
    const json = await response.json()
    return json.data.patient
  },
  async getPatients () {
    const response = await fetch(`${BASE_URL}/patients`)
    const json = await response.json()
    return json.data.patients
  },
  async getDentists () {
    const response = await fetch(`${BASE_URL}/dentists`)
    const json = await response.json()
    return json.data.dentists
  },
  async getDentistById (id) {
    const response = await fetch(`${BASE_URL}/dentists/${id}`)
    const json = await response.json()
    return json.data.dentist
  },
  async getAppointmentById (id) {
    const response = await fetch(`${BASE_URL}/appointments/${id}`)
    const json = await response.json()
    return json.data.appointment
  },
  async getPatientsByDentistId (id) {
    const response = await fetch(`${BASE_URL}/dentists/${id}/patients`)
    const json = await response.json()
    return json.data.patientsByDentist
  },
  async postPatient (patient) {
    const config = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    }
    const newPatient = await fetch(`${BASE_URL}/patients`, config)
    const response = await newPatient.json()
    console.log(response)
  },
  async getAllAppointmentsIds () {
    const response = await fetch('https://plover-api-humble-nyala-nw.mybluemix.net/appointments')
    const json = await response.json()
    const ids = json.data.appointments.map(appointment => appointment._id)
    return ids
  },
  async getAllPatientsIds () {
    const response = await fetch('https://plover-api-humble-nyala-nw.mybluemix.net/patients')
    const json = await response.json()
    const ids = json.data.patients.map(patient => patient._id)
    return ids
  },
  async getDentists () {
    const response = await fetch(`${BASE_URL}/dentists`)
    const json = await response.json()
    return json.data.dentist
  },
  async patchDentist (dentist, id) {
    const config = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dentist)
    }
    const updatedDentist = await fetch(`${BASE_URL}/dentists/${id}`, config)
    const response = await updatedDentist.json()
    return response
  },
  async deletePatient (id) {
    const config = { method: 'DELETE' }
    const deletedPatient = await fetch(`${BASE_URL}/patients/${id}`, config)
    return deletedPatient
  },
  async changePassword (dataUser) {
    const config = {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataUser)
    }
    const {id} = dataUser
    const updatedPassword = await fetch(`${BASE_URL}/dentists/changepassword/${id}`, config)
    const response = await updatedPassword.json()
    console.log('change pass', response)
    return response
  }
}

export default api
