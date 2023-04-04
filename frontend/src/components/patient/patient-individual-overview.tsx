import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { InspectScans } from '../../components/patient/inspect_scans';

import styles from '@/styles/PatientPage.module.scss';
import DeleteButton from '../patient/delete_patient';
import React, { useState } from 'react';

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
    <div className={styles.patient_button} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Image
        id={patientfirstname.concat(' ', patientlastname)}
        className={showButtons ? styles.invisible_patient_picture : styles.patient_picture}
        src={picture}
        alt="3d picture of teeth"
      />
      {showButtons && (
        <div className={styles.subButtons}>
          {' '}
          {/* Patient: delete-patient, inspect-scans, edit-patient( also edits notes )*/}
          {/* Scan: delete-scan, inspect-scans-VR, edit-patient( also edits notes ), export-scan | show notes of the patient in the sidebar*/}
          <DeleteButton />
          <DeleteButton />
          <DeleteButton />
        </div>
      )}

      <div className={styles.patientscanNameWrapper}>
        <p className={styles.patientscanName}>{patientfirstname.concat(' ', patientlastname)}</p>
      </div>
      <InspectScans patientID={id} />
    </div>
  );
}
