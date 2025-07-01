// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB7Jtb737XTIeI_hxR8tI_DvkJZPpDk4qo",
  authDomain: "wearnow-33e7b.firebaseapp.com",
  projectId: "wearnow-33e7b",
  storageBucket: "wearnow-33e7b.appspot.com",
  messagingSenderId: "709149937002",
  appId: "1:709149937002:web:baacfd94504dfd6abea913"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
