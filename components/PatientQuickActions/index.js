import React from 'react'
import CardButtonPatient from '../CardButtonPatient'
import DeleteButton from '../DeleteButton'
import PaymentHistoryButton from '../PaymentHistoryButton'

export default function PatientQuickActions (props) {
  const { addAppointment, appointments, clinicalRecord, payments, deletePatient, patientId,dentistId } = props
  return (
    <div className='flex'>
      <CardButtonPatient
        title='Agregar cita'
        image={addAppointment}
        reference={`/newappointment?dentistId=${dentistId}&patientId=${patientId}`}
      />
      <CardButtonPatient
        title='Consultar citas'
        image={appointments}
        reference={`/patients/${patientId}`}
      />
      <CardButtonPatient
        title='Historial clínico'
        image={clinicalRecord}
        reference={`/medicalrecords/${patientId}`}
      />
      <PaymentHistoryButton
        image={payments}
        reference={`/payments/${patientId}?dentistId=${dentistId}`}
      />
      <DeleteButton
        image={deletePatient}
      />
    </div>
  )
}
