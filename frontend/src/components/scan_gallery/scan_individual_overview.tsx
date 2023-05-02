import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '@/styles/PatientPage.module.scss';
import styleB from '@/styles/Buttons.module.css';

import { InspectVR } from '../../components/scan_gallery/inspect_VR';
import DeleteButton from '../../components/scan_gallery/delete_scan';
import EditButton from '../../components/scan_gallery/edit_scan';
import OpenObjButton from '../../components/scan_gallery/open_obj';
import ExportButton from '../../components/scan_gallery/export_scan';
import DropdownButton from '../../components/scan_gallery/scan_dropdown';
import dropdownPatientButton from '../patient/patient_dropdown';

import { InspectObj } from '../scan_gallery/inspect_OBJ';


interface scanProfile {
  scanid: number;
  patientid: number;
  picture: StaticImageData;
  date: string;

}

export function SingleScan({ scanid, patientid, picture, date }: scanProfile) {
  const parsedDate = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  };

  const daySuffixes: { [key: string]: string } = {
    '1': 'st',
    '2': 'nd',
    '3': 'rd',
    '21': 'st',
    '22': 'nd',
    '23': 'rd',
    '31': 'st',
  };
  

  const formattedDate = parsedDate.toLocaleDateString('en-US', options);
  const dayOfMonth = parsedDate.getDate().toString();

  const daySuffix = daySuffixes[dayOfMonth] || 'th';

  const dateString = `Scan of ${formattedDate.replace(dayOfMonth, `${dayOfMonth}${daySuffix}`)}`;
  //const dateString = `Scan of October 15th`;

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

  const goToObjViewer = () => {
    setDropDown(false);
  };

  return (
    <div className={styles.patientScan_container}>
      {dropDown && (
        <div className={styles.patientScan_dropDown}>
          <button type="button" className={styleB.relu_btn} id={styleB.exitIcon} onClick={() => {
          handleDropGone();
          goToObjViewer();
        }}></button>
          <div className={styles.dropDownButtonWrapper}>
            <button className={styleB.relu_btn} id={styleB.dropDownButton}>
              export scan
            </button>

            <button className={styleB.relu_btn} id={styleB.dropDownButton}>
              show video
            </button>
            <button className={styleB.relu_btn} id={styleB.dropDownButton}>
              test
            </button>
            <button className={styleB.relu_btn} id={styleB.dropDownButton}>
              test
            </button>
          </div>
        </div>
      )}

      {!dropDown && (
        <div className={styles.patientScan_normal} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div className={styles.picture_wrapper}>
            <Image
              id={parsedDate.toISOString()}
              className={showButtons ? styles.picture_hover : styles.picture}
              src={picture}
              alt="3d picture of teeth"
            />
          </div>

          {showButtons && (
            <div className={styles.subButtons}>
              <div>
                <button
                  type="button"
                  className={styleB.relu_btn}
                  id={styleB.menuIcon}
                  onClick={handleDropDown}
                ></button>
              </div>
              <OpenObjButton />
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
