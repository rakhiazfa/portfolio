import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCSdTbNGKNAYAHO43-wgmFQdBs-hpaErC8",
    authDomain: "rakhiazfa-b2884.firebaseapp.com",
    projectId: "rakhiazfa-b2884",
    storageBucket: "rakhiazfa-b2884.appspot.com",
    messagingSenderId: "769073507317",
    appId: "1:769073507317:web:b0014ec4073a19daa58ebc",
    measurementId: "G-QJKJV4JTG2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
