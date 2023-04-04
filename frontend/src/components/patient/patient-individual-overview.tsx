import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import styles from '@/styles/PatientPage.module.scss';
import React, { useState } from 'react';

import { InspectScans } from '../../components/patient/inspect_scans';
import DeleteButton from '../patient/delete_patient';
import EditButton from '../patient/edit_patient';
import DropdownButton from '../patient/patient_dropdown';

interface patientProfile {
  id: number;
  picture: StaticImageData;
  patientfirstname: string;
  patientlastname: string;
}

export function SinglePatient({ id, picture, patientfirstname, patientlastname }: patientProfile) {
  const [showButtons, setShowButtons] = useState(false);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const router = useRouter();

  return (
    <div className={styles.patientScan_container}>
      <div className={styles.patientScan_normal} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={styles.picture_wrapper}>
          {' '}
          <Image
            id={patientfirstname.concat(' ', patientlastname)}
            className={showButtons ? styles.picture_hover : styles.picture}
            src={picture}
            alt="3d picture of teeth"
          />
        </div>

        {showButtons && (
          <div className={styles.subButtons}>
            {/* Patient: delete-patient, inspect-scans, edit-patient( also edits notes )*/}
            {/* Scan: delete-scan, inspect-scans-VR, edit-patient( also edits notes ), export-scan | show notes of the patient in the sidebar*/}
            <DropdownButton />
            <InspectScans patientID={id} />
            <EditButton />
            <DeleteButton />
          </div>
        )}

        <div className={showButtons ? styles.patientscanNameWrapperInvisible : styles.patientscanNameWrapper}>
          <p className={styles.patientscanName}>{patientfirstname.concat(' ', patientlastname)}</p>
        </div>
      </div>
    </div>
  );
}
