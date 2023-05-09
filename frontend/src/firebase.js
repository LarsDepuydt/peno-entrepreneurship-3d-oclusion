// Import Firebase modules using the new v9 syntax
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getMessaging } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';
import { getRemoteConfig } from 'firebase/remote-config';
import { getStorage } from 'firebase/storage';


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
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);
const messaging = getMessaging(app);
const performance = getPerformance(app);
const remoteConfig = getRemoteConfig(app);
const storage = getStorage(app);

// Export the instances you need
export { storage };
