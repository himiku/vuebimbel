import firebase from 'firebase/app'
import 'firebase/database'

export const db = firebase.initializeApp(
    {
        apiKey: "AIzaSyD41nLJNDWulNtFFpw29M5qyRRnPCjsiHw",
        authDomain: "qsmart-2019.firebaseapp.com",
        databaseURL: "https://qsmart-2019.firebaseio.com",
        projectId: "qsmart-2019",
        storageBucket: "qsmart-2019.appspot.com",
        messagingSenderId: "916377907515",
        appId: "1:916377907515:web:9865fb16025d234d35071e",
        measurementId: "G-4R7TJ0B5ZC"
    }
).database()
    

// export const db = firebase
//     .initializeApp({
//         apiKey: "AIzaSyC7g1h7J3JVOIie0P5vzIQnXfrWRJ2zJfs",
//         authDomain: "kursusnya.firebaseapp.com",
//         databaseURL: "https://kursusnya.firebaseio.com",
//         projectId: "kursusnya",
//         storageBucket: "kursusnya.appspot.com",
//         messagingSenderId: "56820426350",
//         appId: "1:56820426350:web:420ac667160e425b8b687f",
//         measurementId: "G-G2XM53RNK9"
//     })
    // .database()