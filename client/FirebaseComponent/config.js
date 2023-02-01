// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3f97fP0zq8NG-USObuY8pZEU9Nc6HHS4",
  authDomain: "driverpannel.firebaseapp.com",
  projectId: "driverpannel",
  storageBucket: "driverpannel.appspot.com",
  messagingSenderId: "880390554109",
  appId: "1:880390554109:web:be61daa1a220a308fed994"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

//starting simulator from terminul
// /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app/Contents/MacOS/Simulator -CurrentDeviceUDID BF625786-1B91-4D74-93B4-B3CFA43DA521