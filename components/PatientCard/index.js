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
  const { patientName, patientImage, idPatient, idDentist } = props

  return (
    <div className='py-3 w-full border-b border-lighter-gray flex flex-col items-center justify-around md:flex-row md:items-center md:justify-between'>
      <PatientCardInfo
        patientName={patientName}
        patientImage={patientImage}
        idPatient={idPatient}
      />
      <PatientQuickActions
        addAppointment={addAppointment}
        appointments={readAppointment}
        clinicalRecord={clinicBackground}
        payments={paymentHistory}
        deletePatient={deleteIcon}
        idPatient={idPatient}
        idDentist={idDentist}
      />
    </div>
  )
}
