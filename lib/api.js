//aqui ponemos todas las funciones para hacer peticiones y las
//exportamos en un objecto al final
const BASE_URL = 'https://plover-api-humble-nyala-nw.mybluemix.net'
let api = {
	async getPaymentsByPatientId(id) {
		const response = await fetch(`${BASE_URL}/patients/${id}/payments`)
  	const json = await response.json()
  	return json.data.paymentsPatient
	}
}

export default api

