import firebase from "firebase/app";
import "firebase/storage";

// Web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyC6PitjCMHh2egZo3zKkrq86IOiMMr-N1E",
  authDomain: "phobos-85710.firebaseapp.com",
  projectId: "phobos-85710",
  storageBucket: "phobos-85710.appspot.com",
  messagingSenderId: "818911871901",
  appId: "1:818911871901:web:31e4725b8e3c8bc119a574",
  measurementId: "G-ZEDDB2M4W7"
};
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();
  
  export { firebase, storage as default };