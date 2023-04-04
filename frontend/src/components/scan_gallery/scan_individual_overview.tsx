import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '@/styles/PatientPage.module.scss';
import styleB from '@/styles/Buttons.module.css';

import { InspectVR } from '../../components/scan_gallery/inspect_VR';
import DeleteButton from '../../components/scan_gallery/delete_scan';
import EditButton from '../../components/scan_gallery/edit_scan';
import ExportButton from '../../components/scan_gallery/export_scan';
import DropdownButton from '../../components/scan_gallery/scan_dropdown';
import dropdownPatientButton from '../patient/patient_dropdown';

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

  const [dropDown, setDropDown] = useState(false);
  const handleDropDown = () => {
    setDropDown(true);
  };
  const handleDropGone = () => {
    setDropDown(false);
  };

  return (
    <div className={styles.patientScan_container}>
      {dropDown && (
        <div className={styles.patientScan_dropDown}>
          <button type="button" className={styleB.relu_btn} id={styleB.exitIcon} onClick={handleDropGone}></button>
        </div>
      )}
      {!dropDown && (
        <div className={styles.patientScan_normal} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className={styles.picture_wrapper}>
            <Image
              id={date.toISOString()}
              className={showButtons ? styles.picture_hover : styles.picture}
              src={picture}
              alt="3d picture of teeth"
            />
          </div>
          {showButtons && (
            <div className={styles.subButtons}>
              {/* Patient: delete-patient, inspect-scans, edit-patient( also edits notes )*/}
              {/* Scan: delete-scan, inspect-scans-VR, edit-patient( also edits notes ), export-scan | show notes of the patient in the sidebar*/}
              <div>
                <button
                  type="button"
                  className={styleB.relu_btn}
                  id={styleB.menuIcon}
                  onClick={handleDropDown}
                ></button>
              </div>
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
      )}
    </div>
  );
}
