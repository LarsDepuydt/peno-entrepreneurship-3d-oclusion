import { useState } from 'react';
import BeforeAfter from '@/components/vr/before-after';
import VideoDownload from '@/components/vr/videodownload';

export default function VideoPage() {
  const [videoChunks, setVideoChunks] = useState([]);

  const handleVideoChunks = (chunks: any) => {
    setVideoChunks(chunks);
  };

  return (
    <div className="video-page">
      <div className="container">
        <div className="before-after-container">
          <BeforeAfter onVideoChunksChange={handleVideoChunks} />
        </div>
        {videoChunks.length > 0 ? (
          <div className="download-container">
            <VideoDownload videoChunks={videoChunks} />
          </div>
        ) : (
          <div className="loading-message">Please wait while the video is being prepared for download...</div>
        )}
      </div>
      <style jsx>{`
        .video-page {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          width: 100vw;
        }
  
        .container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 80%;
          width: 80%;
          padding: 2rem;
          border-radius: 1rem;
          background-color: #f3f3f3;
        }
  
        .before-after-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          border-radius: 1rem;
          background-color: #f3f3f3;
        }
  
        .download-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
        }
  
        .loading-message {
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 1.5rem;
          margin-top: 2rem;
        }
      `}</style>
    </div>
  );
  
}