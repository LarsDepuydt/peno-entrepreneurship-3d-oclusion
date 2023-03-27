import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/PatientPage.module.css';

import { HeaderDoctor } from '../components/header/header';
import New_Patient from '../components/popups/new-patient';
import { SinglePatient as Patient } from '../components/patient/patient-individual-overview';
import teeth3d from '../../public/3d-teeth.jpg';
import { useRouter } from 'next/router';
import { StaticImageData } from 'next/image';
import { FC } from 'react';
import { SidebarDoctor } from '../components/header/sidebar';

interface TableProps {
  data: { [key: string]: any }[];
}

const Table: FC<TableProps> = ({ data }) => {
  return (
    <table>
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

// hard coded patients - 12 scans for 10 patients. Kaatje and Jozef have each 2 scans.
const patients = [
  {
    patient11: <Patient id={1000} picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'} />,
    patient12: <Patient id={123} picture={teeth3d} patientfirstname={'Anna'} patientlastname={'Janssens'} />,
    patient13: <Patient id={666} picture={teeth3d} patientfirstname={'Josephine'} patientlastname={'De Goter'} />,
  },

  {
    patient11: (
      <Patient
        id={1}
        picture={teeth3d}
        patientfirstname={'Jos'}
        patientlastname={'Van de Velde'}
        //date={new Date(2023, 2, 21)}
      />
    ),
    patient12: (
      <Patient
        id={2}
        picture={teeth3d}
        patientfirstname={'Anna'}
        patientlastname={'Janssens'}
        //date={new Date(2023, 2, 20)}
      />
    ),
    patient13: (
      <Patient
        id={3}
        picture={teeth3d}
        patientfirstname={'Josephine'}
        patientlastname={'De Goter'}
        //date={new Date(2023, 1, 10)}
      />
    ),
  },

  {
    patient21: (
      <Patient
        id={4}
        picture={teeth3d}
        patientfirstname={'Jos'}
        patientlastname={'Van Rooie'}
        //date={new Date(2022, 4, 4)}
      />
    ),
    patient22: (
      <Patient
        id={5}
        picture={teeth3d}
        patientfirstname={'Gert'}
        patientlastname={'Vandamme'}
        //date={new Date(2023, 3, 1)}
      />
    ),
    patient23: (
      <Patient
        id={6}
        picture={teeth3d}
        patientfirstname={'Peter'}
        patientlastname={'Damiaans'}
        //date={new Date(2022, 12, 23)}
      />
    ),
  },

  {
    patient31: (
      <Patient
        id={7}
        picture={teeth3d}
        patientfirstname={'Bart'}
        patientlastname={'De Strooper'}
        //date={new Date(2023, 2, 19)}
      />
    ),
    patient32: (
      <Patient
        id={8}
        picture={teeth3d}
        patientfirstname={'Kaatje'}
        patientlastname={'Groothals'}
        //date={new Date(2023, 3, 21)}
      />
    ),
    patient33: (
      <Patient
        id={9}
        picture={teeth3d}
        patientfirstname={'Lieselot'}
        patientlastname={'Destoffel'}
        //date={new Date(2022, 11, 7)}
      />
    ),
  },

  {
    patient41: (
      <Patient
        id={10}
        picture={teeth3d}
        patientfirstname={'Jozef'}
        patientlastname={'Van Kerke'}
        //date={new Date(2022, 12, 7)}
      />
    ),
    patient42: (
      <Patient
        id={10}
        picture={teeth3d}
        patientfirstname={'Jozef'}
        patientlastname={'Van Kerke'}
        //date={new Date(2022, 12, 6)}
      />
    ),
    patient43: (
      <Patient
        id={8}
        picture={teeth3d}
        patientfirstname={'Kaatje'}
        patientlastname={'Groothals'}
        //date={new Date(2023, 2, 21)}
      />
    ),
  },
];

const patientMap = new Map();
patients.forEach((patientGroup) => {
  Object.values(patientGroup).forEach((patient) => {
    if (!patientMap.has(patient.props.id) || patient.props.date > patientMap.get(patient.props.id).props.date) {
      patientMap.set(patient.props.id, patient);
    }
  });
});

const TargetPatientScans = Array.from(patientMap.values())
  // .sort((a, b) => b.props.date.getTime() - a.props.date.getTime())
  .map((patient, index) => ({ [`patient${index + 1}`]: patient }));

const App: FC = () => {
  return (
    <div>
      <SidebarDoctor />
      <HeaderDoctor />
      <div className={styles.scansWrapper}>
        <Table data={TargetPatientScans} />
      </div>
    </div>
  );
};

export default App;
