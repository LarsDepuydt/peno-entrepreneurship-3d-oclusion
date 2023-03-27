import download from 'downloadjs';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css'
import React, { useCallback } from 'react';
import useStorage from '../../hooks/useStorage';


function handleDownloadClick() {
    const fileUrl = 'gs://relu-vr-scan-database.appspot.com/Patiënt-Scans/Patient-1/lower_ios_6.obj';
    download(fileUrl, 'lowerjaw_holger.obj');
  }


const DownloadButton = () => {
  const router = useRouter();
  const path = '//relu-vr-scan-database.appspot.com/Patiënt-Scans/Patient-1/lower_ios_6.obj';
  const { url, loading, error } = useStorage(path);

  const handleDownloadClick = useCallback(() => {
    if (!url) return;

    // Create an anchor element with the download attribute
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
    return <div>Error: {error.message}</div>;
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
