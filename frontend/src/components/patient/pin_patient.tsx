import { getPatientById, updatePatientById  } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import styleB from '@/styles/Buttons.module.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { queryClient } from '@/pages/_app';

/* still needs to be implemented, just a dummy button */

export default function PinPatientButton({ patientID }: { patientID: number }) {
  const query = getPatientById.useQuery({ id: patientID });
  const [modal, setModal] = useState(false);
  
  const toggleModal = () => setModal(!modal); // change state f -> t and t -> f

  const updatePatient = () => {
    refetch();
    console.log('patient is updated');
    setModal(!modal);
    refetch();
  };

  

  const refreshKey = updatePatientById.useQuery().queryKey;
  const { data, refetch } = useQuery(
    updatePatientById.useQuery({ id: patientID }).queryKey,
    updatePatientById.useQuery({ id: patientID }).queryFn,
    {
      enabled: false,
      onSuccess: () => queryClient.refetchQueries(refreshKey),
    }
  );

  if (data != undefined) {
    const pinned = data.pinned;
    return (
      <div>
        {pinned && (
          <div>
            <button type="button" className={styleB.relu_btn} id={styleB.pinnedIcon} onClick={handleClick}></button>
          </div>
        )}

        {!pinned && (
          <div>
            <button type="button" className={styleB.relu_btn} id={styleB.unpinnedIcon} onClick={handleClick}></button>
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <button type="button" className={styleB.relu_btn} id={styleB.unpinnedIcon}></button>
      </div>
    );
  }
}
