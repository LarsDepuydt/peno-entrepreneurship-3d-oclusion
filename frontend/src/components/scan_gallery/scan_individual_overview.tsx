import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/router';
import { InspectVR } from '../../components/scan_gallery/inspect_VR';

import styles from '@/styles/PatientPage.module.scss';

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

  return (
    <div className={styles.patient_button}>
      <Image
        id={date.toISOString()}
        className={styles.patient_picture}
        src={picture}
        alt="3d picture of teeth"
        width={100}
      />
      <div className={styles.patientscanNameWrapper}>
        <p className={styles.patientscanName}>{dateString}</p>
      </div>
      <InspectVR patientID={patientid} scanID={scanid} />
    </div>
  );
}
