import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';

import styles from '@/styles/PatientPage.module.css';
import DeleteButton from '../patient/delete_patient';
import React, { useState } from 'react';

interface patientProfile {
  id: number;
  picture: StaticImageData;
  patientfirstname: string;
  patientlastname: string;
}

export function SinglePatient({ picture, patientfirstname, patientlastname }: patientProfile) {
  const [showButtons, setShowButtons] = useState(false);

  const handleMouseEnter = () => {
    setShowButtons(true);
  };

  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  const router = useRouter();

  const clickPatient = () => {
    router.push({
      pathname: '/scans-page',
      query: {
        patientfirstname,
        patientlastname,
      },
    });
  };

  return (
    <div className={styles.patient_button} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div onClick={clickPatient}>
        <Image
          id={patientfirstname.concat(' ', patientlastname)}
          className={styles.patient_picture}
          src={picture}
          alt="3d picture of teeth"
          width={100}
        />
        <div className={styles.patientscanNameWrapper}>
          <p className={styles.patientscanName}>{patientfirstname.concat(' ', patientlastname)}</p>
        </div>
      </div>
      {showButtons && (
        <div className="sub-buttons">
          <DeleteButton />
          <button>Button 2</button>
          <button>Button 3</button>
        </div>
      )}
    </div>
  );
}
