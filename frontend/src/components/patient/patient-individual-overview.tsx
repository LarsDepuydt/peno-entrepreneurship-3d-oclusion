import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router';

import styles from '@/styles/PatientPage.module.css'

interface patientProfile {
    picture : StaticImageData
    patientfirstname : string
    patientlastname : string
}

export function SinglePatient({picture, patientfirstname, patientlastname}: patientProfile) { 

    const clickPatient = () => {
        router.push('/scans-page')  
    }

    const router = useRouter();

    return (
    <>
    <div className={styles.patient_button}>
    <div onClick={clickPatient}>
    <Image id={patientfirstname.concat(' ', patientlastname)} className={styles.patient_picture} src={picture} alt="3d picture of teeth" width={100}/>
    <p>{patientfirstname.concat(' ', patientlastname)}</p>
    </div>
    </div>
    </> ); 
  }

  