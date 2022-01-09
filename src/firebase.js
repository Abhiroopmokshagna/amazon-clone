import firebase from 'firebase/compat/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAxK71ELdCOnHdljxZLac0pWJ_-lZLlUVc",
  authDomain: "clone-6d32a.firebaseapp.com",
  projectId: "clone-6d32a",
  storageBucket: "clone-6d32a.appspot.com",
  messagingSenderId: "1070885610508",
  appId: "1:1070885610508:web:2639fccda541b111e37a29"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth(firebaseApp);

export { db, auth };