import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAGEzsRDkqn0hsSWlEAJjRLKzu3kEZJ4GQ",
  authDomain: "relu-vr-scan-database.firebaseapp.com",
  projectId: "relu-vr-scan-database",
  storageBucket: "relu-vr-scan-database.appspot.com",
  messagingSenderId: "102837943574",
  appId: "1:102837943574:web:87a1c484e33f82275be437",
  measurementId: "G-GM8P0TDCZ6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);