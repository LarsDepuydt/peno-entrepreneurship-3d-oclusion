import React, { useEffect } from 'react';
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
import {
  updatePatientById,
  getPatientById,
  getScanById,
  updateScanById,
} from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';

import NoteInput from '../OBJ_view/note-input';
import NoteList from '../OBJ_view/note-list';
import { useState } from 'react';
import { GetScanByIdResponse } from '@/gen/proto/threedoclusion/v1/service_pb';

interface HeaderPatientProps {
  patientfirstname: string;
  patientlastname: string;
}

interface HeaderDoctorProps {
  doctorfirstname: string;
  doctorlastname: string;
}

interface patientValues {
  id: number;
  patientFirstName: string;
  patientLastName: string;

  pinned: boolean;
  notes: string;

  dentistID: number;
}

export function SidebarDoctor() {
  const router = useRouter();

  const wait = () => router.push('/settings');

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
          <ReluLink />
          <button type="button" className={stylesButton.relu_btn} id={stylesButton.waitIcon} onClick={wait}></button>
        </div>
      </div>
    </>
  );
}

export function SidebarDoctorName() {
  const router = useRouter();

  const home = () => {
    process.env.REACT_APP_PATIENT_ID = undefined;
    router.push('/patient');
  };

  const wait = () => router.push('/settings');

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
          <ReluLink />
          <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
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

  let patientID = process.env.REACT_APP_PATIENT_ID!;

  const { data: patientInfoRequest } = useQuery(getPatientById.useQuery({ id: parseInt(patientID) }));

  const queryupdate = updatePatientById.useQuery(patientInfoRequest);
  const { data, refetch } = useQuery(queryupdate.queryKey, queryupdate.queryFn, { enabled: false });
  //console.log(data)

  let notesPatient = patientInfoRequest?.notes;

  //const [updatedNotes, setData] = useState(patientInfoRequest);

  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);

  /*const { data } = useQuery(
    UpdatePatientById.useQuery(patientinfo).queryKey,
    UpdatePatientById.useQuery(patientinfo).queryFn,
    { enabled: false }
  );
  */

  const handleAddNotePatient = (note: string) => {
    //if (sendOK) {
    setSendOK(false);
    note = note.concat(' | ');
    notesPatient = patientInfoRequest?.notes + note;
    patientInfoRequest.notes = notesPatient;
    refetch();
    console.log(patientInfoRequest);
    setSubmitOK(true);
    console.log('submitOK is set to true');
    //}
  };

  useEffect(() => {
    if (submitOK) {
      refetch();
      setSendOK(false);
      if (data != undefined) {
        console.log('data is not undefined');
      }
      setSubmitOK(false);
    }
  }, [sendOK, submitOK, refetch, data]);

  if (patientInfoRequest != undefined) {
    return (
      <>
        <div className={styleSidebar.sidebar}>
          <WelcomingPatient />
          <NoteInput onAddNote={handleAddNotePatient} />
          <NoteList notes={notesPatient} />
          <div className={stylesButton.sidebarButton}>
            <New_Scan />
          </div>
          <div className={stylesButton.absoluteWrapper}>
            <ReluLink />
            <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styleSidebar.sidebar}>
          <WelcomingPatient />
          <NoteInput onAddNote={handleAddNotePatient} />
          <NoteList notes=" | " />
          <div className={stylesButton.sidebarButton}>
            <New_Scan />
          </div>
          <div className={stylesButton.absoluteWrapper}>
            <ReluLink />
            <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
          </div>
        </div>
      </>
    );
  }
}

export function SidebarObj() {
  const router = useRouter();

  let scanID = process.env.REACT_APP_SCAN_ID!;
  console.log(scanID);

  const openScans = () => {
    let patientID = process.env.REACT_APP_PATIENT_ID!;
    process.env.REACT_APP_SCAN_ID = undefined;
    router.push({
      pathname: '/scans-page',
      query: {
        patientID,
      },
    });
  };

  const { data: scanInfoRequest } = useQuery(getScanById.useQuery({ id: parseInt(scanID) }));

  const queryupdate = updateScanById.useQuery({
    id: parseInt(scanID),
    scanFile: scanInfoRequest?.scan,
    notes: scanInfoRequest?.notes,
    patientId: scanInfoRequest?.patientId,
  });
  const { data, refetch } = useQuery(queryupdate.queryKey, queryupdate.queryFn, { enabled: false });
  //console.log(data)

  let notesScan = scanInfoRequest?.notes;

  //const [updatedNotes, setData] = useState(patientInfoRequest);

  const [submitOK, setSubmitOK] = useState(false);
  const [sendOK, setSendOK] = useState(false);

  const handleAddNoteScan = (note: string) => {
    //if (sendOK) {
    setSendOK(false);
    note = note.concat(' | ');
    notesScan = scanInfoRequest?.notes + note;
    scanInfoRequest.notes = notesScan;
    console.log(scanInfoRequest);
    setSubmitOK(true);
    console.log('submitOK is set to true');
    //}
  };

  useEffect(() => {
    if (submitOK) {
      refetch();
      setSendOK(false);
      if (data != undefined) {
        console.log('data is not undefined');
      }
      setSubmitOK(false);
    }
  }, [sendOK, submitOK, refetch, data]);

  if (scanInfoRequest != undefined) {
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
  } else {
    return (
      <>
        <div className={styleSidebar.sidebar}>
          <WelcomingPatient />
          <NoteInput onAddNote={handleAddNoteScan} />
          <NoteList notes={' | '} />
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
}
