import styleB from '@/styles/Buttons.module.css';
import { useRouter } from 'next/router';

type InspectVRProps = {
    patientID: number;
    scanID : number; 
  }
  
  export function InspectVR({ patientID, scanID }: InspectVRProps){
      const router = useRouter();
  
      const clickPatient = () => {
          router.push({
            pathname: '/scans-page',
            query: {
              patientID,
              scanID,
            },
          });
        };
  
      return (
          <div>
              <button type="button" className={styleB.relu_btn} id={styleB.InspectVR} onClick={clickPatient}>
              </button>
          </div>
        );
  
  }