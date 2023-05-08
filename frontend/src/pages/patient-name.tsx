import 'bootstrap/dist/css/bootstrap.css';
import styles from '@/styles/PatientPage.module.scss';

import { HeaderDoctor } from '../components/header/header';
import { SinglePatient as Patient } from '../components/patient/patient-individual-overview';
import { useEffect } from 'react';
import { SidebarDoctor } from '../components/header/sidebar';
import Head from 'next/head';

import { useQuery } from '@tanstack/react-query';
import { getAllPatients } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';

// // type Arraypatients {
// //   patient[]
// // }

// let namedPatients = [
//   {
//     patient41: (
//       <Patient
//         id={10}
//         picture={teeth3d}
//         patientfirstname={'Jos'}
//         patientlastname={'Van de Velde'}
//         doctorid={120}
//         //date={new Date(2023, 2, 21)}
//       />
//     ),
//     patient12: (
//       <Patient
//         id={2}
//         picture={teeth3d}
//         patientfirstname={'Anna'}
//         patientlastname={'Janssens'}
//         doctorid={116}
//         //date={new Date(2023, 2, 20)}
//       />
//     ),
//     patient13: (
//       <Patient
//         id={313}
//         picture={teeth3d}
//         patientfirstname={'Josephine'}
//         patientlastname={'De Goter'}
//         doctorid={118}
//         //date={new Date(2023, 1, 10)}
//       />
//     ),
//   },

//   // {
//   //   patient21: (
//   //     <Patient
//   //       id={4}
//   //       picture={teeth3d}
//   //       patientfirstname={'Jos'}
//   //       patientlastname={'Van Rooie'}
//   //       //date={new Date(2022, 4, 4)}
//   //     />
//   //   ),
//   //   patient22: (
//   //     <Patient
//   //       id={5}
//   //       picture={teeth3d}
//   //       patientfirstname={'Gert'}
//   //       patientlastname={'Vandamme'}
//   //       //date={new Date(2023, 3, 1)}
//   //     />
//   //   ),
//   //   patient23: (
//   //     <Patient
//   //       id={6}
//   //       picture={teeth3d}
//   //       patientfirstname={'Peter'}
//   //       patientlastname={'Damiaans'}
//   //       //date={new Date(2022, 12, 23)}
//   //     />
//   //   ),
//   // },

//   // {
//   //   patient31: (
//   //     <Patient
//   //       id={7}
//   //       picture={teeth3d}
//   //       patientfirstname={'Bart'}
//   //       patientlastname={'De Strooper'}
//   //       //date={new Date(2023, 2, 19)}
//   //     />
//   //   ),
//   //   patient32: (
//   //     <Patient
//   //       id={8}
//   //       picture={teeth3d}
//   //       patientfirstname={'Kaatje'}
//   //       patientlastname={'Groothals'}
//   //       //date={new Date(2023, 3, 21)}
//   //     />
//   //   ),
//   //   patient33: (
//   //     <Patient
//   //       id={9}
//   //       picture={teeth3d}
//   //       patientfirstname={'Lieselot'}
//   //       patientlastname={'Destoffel'}
//   //       //date={new Date(2022, 11, 7)}
//   //     />
//   //   ),
//   // },

//   // {
//   //   patient41: (
//   //     <Patient
//   //       id={10}
//   //       picture={teeth3d}
//   //       patientfirstname={'Jozef'}
//   //       patientlastname={'Van Kerke'}
//   //       //date={new Date(2022, 12, 7)}
//   //     />
//   //   ),
//   //   patient42: (
//   //     <Patient
//   //       id={10}
//   //       picture={teeth3d}
//   //       patientfirstname={'Jozef'}
//   //       patientlastname={'Van Kerke'}
//   //       //date={new Date(2022, 12, 6)}
//   //     />
//   //   ),
//   //   patient43: (
//   //     <Patient
//   //       id={8}
//   //       picture={teeth3d}
//   //       patientfirstname={'Kaatje'}
//   //       patientlastname={'Groothals'}
//   //       //date={new Date(2023, 2, 21)}
//   //     />
//   //   ),
// ];

// let DentistID = process.env.REACT_APP_DENTIST_ID!;
// //let DentistIDnum = parseInt(DentistIDstr);

// const filteredPatients = namedPatients
//   .flatMap((obj) => Object.values(obj)) // flatten the array of objects into an array of patients
//   .filter((patient) => patient.props.doctorid === parseInt(DentistID));

// const App: FC = () => {
//   const router = useRouter();
//   const patientFirstName = router.query.fn as string;
//   const patientLastName = router.query.ln as string;

//   console.log('dentist id is ' + process.env.REACT_APP_DENTIST_ID);
//   console.log('patient id is ' + process.env.REACT_APP_PATIENT_ID);

//   const query = getPatientByName.useQuery({ firstName: patientFirstName, lastName: patientLastName });
//   const { data } = useQuery(query.queryKey, query.queryFn);

//   if (data != undefined) {
//     //namedPatients = data.patients;
//     //filteredPatients(Namedpatients)
//   }

//   return (
//     <>
//       <Head>
//         <title>relu</title>
//         <link rel="icon" href="/relu_icon.ico" />
//       </Head>

//       <div>
//         <div className={styles.scansWrapper}>
//           {filteredPatients.map((patient: React.ReactElement, index: number) => (
//             <div key={`patient${index + 1}`}>
//               <Patient
//                 id={patient.props.id}
//                 picture={patient.props.picture}
//                 patientfirstname={patient.props.patientfirstname}
//                 patientlastname={patient.props.patientlastname}
//                 doctorid={patient.props.doctorid}
//               />
//             </div>
//           ))}
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//           <div className={styles.patient_filler}></div>
//         </div>
//         <SidebarDoctor />
//         <HeaderDoctor />
//       </div>
//     </>
//   );
// };

// export default App;
