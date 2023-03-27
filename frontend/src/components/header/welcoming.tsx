// possibly welcome doctor in the future ?
import styles from '@/styles/PatientPage.module.css';
import styleH from '@/styles/Header.module.css';
import styleSidebar from '@/styles/Sidebar.module.css';

interface GreetingDoctor {
  doctorfirstname: string;
  doctorlastname: string;
}

export function WelcomingDoctor({ doctorfirstname, doctorlastname }: GreetingDoctor) {
  return (
    <>
      <p className={styleSidebar.sidebarText}>{'Welcome Dr. '}</p>
      <p className={styleSidebar.sidebarName}>{''.concat(doctorfirstname, ' ', doctorlastname, '\n')}</p>
    </>
  );
}

interface GreetingPatient {
  patientfirstname: string;
  patientlastname: string;
}

export function WelcomingPatient({ patientfirstname, patientlastname }: GreetingPatient) {
  return (
    <>
      <p className={styleSidebar.sidebarText}>{'Scans of patient:'}</p>
      <p className={styleSidebar.sidebarName}>{''.concat(patientfirstname, ' ', patientlastname, '\n')}</p>
    </>
  );
}
