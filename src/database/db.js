import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase
    .initializeApp({
        apiKey: "AIzaSyC7g1h7J3JVOIie0P5vzIQnXfrWRJ2zJfs",
        authDomain: "kursusnya.firebaseapp.com",
        databaseURL: "https://kursusnya.firebaseio.com",
        projectId: "kursusnya",
        storageBucket: "kursusnya.appspot.com",
        messagingSenderId: "56820426350",
        appId: "1:56820426350:web:420ac667160e425b8b687f",
        measurementId: "G-G2XM53RNK9"
    })
    .database()
