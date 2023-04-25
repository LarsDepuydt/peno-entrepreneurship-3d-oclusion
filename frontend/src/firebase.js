// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBnCIzVDVMlv4YyG0N9YTRHdhlQ_GQ18b8",
  authDomain: "relu-backend.firebaseapp.com",
  projectId: "relu-backend",
  storageBucket: "relu-backend.appspot.com",
  messagingSenderId: "309843565343",
  appId: "1:309843565343:web:ba09eabcc3b6e98217ee2a",
  measurementId: "G-XBYJT660Z4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Export the instances you need
export { storage };
