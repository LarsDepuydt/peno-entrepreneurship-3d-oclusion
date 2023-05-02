import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import styleL from '@/styles/LandingPage.module.css';

const DownloadButton = dynamic(
  () => import('../components/scan_gallery/export_scan'),
  { ssr: false }
);

export default function DownloadScanTest() {
  useEffect(() => {
    const initializeAnalytics = async () => {
      if (typeof window !== 'undefined') {
        const { getAnalytics, isSupported } = await import('@firebase/analytics');
        if (await isSupported()) {
          getAnalytics();
        }
      }
    };

    initializeAnalytics();
  }, []);

  return (
    <>
      <div className={styleL.all_landing}>
        <div>
          <DownloadButton />
        </div>
      </div>
    </>
  );
}
