import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyCdKHLM6_7ZhC7FmmxmzroMrtPmHlL8S7E",
  authDomain: "eshop-a7e80.firebaseapp.com",
  projectId: "eshop-a7e80",
  storageBucket: "eshop-a7e80.appspot.com",
  messagingSenderId: "210536635875",
  appId: "1:210536635875:web:102174013c4495022b94d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;