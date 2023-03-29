import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '@/styles/PatientPage.module.scss';

import { InspectVR } from '../../components/scan_gallery/inspect_VR';
import DeleteButton from '../../components/scan_gallery/delete_scan';
import EditButton from '../../components/scan_gallery/edit_scan';
import ExportButton from '../../components/scan_gallery/export_scan';
import DropdownButton from '../../components/scan_gallery/scan_dropdown';

interface scanProfile {
  scanid: number;
  patientid: number;
  picture: StaticImageData;
  date: Date; //new Date('2023-03-28') OF new Date(2023, 2, 28)
}

export function SingleScan({ scanid, patientid, picture, date }: scanProfile) {
  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };

  const daySuffixes = {
    '1': 'st',
    '2': 'nd',
    '3': 'rd',
    '21': 'st',
    '22': 'nd',
    '23': 'rd',
    '31': 'st',
  };

  const formattedDate = date.toLocaleDateString('en-US', options);
  const dayOfMonth = date.getDate().toString();
  const daySuffix = daySuffixes[dayOfMonth] || 'th';

  const dateString = `Scan of ${formattedDate.replace(dayOfMonth, `${dayOfMonth}${daySuffix}`)}`;

  const [showButtons, setShowButtons] = useState(false);
  const handleMouseEnter = () => {
    setShowButtons(true);
  };
  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  return (
    <div className={styles.patient_button} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Image
        id={date.toISOString()}
        className={showButtons ? styles.invisible_patient_picture : styles.patient_picture}
        src={picture}
        alt="3d picture of teeth"
      />
      {showButtons && (
        <div className={styles.subButtons}>
          {' '}
          {/* Patient: delete-patient, inspect-scans, edit-patient( also edits notes )*/}
          {/* Scan: delete-scan, inspect-scans-VR, edit-patient( also edits notes ), export-scan | show notes of the patient in the sidebar*/}
          <DropdownButton />
          <ExportButton />
          <InspectVR patientID={patientid} scanID={scanid} />
          <EditButton />
          <DeleteButton />
        </div>
      )}
      <div className={showButtons ? styles.patientscanNameWrapperInvisible : styles.patientscanNameWrapper}>
        <p className={styles.patientscanName}>{dateString}</p>
      </div>
    </div>
  );
}
