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
import NoteInput from '../OBJ_view/note-input';
import NoteList from '../OBJ_view/note-list';
import { useState } from 'react';

interface HeaderPatientProps {
  patientfirstname: string;
  patientlastname: string;
}

interface HeaderDoctorProps {
  doctorfirstname: string;
  doctorlastname: string;
}

export function SidebarDoctor() {
  const router = useRouter();

  const home = () => {
    process.env.REACT_APP_PATIENT_ID = undefined;
    router.push('/patient');
  };

  const wait = () => router.push('/client');

  return (
    <>
      <div className={styleSidebar.sidebar}>
        <WelcomingDoctor />
        <div className={stylesButton.sidebarButton}>
          <New_Patient />
          <Search_ID />
          <Search_Name />
        </div>
        <div className={stylesButton.absoluteWrapper}>
          <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
          <ReluLink />
          <button type="button" className={stylesButton.relu_btn} id={stylesButton.waitIcon} onClick={wait}></button>
        </div>
      </div>
    </>
  );
}

export function SidebarPatient() {
  const router = useRouter();
  const home = () => {
    process.env.REACT_APP_PATIENT_ID = undefined;
    router.push('/patient');
  };

  const [notesPatient, setNotes] = useState<string[]>([]);

  const handleAddNotePatient = (note: string) => {
    setNotes([...notesPatient, note]);
  };

  return (
    <>
      <div className={styleSidebar.sidebar}>
        <WelcomingPatient />
        <NoteInput onAddNote={handleAddNotePatient} />
        <NoteList notes={notesPatient} />
        <div className={stylesButton.sidebarButton}>
          <New_Scan />
          {/*<Filter_Tags /> */}
        </div>
        <div className={stylesButton.absoluteWrapper}>
          <ReluLink />
          <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
        </div>
      </div>
    </>
  );
}

export function SidebarObj() {
  const router = useRouter();

  const openScans = () => {
    let patientID = process.env.REACT_APP_PATIENT_ID!;
    router.push({
      pathname: '/scans-page',
      query: {
        patientID,
      },
    });
  };

  const [notesScan, setNotes] = useState<string[]>([]);

  const handleAddNoteScan = (note: string) => {
    setNotes([...notesScan, note]);
  };

  return (
    <>
      <div className={styleSidebar.sidebar}>
        <WelcomingPatient />
        <NoteInput onAddNote={handleAddNoteScan} />
        <NoteList notes={notesScan} />
        <div className={stylesButton.sidebarButton}>
          <button
            type="button"
            className={stylesButton.relu_btn}
            id={stylesButton.homeIcon}
            onClick={openScans}
          ></button>

          <ReluLink />
        </div>
      </div>
    </>
  );
}
