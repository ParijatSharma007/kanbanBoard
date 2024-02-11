// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { connectAuthEmulator, getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
    apiKey : process.env.APIKEY ,
    authDomain : process.env.AUTHDOMAIN ,
    databaseURL : process.env.DATABASEURL ,
    projectId : process.env.PROJECTID ,
    storageBucket : process.env.STORAGEBUCKET ,
    messagingSenderId : process.env.MESSAGINGSENDERID ,
    appId : process.env.APPID ,    
    measurementId : process.env.MEASUREMENTID
};

// Initialize Firebase
export const firebaseInitializer = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseInitializer)
export const db = getFirestore(firebaseInitializer)
// export const firebaseAuth = getAuth(firebaseInitializer)
// export const firebaseDb = getFirestore(firebaseInitializer)
// export const storage = getStorage(firebaseInitializer)

// connectAuthEmulator(firebaseAuth, "http://localhost:8080");

