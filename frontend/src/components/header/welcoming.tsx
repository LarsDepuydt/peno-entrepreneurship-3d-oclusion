// possibly welcome doctor in the future ?
import styles from '@/styles/PatientPage.module.css';
import styleH from '@/styles/Header.module.css';
import styleSidebar from '@/styles/Sidebar.module.css';

import { useQuery } from '@tanstack/react-query';
import { getDentistById, getPatientById } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useState } from 'react';

export function WelcomingDoctor() {
  let DentistID = process.env.REACT_APP_DENTIST_ID!;

  const { data } = useQuery(getDentistById.useQuery({ id: parseInt(DentistID) }));

  if (data != undefined) {
    return (
      <>
        <p className={styleSidebar.sidebarText}>{'Welcome Dr. '}</p>
        <p className={styleSidebar.sidebarName}>{''.concat(data.firstName, ' ', data.lastName, '\n')}</p>
      </>
    );
  } else {
    return (
      <>
        <p className={styleSidebar.sidebarText}>{'Welcome Dr. '}</p>
        {/* <p className={styleSidebar.sidebarName}>{''.concat(data.firstName, ' ', data.lastName, '\n')}</p> */}
      </>
    );
  }
}

interface GreetingPatient {
  patientfirstname: string;
  patientlastname: string;
}

export function WelcomingPatient() {
  let PatientID = process.env.REACT_APP_PATIENT_ID!;

  const { data } = useQuery(getPatientById.useQuery({ id: parseInt(PatientID) }));

  if (data != undefined) {
    return (
      <>
        <p className={styleSidebar.sidebarText}>{'Welcome. '}</p>
        <p className={styleSidebar.sidebarName}>{''.concat(data.firstName, ' ', data.lastName, '\n')}</p>
      </>
    );
  } else {
    return (
      <>
        <p className={styleSidebar.sidebarText}>{'Welcome. '}</p>
        {/* <p className={styleSidebar.sidebarName}>{''.concat(data.firstName, ' ', data.lastName, '\n')}</p> */}
      </>
    );
  }
}
