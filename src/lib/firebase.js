// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyD2eP-m03EHdpiklCfiJ76ms1gomGqszxI",
//   authDomain: "escandon-c2310.firebaseapp.com",
//   projectId: "escandon-c2310",
//   storageBucket: "escandon-c2310.appspot.com",
//   messagingSenderId: "963640030545",
//   appId: "1:963640030545:web:5d4f8c9c10d8213c2a0f70"
// };

const firebaseConfig = {
  apiKey: "AIzaSyACxrW0qtPK4UIRcvnmBXuZdbM2iAtawDM",
  authDomain: "inventario-fa301.firebaseapp.com",
  projectId: "inventario-fa301",
  storageBucket: "inventario-fa301.appspot.com",
  messagingSenderId: "1001026617121",
  appId: "1:1001026617121:web:7f2c06b21d094188ffc860",
  measurementId: "G-NTNWJ1TPPZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getFirestore();