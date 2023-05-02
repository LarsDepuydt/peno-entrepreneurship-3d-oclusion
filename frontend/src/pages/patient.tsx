import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/PatientPage.module.scss';

import { HeaderDoctor } from '../components/header/header';
import { SinglePatient as Patient } from '../components/patient/patient-individual-overview';
import { useEffect } from 'react';
import { SidebarDoctor } from '../components/header/sidebar';
import Head from 'next/head';

import { useQuery } from '@tanstack/react-query';
import { getAllPatients } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';


  interface PatientData {
    id: number;
    firstName: string;
    lastName: string;
    pinned: boolean; 
    notes: string;
    dentistId: number; 
  }

  export default function PatientPage(this: any) {
    let DentistID = process.env.REACT_APP_DENTIST_ID!;
    console.log('dentist id is ' + process.env.REACT_APP_DENTIST_ID);
    console.log('patient id is ' + process.env.REACT_APP_PATIENT_ID);

    const { data, refetch } = useQuery(getAllPatients.useQuery( { enabled: true }));

    useEffect(() => {
      return () => {
        // cleanup function to cancel subscription
        data && refetch();
        console.log('cleanup');
      };
    }, [data]);

    

    const iteratePatient = (patient : PatientData) => {
        return (
          <Patient
          id={patient.id}
          patientfirstname={patient.firstName}
          patientlastname={patient.lastName}
          pinned = {patient.pinned} 
          notespatient = {patient.notes}                 
          doctorid={patient.dentistId}
        />
        )
    }

    const allPatients = () => {
      let arrayPatients: JSX.Element[] = []

      if (data && data.patients) {
        data.patients.forEach(patient => {
          if (patient.dentistId == parseInt(DentistID)) {
            arrayPatients.push(iteratePatient(patient))
          } 
        });
      }
      return arrayPatients;
    }

    return (
      <>
      <Head>
        <title>relu</title>
        <link rel="icon" href="/relu_icon.ico" />
      </Head>

      <div>
          <div className={styles.scansWrapper}>
            {allPatients()}

            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
            <div className={styles.patient_filler}></div>
          </div>
          <SidebarDoctor />
          <HeaderDoctor />
        </div>
    </>
    )
}

