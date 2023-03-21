import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import styleB from '@/styles/Buttons.module.css';
import styles from '@/styles/Upload.module.css';
import { ChangeEvent, MouseEvent, useState } from 'react';

const FileUpload: NextPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const onFileUploadChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;

    if (!fileInput.files) {
      alert('No file was chosen');
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Files list is empty');
      return;
    }

    const file = fileInput.files[0];

    /** File validation */
    if (!file.type.startsWith('image')) {
      alert('Please select a valide image');
      return;
    }

    /** Setting file state */
    setFile(file); // we will use the file state, to send it later to the server
    setPreviewUrl(URL.createObjectURL(file)); // we will use this to show the preview of the image

    /** Reset file input */
    e.currentTarget.type = 'text';
    e.currentTarget.type = 'file';
  };

  const onUploadFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('From onUploadFile');
  };

  const onCancelFile = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!previewUrl && !file) {
      return;
    }
    setFile(null);
    setPreviewUrl(null);
  };

  return (
    <div>
      <main className="py-10">
        <div className="w-full max-w-3xl px-3 mx-auto">
          <form className="w-full p-3 border border-gray-500 border-dashed" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col md:flex-row gap-1.5 md:py-4">
              <div className="flex-grow">
                {previewUrl ? (
                  <div className="mx-auto w-80">
                    <Image alt="file uploader preview" src={previewUrl} width={320} height={218} />
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center h-full py-3 transition-colors duration-150 cursor-pointer hover:text-gray-600">
                    <input className="block w-0 h-0" name="file" type="file" onChange={onFileUploadChange} />
                  </label>
                )}
              </div>

              <div className={styles.spacing_btn}>
                <button disabled={!previewUrl} onClick={onCancelFile} className={styleB.relu_btn}>
                  Cancel file
                </button>
                <button disabled={!previewUrl} onClick={onUploadFile} className={styleB.relu_btn}>
                  Upload file
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default FileUpload;
