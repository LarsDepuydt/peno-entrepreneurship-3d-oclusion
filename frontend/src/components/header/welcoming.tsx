// possibly welcome doctor in the future ?
import styles from '@/styles/PatientPage.module.css';

interface Greeting {
  doctorfirstname: string;
  doctorlastname: string;
}

export default function Welcoming({ doctorfirstname, doctorlastname }: Greeting) {
  const Welcoming = (doctor_name: string) => {
    const welcome = 'Welcome ' + doctor_name;
    return welcome;
  };

  return (
    <>
      <h2 className={styles.welcoming}>{'Welcome Dr. '.concat(doctorfirstname, ' ', doctorlastname)}</h2>
    </>
  );
}
