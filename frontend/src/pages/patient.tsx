import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/PatientPage.module.css';

import {HeaderDoctor} from '../components/header/header'
import New_Patient from '../components/popups/new-patient'
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
  { patient11 : <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'}/> ,
   patient12: <Patient picture={teeth3d} patientfirstname={'Anna'} patientlastname={'Janssens'}/>,
   patient13: <Patient picture={teeth3d} patientfirstname={'Josephine'} patientlastname={'De Goter'}/> 
  },
  
  { patient21 : <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van Rooie'}/> ,
   patient22: <Patient picture={teeth3d} patientfirstname={'Gert'} patientlastname={'Vandamme'}/>,
   patient23: <Patient picture={teeth3d} patientfirstname={'Peter'} patientlastname={'Damiaans'}/> 
  },
  
  { patient31 : <Patient picture={teeth3d} patientfirstname={'Bart'} patientlastname={'De Strooper'}/> ,
   patient32: <Patient picture={teeth3d} patientfirstname={'Kaatje'} patientlastname={'Groothals'}/>,
   patient33: <Patient picture={teeth3d} patientfirstname={'Lieselot'} patientlastname={'Destoffel'}/> },
  {patient41 : <Patient picture={teeth3d} patientfirstname={'Jozef'} patientlastname={'Van Kerke'} />
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
