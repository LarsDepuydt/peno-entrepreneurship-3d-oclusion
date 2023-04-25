import React from 'react';
import { useRouter } from 'next/router';
import stylesButton from '@/styles/Buttons.module.css';
import styleSidebar from '@/styles/Sidebar.module.css';
import New_Patient from '../popups/new-patient';
import New_Scan from '../popups/new-scan';
import Filter_Tags from '../search/filter-tags';
import Search_ID from '../search/search-id';
import Search_Name from '../search/search-name';
import ReluLink from '../header/reluLink';
import { WelcomingDoctor, WelcomingPatient } from './welcoming';
import { useQuery } from '@tanstack/react-query';
import { getDentistById } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';

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
          <Search_ID />
          <Search_Name />
        </div>
        <div className={stylesButton.absoluteWrapper}>
          <ReluLink />
        </div>
      </div>
    </>
  );
}

export function SidebarPatient({ patientfirstname, patientlastname }: HeaderPatientProps) {
  const router = useRouter();
  const home = () => router.push('/patient');
  return (
    <>
      <div className={styleSidebar.sidebar}>
        <WelcomingPatient patientfirstname={patientfirstname} patientlastname={patientlastname} />
        <div className={stylesButton.sidebarButton}>
          <New_Scan />
          <Filter_Tags />
        </div>
        <div className={stylesButton.absoluteWrapper}>
          <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
          <ReluLink />
        </div>
      </div>
    </>
  );
}

export function SidebarObj({ patientfirstname, patientlastname }: HeaderPatientProps) {
  const router = useRouter();
  const home = () => router.push('/patient');
  return (
    <>
      <div className={styleSidebar.sidebar}>
        <WelcomingPatient patientfirstname={patientfirstname} patientlastname={patientlastname} />
        <div className={stylesButton.sidebarButton}>
          <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
          <New_Scan />
          <Filter_Tags />
          <ReluLink />
        </div>
      </div>
    </>
  );
}
