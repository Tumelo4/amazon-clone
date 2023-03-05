// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.API_KEY || 'test',
  
  authDomain: process.env.AUTH_DOMAIN || 'test',
  
  projectId: process.env.PROJECT_ID || 'test',

  storageBucket: process.env.STORAGE_BUCKET || 'test',

  messagingSenderId: process.env.MESSAGING_SENDER_ID || 'test',

  appId: process.env.APP_ID || 'test'
  
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db