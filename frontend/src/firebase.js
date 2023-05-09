import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as isAnalyticsSupported } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getMessaging } from 'firebase/messaging';
import { getPerformance } from 'firebase/performance';
import { getRemoteConfig } from 'firebase/remote-config';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBnCIzVDVMlv4YyG0N9YTRHdhlQ_GQ18b8",
  authDomain: "relu-backend.firebaseapp.com",
  projectId: "relu-backend",
  storageBucket: "relu-backend.appspot.com",
  messagingSenderId: "309843565343",
  appId: "1:309843565343:web:ba09eabcc3b6e98217ee2a",
  measurementId: "G-XBYJT660Z4"
};

const app = initializeApp(firebaseConfig);
let analytics;
if (typeof window !== 'undefined') {
  isAnalyticsSupported().then((isSupported) => {
    if (isSupported) {
      analytics = getAnalytics(app);
    }
  });
}
const auth = getAuth(app);
const firestore = getFirestore(app);
const functions = getFunctions(app);
let messaging;
if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
  messaging = getMessaging(app);
}
let performance;
if (typeof window !== 'undefined') {
  performance = getPerformance(app);
}
let remoteConfig;
if (typeof window !== 'undefined') {
  remoteConfig = getRemoteConfig(app);
}
const storage = getStorage(app);

export { analytics, auth, firestore, functions, messaging, performance, remoteConfig, storage };
