import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyArhUfBrntPsuGewKQbaZVPRkN3okbeA4s",
  authDomain: "clicon-account.firebaseapp.com",
  projectId: "clicon-account",
  storageBucket: "clicon-account.firebasestorage.app",
  messagingSenderId: "943291876968",
  appId: "1:943291876968:web:fd2ced0d43a1ad4e871ddd",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
