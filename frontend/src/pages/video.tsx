import { useState, memo } from 'react';
import BeforeAfter from '@/components/vr/before-after';
import VideoDownload from '@/components/vr/videodownload';
import stylesVideo from '@/styles/Video.module.css';

export default function VideoPage() {
  const [videoChunks, setVideoChunks] = useState([]);
  const BeforeAfterMemo = memo(BeforeAfter); // So no rerender


  const handleVideoChunks = (chunks: any) => {
    setVideoChunks(chunks);
  };

  return (
    <div className={stylesVideo.video_page}>
      <div className={stylesVideo.container}>
        <div className={stylesVideo.before_after_container}>
          <BeforeAfterMemo onVideoChunksChange={handleVideoChunks} />
        </div>
        {videoChunks.length > 0 ? (
          <div className={stylesVideo.download_container}>
            <VideoDownload videoChunks={videoChunks} />
          </div>
        ) : (
          <div className={stylesVideo.loading_message}>
            Please wait while the video is being prepared for download...
          </div>
        )}
      </div>
    </div>
  );
}
