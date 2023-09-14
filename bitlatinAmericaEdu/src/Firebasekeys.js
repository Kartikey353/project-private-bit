// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBWeDODeb_E0SNitGhLlMbio-1zMVQbxZ8",
    authDomain: "bitmemoir-b55fa.firebaseapp.com",
    projectId: "bitmemoir-b55fa",
    storageBucket: "bitmemoir-b55fa.appspot.com",
    messagingSenderId: "76208515391",
    appId: "1:76208515391:web:0a8a72e8d197b6b0fc4b8a",
    measurementId: "G-Y1SJJJCNFE"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);