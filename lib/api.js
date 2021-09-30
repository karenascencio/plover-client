// aqui ponemos todas las funciones para hacer peticiones y las
// exportamos en un objecto al final
<<<<<<< HEAD
const BASE_URL = 'http://localhost:8080'
=======
const BASE_URL = 'http://plover-api-humble-nyala-nw.mybluemix.net'
>>>>>>> a6734b24fd866779e29330860116bbe74d0281e0
const api = {
  async getPaymentsByPatientId (id) {
    const response = await fetch(`${BASE_URL}/patients/${id}/payments`)
    const json = await response.json()
    return json.data.paymentsPatient
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
<<<<<<< HEAD
=======
  },
  async getPatientsByDentistId (id) {
    const response = await fetch(`${BASE_URL}/dentists/${id}/patients`)
    const json = await response.json()
    return json.data.patientsByDentist
>>>>>>> a6734b24fd866779e29330860116bbe74d0281e0
  }
}

export default api
