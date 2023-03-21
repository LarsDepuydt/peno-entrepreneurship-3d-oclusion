import React from 'react';
import stylesButton from '@/styles/Buttons.module.css';
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
        <div className={stylesButton.sidebarButton}>
          <New_Patient />
        </div>
      </div>
    </>
  );
}

export function SidebarPatient({ patientfirstname, patientlastname }: HeaderPatientProps) {
  return (
    <>
      <div className={styleSidebar.sidebar}>
        <WelcomingPatient patientfirstname={patientfirstname} patientlastname={patientlastname} />
        <div className={stylesButton.sidebarButton}>
          <New_Scan />
        </div>
      </div>
    </>
  );
}
