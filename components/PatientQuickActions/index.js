import React from 'react'
import CardButtonPatient from '../CardButtonPatient'
import DeleteButton from '../DeleteButton'
import PaymentHistoryButton from '../PaymentHistoryButton'

export default function PatientQuickActions (props) {
  const { addAppointment, appointments, clinicalRecord, payments, deletePatient, idPatient,idDentist } = props
  return (
    <div className='flex'>
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
        reference={`/payments/${idPatient}?dentistId=${idDentist}`}
      />
      <DeleteButton
        image={deletePatient}
      />
    </div>
  )
}
