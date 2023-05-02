import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/PatientPage.module.scss';

import { HeaderDoctor } from '../components/header/header';
import { SinglePatient as Patient } from '../components/patient/patient-individual-overview';
//import teeth3d from '../../public/3d-teeth.jpg';
import { useRouter } from 'next/router';
import { StaticImageData } from 'next/image';
import { FC, useEffect, useState } from 'react';
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
    picture: StaticImageData;
  }

  interface PatientDatatijdelijk {
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

    const { data, refetch } = useQuery(getAllPatients.useQuery());

    useEffect(() => {
      return () => {
        // cleanup function to cancel subscription
        console.log('cleanup');
      };
    }, []);

    

    const iteratePatient = (patient : PatientDatatijdelijk) => {
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


        
/*
            {data?.map((patient: React.ReactElement, index: number) => (
                <div key={`patient${index + 1}`}>
                  <Patient
                    id={patient.props.id}
                    patientfirstname={patient.props.patientfirstname}
                    patientlastname={patient.props.patientlastname}
                    pinned = {patient.props.pinned} 
                    notespatient = {patient.props.notes}                 
                    doctorid={patient.props.doctorid}
                  />
                </div>
            ))}
*/
  
  

/*
const patients = [
  {
    patient41: (
      <Patient
        id={10}
        patientfirstname={'Jos'}
        patientlastname={'Van de Velde'}
        pinned = {true}
        notespatient = {'Geboortedatum 10/05/1957'}
        doctorid={120}
        picture={teeth3d}
      />
    ),
    patient12: (
      <Patient
        id={2}
        patientfirstname={'Anna'}
        patientlastname={'Janssens'}
        pinned = {false}
        notespatient = {'Doorgestuurd van Dr. Deroose'}
        doctorid={120}
        picture={teeth3d}

      />
    ),
    patient13: (
      <Patient
        id={313}
        patientfirstname={'Josephine'}
        patientlastname={'De Goter'}
        pinned = {false}
        notespatient = {'Eerste consultatie gepland na de zomer 2023.'}
        doctorid={118}
        picture={teeth3d}
      />
    ),
  },
];
*/

// const filteredPatients = patients
//   .flatMap((obj) => Object.values(obj)) // flatten the array of objects into an array of patients
//   .reduce((acc, patient) => {
//     const foundPatient = acc.find((p) => p.props.id === patient.props.id);
//     if (!foundPatient) {
//       acc.push(patient);
//     }
//     return acc;
//   }, []);
