import Image from 'next/image'
import { useRouter } from 'next/router';

import styles from '@/styles/PatientPage.module.css'
import teeth3d from "../../public/3d-teeth.jpg";

export default function ImageButton() { 

    const clickPatient = () => {
        router.push('/scans-page')    // change state f -> t and t -> f
    }

    const router = useRouter();

    return (
    <>
    <div className={styles.patient_button}>
    <div onClick={clickPatient}>
    <Image className={styles.patient_picture} src={teeth3d} alt="3d picture of teeth" width={100}/>
    </div>
    <p>click on the image :)</p>
    </div>
    </> )
  }