import { deletePatientById } from '@/gen/proto/threedoclusion/v1/service-ScanService_connectquery';
import { useQuery } from '@tanstack/react-query';
import styleB from '@/styles/Buttons.module.css';
import { useState } from 'react';

export default function DeleteButton() {
  const [scanId, setScanId] = useState<number | undefined>(undefined);

  // useQuery(deletescan.useQuery({ id: scanId }));
  // id still needs to be fixed
  // data is tossed, since this query does not return usefull data

  const delete_scan = () => {
    setScanId(2);
  };

  return (
    <div>
      <button type="button" className={styleB.relu_btn} id={styleB.deleteIcon} onClick={delete_scan}>
      </button>
    </div>
  );
}
