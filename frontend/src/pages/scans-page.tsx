import New_Scan from '../components/popups/new-scan';
import {HeaderPatient} from '../components/header/header'; 
import {useRouter} from 'next/router';

export default function ScansPage() {

  const router = useRouter();
  const patientfirstname = router.query.patientfirstname as string;
  const patientlastname = router.query.patientlastname as string;

  return (
    <>
      <div>
        <HeaderPatient patientfirstname = {patientfirstname} patientlastname = {patientlastname} />
      </div>
      <h1>Hello, {patientfirstname} {patientlastname}</h1>
      <New_Scan />
    </>
  );
}


