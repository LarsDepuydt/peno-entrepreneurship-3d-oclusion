import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router';

import styles from '@/styles/PatientPage.module.css'


interface patientProfile {
    picture : StaticImageData
    patientfirstname : string
    patientlastname : string
}

export function SinglePatient({picture, patientfirstname, patientlastname}: patientProfile) { 

    const router = useRouter();

    const clickPatient = () => {
        router.push({
          pathname: '/scans-page',
          query: { 
            patientfirstname,
            patientlastname
          }
        });
      };



    return (
    <>
    <div className={styles.patient_button} onClick={clickPatient}>
    <Image 
    id={patientfirstname.concat(' ', patientlastname)} 
    className={styles.patient_picture} 
    src={picture} 
    alt="3d picture of teeth for ${patientfirstname.concat(' ', patientlastname)}" 
    width={250}/>
    <p>{patientfirstname.concat(' ', patientlastname)}</p>
    </div>
     ); 
  }

