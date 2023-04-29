import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/PatientPage.module.scss';

import { HeaderDoctor } from '../components/header/header';
import { SinglePatient as Patient } from '../components/patient/patient-individual-overview';
import teeth3d from '../../public/3d-teeth.jpg';
import { useRouter } from 'next/router';
import { StaticImageData } from 'next/image';
import { FC } from 'react';
import { SidebarDoctor } from '../components/header/sidebar';
import Head from 'next/head';

const patients = [
  {
    patient11: (
      <Patient
        id={1}
        picture={teeth3d}
        patientfirstname={'Jos'}
        patientlastname={'Van de Velde'}
        doctorid={120}
        //date={new Date(2023, 2, 21)}
      />
    ),
    patient12: (
      <Patient
        id={2}
        picture={teeth3d}
        patientfirstname={'Anna'}
        patientlastname={'Janssens'}
        doctorid={116}
        //date={new Date(2023, 2, 20)}
      />
    ),
    patient13: (
      <Patient
        id={313}
        picture={teeth3d}
        patientfirstname={'Josephine'}
        patientlastname={'De Goter'}
        doctorid={118}
        //date={new Date(2023, 1, 10)}
      />
    ),
  },

];


let DentistID = process.env.REACT_APP_DENTIST_ID!;
//let DentistIDnum = parseInt(DentistIDstr);

const filteredPatients = patients
  .flatMap((obj) => Object.values(obj)) // flatten the array of objects into an array of patients
  .filter((patient) => patient.props.doctorid === parseInt(DentistID));

const App: FC = () => {
  const router = useRouter();

  console.log('dentist id is ' + process.env.REACT_APP_DENTIST_ID);
  console.log('patient id is ' + process.env.REACT_APP_PATIENT_ID);

  return (
    <>
      <Head>
        <title>relu</title>
        <link rel="icon" href="/relu_icon.ico" />
      </Head>

      <div>
        <div className={styles.scansWrapper}>
          {filteredPatients.map((patient: React.ReactElement, index: number) => (
            <div key={`patient${index + 1}`}>
              <Patient
                id={patient.props.id}
                picture={patient.props.picture}
                patientfirstname={patient.props.patientfirstname}
                patientlastname={patient.props.patientlastname}
                doctorid={patient.props.doctorid}
              />
            </div>
          ))}
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
          <div className={styles.patient_filler}></div>
        </div>
        <SidebarDoctor />
        <HeaderDoctor />
      </div>
    </>
  );
};

export default App;
