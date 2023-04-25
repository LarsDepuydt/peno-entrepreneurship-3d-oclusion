import { deletePatientById } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useQuery } from '@tanstack/react-query';
import styleB from '@/styles/Buttons.module.css';
import { useState } from 'react';

export default function DeleteButton({patientID}:{patientID: number}) {
  // useQuery(deletePatient.useQuery({ id: patientId }));
  // id still needs to be fixed
  // data is tossed, since this query does not return usefull data

  const query = deletePatient.useQuery({id: patientID});
  const  {data, refetch} = useQuery(query.queryKey, query.queryFn, {enabled: false})

  const delete_patient = () => {
    refetch();
  };

  return (
    <div>
      <button type="button" className={styleB.relu_btn} id={styleB.deleteIcon} onClick={delete_patient}>
      </button>
    </div>
  );
}
