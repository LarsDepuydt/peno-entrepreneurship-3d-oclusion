import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/PatientPage.module.css';

import {HeaderDoctor} from '../components/header/header'
import {SinglePatient as Patient} from '../components/patient/patient-individual-overview'
import teeth3d from '../../public/3d-teeth.jpg'
import { useRouter } from 'next/router';
import { StaticImageData } from 'next/image';
import { FC } from 'react';
import Sidebar from '../components/header/sidebar';

interface TableProps {
  data: { [key: string]: string }[];
}

const Table: FC<TableProps> = ({ data }) => {
  return (
    <table className={styles.patientscanTable}>
      <thead></thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, index) => (
              <td key={index}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};


const patients = [

  { patient11 : <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} date = {new Date(2023, 2, 21)}/> ,
    patient12: <Patient picture={teeth3d} patientfirstname={'Anna'} patientlastname={'Janssens'} date = {new Date(2023, 2, 20)} />,
    patient13: <Patient picture={teeth3d} patientfirstname={'Josephine'} patientlastname={'De Goter'} date = {new Date(2023, 1, 10)}/> 
  },
  
  { patient21 : <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van Rooie'} date = {new Date(2022, 4, 4)}/> ,
    patient22: <Patient picture={teeth3d} patientfirstname={'Gert'} patientlastname={'Vandamme'} date = {new Date(2023, 3, 1)}/>,
    patient23: <Patient picture={teeth3d} patientfirstname={'Peter'} patientlastname={'Damiaans'}date = {new Date(2022, 12, 23)}/> 
  },
  
  { patient31 : <Patient picture={teeth3d} patientfirstname={'Bart'} patientlastname={'De Strooper'} date = {new Date(2023, 2, 19)}/> ,
    patient32: <Patient picture={teeth3d} patientfirstname={'Kaatje'} patientlastname={'Groothals'} date = {new Date(2023, 3, 21)}/>,
    patient33: <Patient picture={teeth3d} patientfirstname={'Lieselot'} patientlastname={'Destoffel'} date = {new Date(2022, 11, 7)}/> },
  
  { patient41 : <Patient picture={teeth3d} patientfirstname={'Jozef'} patientlastname={'Van Kerke'} date = {new Date(2022, 12, 7)} />, 
    patient42 : <Patient picture={teeth3d} patientfirstname={'Jozef'} patientlastname={'Van Kerke'} date = {new Date(2022, 12, 6)} />,
  }
];


const App: FC = () => {
  return (
    <div>
      <HeaderDoctor/>
      <Sidebar />
      <div className={styles.textWrapper}>
        <h1 className={styles.bigText}> Patient Overview</h1>
      </div>
      <Table data={patients} />
    </div>
  );
};

export default App;


/**
 * const uniquePatients = patients.reduce((acc, curr) => {
  // Get the keys of the current patient object
  const currKeys = Object.keys(curr);
  // Loop through the keys and extract the patient info
  currKeys.forEach((key) => {
    const patientInfo = curr[key];
    // Extract the patient's first name, last name, and scan date
    const { patientfirstname, patientlastname, date } = patientInfo.props;
    // Find the existing patient in the accumulator array based on the first name and last name
    const existingPatientIndex = acc.findIndex(
      (patient) =>
        patient.patientfirstname === patientfirstname &&
        patient.patientlastname === patientlastname
    );
    // If the patient doesn't exist, add them to the accumulator array
    if (existingPatientIndex === -1) {
      acc.push({ patientfirstname, patientlastname, date });
    } else {
      // If the patient exists, compare the scan dates and update if the current date is more recent
      if (date >
 */
