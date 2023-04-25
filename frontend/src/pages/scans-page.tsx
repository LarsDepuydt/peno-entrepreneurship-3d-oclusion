import New_Scan from '../components/popups/new-scan';
import { HeaderPatient } from '../components/header/header';
import { useRouter } from 'next/router';
import { SingleScan as Scan } from '../components/scan_gallery/scan_individual_overview';
import teeth3d from '../../public/3d-teeth.jpg';
import { SidebarPatient } from '@/components/header/sidebar';
import styles from '@/styles/PatientPage.module.scss';
import { FC } from 'react';
import Head from 'next/head';
import { Patient } from '@/gen/proto/threedoclusion/v1/service_pb';

// hard coded patients - 12 scans for 10 patients. Kaatje and Jozef (patientid 10 and 8) have each 2 scans. (scanid 1 and 2)
const all_scans = [
  {
    scan11: <Scan scanid={1} patientid={1} picture={teeth3d} date={new Date(2023, 2, 21)} />,
    scan12: <Scan scanid={1} patientid={2} picture={teeth3d} date={new Date(2023, 2, 20)} />,
    scan13: <Scan scanid={1} patientid={313} picture={teeth3d} date={new Date(2023, 1, 10)} />,
  },

  {
    scan21: <Scan scanid={1} patientid={4} picture={teeth3d} date={new Date(2022, 4, 4)} />,

    scan22: <Scan scanid={1} patientid={5} picture={teeth3d} date={new Date(2023, 3, 1)} />,

    scan23: <Scan scanid={1} patientid={6} picture={teeth3d} date={new Date(2022, 12, 23)} />,
  },
  {
    scan31: <Scan scanid={1} patientid={7} picture={teeth3d} date={new Date(2023, 2, 19)} />,
    scan32: <Scan scanid={1} patientid={8} picture={teeth3d} date={new Date(2023, 3, 21)} />,

    scan33: <Scan scanid={1} patientid={9} picture={teeth3d} date={new Date(2022, 11, 7)} />,
  },

  {
    scan41: <Scan scanid={1} patientid={10} picture={teeth3d} date={new Date(2022, 12, 7)} />,

    scan42: <Scan scanid={2} patientid={10} picture={teeth3d} date={new Date(2022, 12, 6)} />,

    scan43: <Scan scanid={2} patientid={8} picture={teeth3d} date={new Date(2023, 2, 21)} />,
  },
];

let PatientID = process.env.REACT_APP_PATIENT_ID!;

console.log('dentist id is ' + process.env.REACT_APP_DENTIST_ID);
console.log('patient id is ' + process.env.REACT_APP_PATIENT_ID);

const App: FC = () => {
  const router = useRouter();
  const targetpatientID = router.query.patientID as string;

  const filteredPatients = all_scans
    .flatMap((obj) => Object.values(obj)) // flatten the array of objects into an array of scans
    .filter((patient) => patient.props.patientid === parseInt(targetpatientID));

  return (
    <div>
      <div className={styles.scansWrapper}>
        {filteredPatients.map((patient, index) => (
          <div key={`patient${index + 1}`}>
            <Scan
              scanid={patient.props.scanid}
              patientid={patient.props.patientid}
              picture={patient.props.picture}
              date={patient.props.date}
            />
          </div>
        ))}
      </div>
      <SidebarPatient patientfirstname={'TEST'} patientlastname={'TEST3'} />
      <HeaderPatient />
    </div>
  );
};

export default App;
