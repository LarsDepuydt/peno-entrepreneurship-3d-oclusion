import { useState, memo } from 'react';
import BeforeAfter from '@/components/vr/before-after';
import VideoDownload from '@/components/vr/videodownload';
import stylesVideo from '@/styles/Video.module.css';
import stylesButton from '@/styles/Buttons.module.css';
import { useRouter } from 'next/router';

export default function VideoPage() {
  const [videoChunks, setVideoChunks] = useState([]);
  const BeforeAfterMemo = memo(BeforeAfter); // So no rerender
  const router = useRouter();
  const { scanID } = router.query;
  const { patientID } = router.query;
  const scanId = parseInt(scanID as string, 10);

  const handleVideoChunks = (chunks: any) => {
    setVideoChunks(chunks);
  };

  const home = () =>
    router.push({
      pathname: '/patient',
    });

  return (
    <div className={stylesVideo.video_page}>
      <div className={stylesVideo.container}>
        <div className={stylesVideo.before_after_container}>
          <BeforeAfterMemo onVideoChunksChange={handleVideoChunks} />
        </div>
        {videoChunks.length > 0 ? (
          <div className={stylesVideo.download_container}>
            <VideoDownload videoChunks={videoChunks} />
            <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
          </div>
        ) : (
          <div className={stylesVideo.bottomWrapper}>
            <p className={stylesVideo.loading_message}>Please wait while the video is being prepared for download...</p>
            <button type="button" className={stylesButton.relu_btn} id={stylesButton.homeIcon} onClick={home}></button>
          </div>
        )}
      </div>
    </div>
  );
}
