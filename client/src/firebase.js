// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBPorpPHRRtbLtSqYvV8rdnn82WIUG4W94",
  authDomain: "sketch-connect.firebaseapp.com",
  projectId: "sketch-connect",
  storageBucket: "sketch-connect.appspot.com",
  messagingSenderId: "925929268919",
  appId: "1:925929268919:web:f59cc3c96d54b349688f32",
  measurementId: "G-P8Q82KR8W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
