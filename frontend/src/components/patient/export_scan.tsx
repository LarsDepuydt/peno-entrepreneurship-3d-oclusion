import download from 'downloadjs';
import { useRouter } from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';

function handleDownloadClick() {
  const fileUrl = '/lowerjaw_holger.obj';
  download(fileUrl, 'lowerjaw_holger.obj');
}

export default function DownloadButton() {
  const router = useRouter();

  return (
    <>
      <button type="button" className="btn btn-primary btn-large" onClick={handleDownloadClick}>
        download
      </button>
    </>
  );
}
