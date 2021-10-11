import React from 'react'
import CardButtonPatient from '../CardButtonPatient'
import DeleteButton from '../DeleteButton'
import PaymentHistoryButton from '../PaymentHistoryButton'

export default function PatientQuickActions (props) {
<<<<<<< HEAD
  const { addAppointment, appointments, clinicalRecord, payments, deletePatient, idPatient, idDentist } = props
=======
  const { addAppointment, appointments, clinicalRecord, payments, deletePatient, deleteHandler, idPatient, idDentist } = props
>>>>>>> 97a4d1ecae31d40e2f0375c0260cabe8b3ab1477
  return (
    <div className='flex  mt-4 md:mb-0'>
      <CardButtonPatient
        title='Agregar cita'
        image={addAppointment}
        reference={`/newappointment?idDentist=${idDentist}&idPatient=${idPatient}`}
      />
      <CardButtonPatient
        title='Consultar citas'
        image={appointments}
        reference={`/patients/${idPatient}`}
      />
      <CardButtonPatient
        title='Historial clínico'
        image={clinicalRecord}
        reference={`/medicalrecords/${idPatient}`}
      />
      <PaymentHistoryButton
        image={payments}
        reference={`/payments/${idPatient}?idDentist=${idDentist}`}
      />
      <DeleteButton
        image={deletePatient}
        deleteHandler={deleteHandler}
        idPatient={idPatient}
      />
    </div>
  )
}
