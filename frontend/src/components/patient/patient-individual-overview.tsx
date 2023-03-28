import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { InspectScans } from '../../components/patient/inspect_scans'


import styles from '@/styles/PatientPage.module.css';

interface patientProfile {
  id: number;
  picture: StaticImageData;
  patientfirstname: string;
  patientlastname: string;
}

export function SinglePatient({ id, picture, patientfirstname, patientlastname }: patientProfile) {

  return (
    <div className={styles.patient_button}> 
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
        <InspectScans patientID={id} />
      </div>
  );
}
