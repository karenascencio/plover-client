//aqui ponemos todas las funciones para hacer peticiones y las
//exportamos en un objecto al final, arreglamos el deploy
const BASE_URL = 'https://plover-api-humble-nyala-nw.mybluemix.net'
let api = {
	async getPaymentsByPatientId(id) {
		const response = await fetch(`${BASE_URL}/patients/${id}/payments`)
  	const json = await response.json()
  	return json.data.paymentsPatient
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
	}

}

export default api

