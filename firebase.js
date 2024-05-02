// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: "realtor-clone-react.firebaseapp.com",
//   projectId: "realtor-clone-react",
//   storageBucket: "realtor-clone-react.appspot.com",
//   messagingSenderId: "274012290784",
//   appId: "1:274012290784:web:6613bae03bba4331989a85",
// };

// // Initialize Firebase
// initializeApp(firebaseConfig);
// export const db = getFirestore();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl8MtMeatmkJVVBmNJu4Hus7R3GipNpNA",
  authDomain: "modules-6c7e7.firebaseapp.com",
  projectId: "modules-6c7e7",
  storageBucket: "modules-6c7e7.appspot.com",
  messagingSenderId: "278384766370",
  appId: "1:278384766370:web:eef4db358b86ea390d96fb",
};

// Initialize Firebase
initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);
export const db = getFirestore();
