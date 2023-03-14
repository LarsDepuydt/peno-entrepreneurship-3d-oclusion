import type { AppProps } from 'next/app'
import 'bootstrap/dist/css/bootstrap.css'
import styles from '@/styles/PatientPage.module.css'

import Header from '../components/header/header'
import New_Patient from '../components/popups/new-patient'
import {SinglePatient as Patient} from '../components/patient/patient-individual-overview'
import teeth3d from '../../public/3d-teeth.jpg'


export default function PatientPage({ Component, pageProps }: AppProps) {
  return (
    <>
    <Header/>
    <div className={styles.projects}>
    <Patient picture={teeth3d} patientfirstname={'Jos'} patientlastname={'Van de Velde'}/>
    <Patient picture={teeth3d} patientfirstname={'Ann'} patientlastname={'Janssens'}/>
    <Patient picture={teeth3d} patientfirstname={'Yolande'} patientlastname={'Berbers'}/>
    </div>

    <New_Patient/>
    </>
  );
}
