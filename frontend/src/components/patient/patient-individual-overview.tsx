import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';

import styles from '@/styles/PatientPage.module.css';

interface patientProfile {
  id: number;
  picture: StaticImageData;
  patientfirstname: string;
  patientlastname: string;
}

export function SinglePatient({ picture, patientfirstname, patientlastname }: patientProfile) {
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
    <div className={styles.patient_button}>
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
        {/* <button onClick={handleDelete}>Delete</button> */}
      </div>
    </div>
  );
}
