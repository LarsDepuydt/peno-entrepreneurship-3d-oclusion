import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import styles from '@/styles/PatientPage.module.scss';
import styleB from '@/styles/Buttons.module.css';
import React, { useState } from 'react';

import { InspectScans } from '../../components/patient/inspect_scans';
import DeleteButton from '../patient/delete_patient';
import EditButton from '../patient/edit_patient';

import pfp1 from '../../../public/profile_pictures/patient_profile_picture_1.png';
import pfp2 from '../../../public/profile_pictures/patient_profile_picture_2.png';
import pfp3 from '../../../public/profile_pictures/patient_profile_picture_3.png';
import pfp4 from '../../../public/profile_pictures/patient_profile_picture_4.png';
import PinButton from '../patient/pin_patient';

interface patientProfile {
  id: number;
  patientfirstname: string;
  patientlastname: string;
  pinned: boolean;
  notespatient: string;
  doctorid: number;
}

export function SinglePatient({ id, patientfirstname, patientlastname }: patientProfile) {
  const [showButtons, setShowButtons] = useState(false);
  const handleMouseEnter = () => {
    setShowButtons(true);
  };
  const handleMouseLeave = () => {
    setShowButtons(false);
  };

  //const router = useRouter();

  const num = id % 4;
  const pfps = [pfp1, pfp2, pfp3, pfp4];

  return (
    <div className={styles.patientScan_container}>
      <div className={styles.patientScan_normal} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className={styles.picture_wrapper}>
          <Image
            id={patientfirstname.concat(' ', patientlastname)}
            className={showButtons ? styles.picture_hover : styles.picture}
            src={pfps[num]}
            alt="3d picture of teeth"
          />
        </div>

        {showButtons && (
          <div className={styles.subButtons}>
            <div></div>
            <InspectScans patientID={id} />
            <EditButton patientID={id} />
            <DeleteButton patientID={id} />
            <PinButton patientID={id} />
          </div>
        )}

        <div className={showButtons ? styles.patientscanNameWrapperInvisible : styles.patientscanNameWrapper}>
          <p className={styles.patientscanName}>{patientfirstname.concat(' ', patientlastname)}</p>
        </div>
      </div>
    </div>
  );
}
