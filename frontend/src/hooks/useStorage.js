import { useState, useEffect } from "react";
import { storage } from "../firebase";

const useStorage = (path) => {
  const [url, setUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storageRef = storage.ref(path);

    storageRef
      .getDownloadURL()
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
