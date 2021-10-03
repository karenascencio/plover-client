// aqui ponemos todas las funciones para hacer peticiones y las
// exportamos en un objecto al final, arreglamos el deploy
//const BASE_URL = 'https://plover-api-humble-nyala-nw.mybluemix.net'
const BASE_URL = 'http://localhost:8080'
const api = {
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
	  console.log(response)
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
    async getAppointmentByDentistId (id) {
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
  
    async patchAppointment (appointment,id) {
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
      async postPatient(patient){
      const config = {	
        method:'POST',
        headers:{
          'Accept': 'application/json',
        'Content-Type': 'application/json'	
        },
        body:JSON.stringify(patient)
      }
      const newPatient = await fetch(`${BASE_URL}/patients`,config)
      const response = await newPatient.json()
      console.log(response)
      },
      async getAllAppointmentsIds(){
      const response = await fetch('https://plover-api-humble-nyala-nw.mybluemix.net/appointments')
      const json = await response.json()
      const ids = json.data.appointments.map(appointment=>appointment._id)
      return ids
      },
      async getAllPatientsIds(){
        const response = await fetch('https://plover-api-humble-nyala-nw.mybluemix.net/patients')
        const json = await response.json()  
        const ids = json.data.patients.map(patient=>patient._id)
        return ids
  
      }
  
  
  }
  
  export default api
