//aqui ponemos todas las funciones para hacer peticiones y las
//exportamos en un objecto al final, arreglamos el deploy
const BASE_URL = 'https://plover-api-humble-nyala-nw.mybluemix.net'
//const BASE_URL = 'http://localhost:8080'
let api = {
	async getPaymentsByPatientId(id) {
		const response = await fetch(`${BASE_URL}/patients/${id}/payments`)
  		const json = await response.json()
  		return json.data.paymentsPatient
	},
	async getAppointmentsByPatientId(id){
		const response =  await fetch(`${BASE_URL}/patients/${id}/appointments`)
		const json = await response.json()
		return json.data.appointmentsPatient
	},
	async postPayment(payment){
		const config = {	
					method:'POST',
					headers:{
						'Accept': 'application/json',
      			'Content-Type': 'application/json'	
					},
					body:JSON.stringify(payment)
				}
		const newPayment = await fetch(`${BASE_URL}/payments`,config)
		const response = await newPayment.json()
		console.log(response)
	},
	async postAppointment(appointment){
		const config = {	
					method:'POST',
					headers:{
						'Accept': 'application/json',
      			'Content-Type': 'application/json'	
					},
					body:JSON.stringify(appointment)
				}
		const newPayment = await fetch(`${BASE_URL}/appointments`,config)
		const response = await newPayment.json()
		console.log(response)
	},

	  async getPatientsById (id) {
		const response = await fetch (`${BASE_URL}/patients/${id}`)
		const json = await response.json()
		return json.data.patient
	  },
	  async getPatients () {
		const response = await fetch (`${BASE_URL}/patients`)
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
	  }

}

export default api
