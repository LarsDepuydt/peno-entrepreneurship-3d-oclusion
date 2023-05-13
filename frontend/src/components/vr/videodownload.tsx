import stylesButton from '@/styles/Buttons.module.css';
export default function VideoDownload({ videoChunks }: {videoChunks: any}) {
  const downloadVideo = () => {
    // Create a blob object from the videoChunks array and url for it
    const blob = new Blob(videoChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);

    // Create a link element and set its attributes for downloading the video
    const a = document.createElement("a");
    a.href = url;
    a.download = "scan.webm";
    a.click();

    // Release the object URL
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button className={stylesButton.relu_btn} onClick={downloadVideo}>Download video</button>
    </>
  );
}

