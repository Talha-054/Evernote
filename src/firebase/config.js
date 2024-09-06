import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


const firebaseConfig = {
      apiKey: "AIzaSyBI0Oxe7mZILI0Gyf65DcjUUibIkSeNCi8",
      authDomain: "planner-153b8.firebaseapp.com",
      projectId: "planner-153b8",
      storageBucket: "planner-153b8.appspot.com",
      messagingSenderId: "696878551962",
      appId: "1:696878551962:web:e73afc53d1c0012e612023"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth();


