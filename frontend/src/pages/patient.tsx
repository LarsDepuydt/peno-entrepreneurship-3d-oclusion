import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/PatientPage.module.css';

import Header from '../components/header/header';
import { SinglePatient as Patient } from '../components/patient/patient-individual-overview';
import teeth3d from '../../public/3d-teeth.jpg';
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
  {
    patient1: <Patient picture={teeth3d} patientfirstname={'jos'} patientlastname={'Van de Velde'} />,
    patient2: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
    patient3: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
  },
  {
    patient1: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
    patient2: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
    patient3: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
  },
  {
    patient1: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
    patient2: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
    patient3: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
  },
  {
    patient1: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
    patient2: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
    patient3: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
  },
  {
    patient1: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
    patient2: <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
  },
];

const App: FC = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div className={styles.textWrapper}>
        <h1 className={styles.bigText}> Patient Overview</h1>
      </div>
      <Table data={patients} />
    </div>
  );
};

export default App;
