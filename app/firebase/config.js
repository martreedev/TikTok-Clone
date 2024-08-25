import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBRfg9A69X1U1MJvWbDWIje4esqs91KiG4",
    authDomain: "tiktok-clone-70fd8.firebaseapp.com",
    projectId: "tiktok-clone-70fd8",
    storageBucket: "tiktok-clone-70fd8.appspot.com",
    messagingSenderId: "814324212203",
    appId: "1:814324212203:web:9a66fed136b9a9141cf9ae",

};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app)
export { app, auth }