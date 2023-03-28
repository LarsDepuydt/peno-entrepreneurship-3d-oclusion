import { useState, useEffect, useCallback} from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";



const useStorage = (path) => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storageRef = ref(storage, path);

    getDownloadURL(storageRef)
      .then((url) => {
        setUrl(url);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [path]);

  const handleDownloadClick = useCallback(() => {
     if (!url) return;
     const anchor = document.createElement('a');
     anchor.href = url;
     anchor.download = 'lowerjaw_holger.obj';
     document.body.appendChild(anchor);
     anchor.click();
     document.body.removeChild(anchor);
  }, [url]);

  return { handleDownloadClick, loading, error };
};

export default useStorage;
