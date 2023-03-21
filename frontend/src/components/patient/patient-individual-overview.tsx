import Image, { StaticImageData } from 'next/image'
import { useRouter } from 'next/router';

import styles from '@/styles/PatientPage.module.css'
import { patient } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery'; // moet patient worden? 
import { useQuery } from '@tanstack/react-query';



interface patientProfile {
    id : number 
    patientfirstname : string
    patientlastname : string
    picture : StaticImageData
    date : Date                   //ISO 8601 format: example: Date(2023, 2, 21); --> 21st March, 2023
    deleted?: boolean             // Default value of deleted = false - tussenversie voor backend connectie  
}

export function SinglePatient({id, patientfirstname, patientlastname,picture, date, deleted}: patientProfile) { 

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
    
    const handleDelete = () => {      // tussenversie om te zien of click on button verschilt van click on patient (erboven op de foto van de patient drukken) -> is zo: zie naar URL...
      deleted = true; 
      router.push({
        pathname: '/scans-page',
        query: { 
          deleted 
                }
      });
      //useQuery(patient.DeletePatient({id : id}));  - weet niet of het werkt --> uiteindelijk de bedoeling. 
    };
    



    return (
    <div className={styles.patient_button}>
    <div onClick={clickPatient}>
    <Image id={patientfirstname.concat(' ', patientlastname)} className={styles.patient_picture} src={picture} alt="3d picture of teeth" width={100}/>
    <p className={styles.patientscanName}>{patientfirstname.concat(' ', patientlastname)}</p>
    <button onClick={handleDelete}>Delete</button>
    </div>
    </div>
     ); 
  }





