import React from 'react';
import styles from '@/styles/Header.module.css';
import styleSidebar from '@/styles/Sidebar.module.css';
import New_Patient from '../popups/new-patient';
import New_Scan from '../popups/new-scan';
import { WelcomingDoctor, WelcomingPatient } from './welcoming';

interface HeaderPatientProps {
  patientfirstname: string;
  patientlastname: string;
}

interface HeaderDoctorProps {
  doctorfirstname: string;
  doctorlastname: string;
}

export function SidebarDoctor() {
  return (
    <>
      <div className={styleSidebar.sidebar}>
        <WelcomingDoctor doctorfirstname={'Anna'} doctorlastname={'Proost'} />
        <New_Patient />
      </div>
    </>
  );
}

export function SidebarPatient({ patientfirstname, patientlastname }: HeaderPatientProps) {
  return (
    <>
      <div className={styleSidebar.sidebar}>
        <WelcomingPatient patientfirstname={patientfirstname} patientlastname={patientlastname} />
        <New_Scan />
      </div>
    </>
  );
}
