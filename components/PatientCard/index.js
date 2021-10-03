import React from 'react'
// My components
import PatientCardInfo from '../PatientCardInfo'
import PatientQuickActions from '../PatientQuickActions'
// My images
import addAppointment from '../../public/addAppointment.svg'
import addIcon from '../../public/addIcon.svg'
import readAppointment from '../../public/readAppointment.svg'
import clinicBackground from '../../public/clinicBackground.svg'
import deleteIcon from '../../public/deleteIcon.svg'
import paymentHistory from '../../public/paymentHistory.svg'

export default function PatientCard (props) {
  const { patientName, patientImage, patientId } = props

  return (
    <div className='h-20 w-full border-b border-lighter-gray flex items-center justify-between'>
      <PatientCardInfo
        patientName={patientName}
        patientImage={patientImage}
        patientId={patientId}
      />
      <PatientQuickActions
        addAppointment={addAppointment}
        appointments={readAppointment}
        clinicalRecord={clinicBackground}
        payments={paymentHistory}
        deletePatient={deleteIcon}
        patientId={patientId}
      />
    </div>
  )
}
