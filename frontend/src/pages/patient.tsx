import styles from '@/styles/PatientPage.module.scss';

import { HeaderDoctor } from '../components/header/header';
import { SinglePatient as Patient } from '../components/patient/patient-individual-overview';
import { useEffect } from 'react';
import { SidebarDoctor } from '../components/header/sidebar';
import Head from 'next/head';

import { useQuery } from '@tanstack/react-query';
import { getAllPatients } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { Router, useRouter } from 'next/router';

interface PatientData {
  id: number;
  firstName: string;
  lastName: string;
  pinned: boolean;
  notes: string;
  dentistId: number;
}

export default function PatientPage(this: any) {
  const router = useRouter();
  let DentistID = process.env.REACT_APP_DENTIST_ID!;

  const { data, refetch } = useQuery(getAllPatients.useQuery({ enabled: true }));

  const iteratePatient = (patient: PatientData) => {
    return (
      <Patient
        id={patient.id}
        patientfirstname={patient.firstName}
        patientlastname={patient.lastName}
        pinned={patient.pinned}
        notespatient={patient.notes}
        doctorid={patient.dentistId}
      />
    );
  };

  useEffect(() => {
    if (DentistID == undefined) {
      DentistID == undefined && router.push('/redirect-page');
    }
  }, [DentistID, router]);

  const allPatients = () => {
    let arrayPatientsPinned: JSX.Element[] = [];
    let arrayPatientsNotPinned: JSX.Element[] = [];

    if (data && data.patients) {
      data.patients.forEach((patient) => {
        if (patient.dentistId == parseInt(DentistID)) {
          if (patient.pinned) {
            arrayPatientsPinned.push(iteratePatient(patient));
          } else {
            arrayPatientsNotPinned.push(iteratePatient(patient));
          }
        }
      });
    }
    //arrayPatientsPinned = [...arrayPatientsPinned].sort((a, b) => (a.firstName > b.firstName ? -1 : 1));
    arrayPatientsPinned.sort((a, b) => {
      const aValue = a.props.patientfirstname;
      const bValue = b.props.patientfirstname;
      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }
      return 0;
    });

    arrayPatientsNotPinned.sort((a, b) => {
      const aValue = a.props.patientfirstname;
      const bValue = b.props.patientfirstname;
      if (aValue < bValue) {
        return -1;
      }
      if (aValue > bValue) {
        return 1;
      }
      return 0;
    });

    let arrayPatients = arrayPatientsPinned.concat(arrayPatientsNotPinned);
    return arrayPatients;
  };
  return (
    <>
      <Head>
        <title>relu</title>
        <link rel="icon" href="/relu_icon.ico" />
      </Head>

      <div className={styles.white_background}>
        <div className={styles.scansWrapper}>
          {allPatients()}

          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
          <div className={styles.patientScan_filler}></div>
        </div>
        <SidebarDoctor />
        <HeaderDoctor />
      </div>
    </>
  );
}
