import styleL from '@/styles/LandingPage.module.css';
import DownloadButton from '../components/patient/export_scan'; 

export default function DownloadScanTest() {
  return (
    <>
      <div className={styleL.all_landing}>
        <div >
          <DownloadButton/>
        </div>
      </div>
    </>
  );
}
