// possibly welcome doctor in the future ?
import styles from '@/styles/PatientPage.module.css';
import styleH from '@/styles/Header.module.css';

interface GreetingDoctor {
  doctorfirstname: string;
  doctorlastname: string;
}

export function WelcomingDoctor({ doctorfirstname, doctorlastname }: GreetingDoctor) {
  const Welcoming = ({ doctorfirstname, doctorlastname }: GreetingDoctor) => {
    const welcome = 'Welcome Dr. '.concat(doctorfirstname, ' ', doctorlastname);
    return welcome;
  };
  return (
    <>
      <div className={styleH.welcoming}>{Welcoming({ doctorfirstname, doctorlastname })}</div>
    </>
  );
}

interface GreetingPatient {
  patientfirstname: string;
  patientlastname: string;
  doctorfirstname: string;
  doctorlastname: string;
}

export function WelcomingPatient({
  patientfirstname,
  patientlastname,
  doctorfirstname,
  doctorlastname,
}: GreetingPatient) {
  return (
    <>
      <h3>{'Scans of patient '.concat(patientfirstname, ' ', patientlastname, '\n')}</h3>
      <h4>{'under supervision of Dr. '.concat(doctorfirstname, ' ', doctorlastname)} </h4>
    </>
  );
}
