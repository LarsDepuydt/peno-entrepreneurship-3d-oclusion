import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css'
import React, { useCallback } from 'react';
import useStorage from '../../hooks/useStorage';


const DownloadButton = () => {
  const router = useRouter();
  const path = 'gs://relu-vr-scan-database.appspot.com/Patiënt-Scans/Patient-1/upper_ios_6.obj';
  const { handleDownloadClick, loading, error } = useStorage(path);

  
  if (loading) {
    return <button type="button" className="btn btn-primary btn-large" disabled>Loading...</button>;
  }

  if (error) {
    console.error(error);
    return <button type="button" className="btn btn-primary btn-large" disabled>Error</button>;
  }

  return (
    <>
      <button type="button" className="btn btn-primary btn-large" onClick={handleDownloadClick}>
        Download
      </button>
    </>
  );
};

export default DownloadButton;

