// possibly welcome doctor in the future ?
import styles from '@/styles/PatientPage.module.css';

interface GreetingDoctor {
    doctorfirstname : string
    doctorlastname : string
}

export function WelcomingDoctor({doctorfirstname, doctorlastname}: GreetingDoctor) { 

    const Welcoming = (doctor_name: string) => {
        const welcome = "Welcome " + doctor_name 
        return welcome
    }
    return (
    <>
      <h2 className={styles.welcoming}>{'Welcome Dr. '.concat(doctorfirstname, ' ', doctorlastname)}</h2>
    </>
  );
}
