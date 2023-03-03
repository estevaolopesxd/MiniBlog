
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAUstkz9uXLjuOzwTcPr9FFNG5CgrTgpq8",
  authDomain: "miniblog-28f3c.firebaseapp.com",
  projectId: "miniblog-28f3c",
  storageBucket: "miniblog-28f3c.appspot.com",
  messagingSenderId: "550185961428",
  appId: "1:550185961428:web:81c35928d3531a012df841"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export {db}