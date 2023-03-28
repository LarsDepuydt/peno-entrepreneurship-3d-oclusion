import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css'
import React, { useCallback } from 'react';
import useStorage from '../../hooks/useStorage';


const DownloadButton = () => {
  const router = useRouter();
  const path = 'gs://relu-vr-scan-database.appspot.com/Patiënt-Scans/Patient-1/lower_ios_6.obj';
  const { url, loading, error } = useStorage(path);

  const handleDownloadClick = useCallback(() => {
    if (!url) return;
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'lowerjaw_holger.obj';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, [url]);

  if (loading) {
    return <button type="button" className="btn btn-primary btn-large" disabled>Loading...</button>;
  }

  if (error) {
    return <button type="button" className="btn btn-primary btn-large" disabled>console.error()</button>;
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
