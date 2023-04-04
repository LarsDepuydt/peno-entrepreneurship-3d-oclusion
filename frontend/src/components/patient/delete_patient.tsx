import { deletePatient } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useQuery } from '@tanstack/react-query';
import styleB from '@/styles/Buttons.module.css';
import { useState } from 'react';

export default function DeleteButton() {
  const [patientId, setPatientId] = useState<number | undefined>(undefined);

  // useQuery(deletePatient.useQuery({ id: patientId }));
  // id still needs to be fixed
  // data is tossed, since this query does not return usefull data

  const delete_patient = () => {
    setPatientId(2);
  };

  return (
    <div>
      <button type="button" className={styleB.relu_btn} id={styleB.appearOnHoverButton} onClick={delete_patient}>
        delete patient
      </button>
    </div>
  );
}
