import styleB from '@/styles/Buttons.module.css';
import { useRouter } from 'next/router';

type InspectObjProps = {
  patientID: number;
  scanID: number;
};

export default function OpenObjButton({ patientID, scanID }: InspectObjProps) {
  const router = useRouter();

  const viewObj = () => {
    process.env.REACT_APP_SCAN_ID = scanID.toString();
    router.push({
      pathname: '/view-obj',
      query: {
        patientID,
        scanID,
      },
    });
  };

  return (
    <div>
      <button type="button" className={styleB.relu_btn} id={styleB.objIcon} onClick={viewObj}></button>
    </div>
  );
}
