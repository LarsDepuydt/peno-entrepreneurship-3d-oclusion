import { getPatientById, updatePatientById  } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import styleB from '@/styles/Buttons.module.css';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';

/* still needs to be implemented, just a dummy button */

export default function PinPatientButton({ patientID }: { patientID: number }) {
  const query = getPatientById.useQuery({ id: patientID });
  const { data, refetch } = useQuery(query.queryKey, query.queryFn, { enabled: true });
  const mutation = useMutation(updatePatientById.useMutation());
  

  const handleClick = async () => {
    if (data) {
      await mutation.mutateAsync({ id: patientID, });
      refetch();
    }
  };

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
