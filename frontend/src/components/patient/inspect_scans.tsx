import styleB from '@/styles/Buttons.module.css';
import { useRouter } from 'next/router';

type InspectScansProps = {
  patientID: number;
};

export function InspectScans({ patientID }: InspectScansProps) {
  const router = useRouter();

  const clickPatient = () => {
    router.push({
      pathname: '/scans-page',
      query: {
        patientID,
      },
    });
  };

  return (
    <div>
      <button type="button" className={styleB.relu_btn} id={styleB.InspectScansIcon} onClick={clickPatient}>
      </button>
    </div>
  );
}
