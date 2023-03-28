import { useState, useEffect } from "react";
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

  return { url, loading, error };
};

export default useStorage;
