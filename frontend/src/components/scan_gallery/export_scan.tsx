import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';
import React, { useCallback } from 'react';
import useStorage from '../../hooks/useStorage';
import styleB from '@/styles/Buttons.module.css';

const DownloadButton = () => {
  const router = useRouter();
  const path = 'gs://relu-vr-scan-database.appspot.com/Patiënt-Scans/Patient-1/upper_ios_6.obj';
  const { handleDownloadClick, loading, error } = useStorage(path);

  if (loading) {
    return (
      <button type="button" className={styleB.relu_btn} id={styleB.dropDownButton} disabled>
        loading
      </button>
    );
  }

  if (error) {
    console.error(error);
    return (
      <button type="button" className={styleB.relu_btn} id={styleB.dropDownButton} disabled>
        Error
      </button>
    );
  }

  return (
    <>
      <button type="button" className={styleB.relu_btn} id={styleB.dropDownButton} onClick={handleDownloadClick}>
        Export scan
      </button>
    </>
  );
};

export default DownloadButton;
