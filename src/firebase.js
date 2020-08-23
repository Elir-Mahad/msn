import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
	apiKey: "AIzaSyBFbbajY498dCIHx8Tv1vvyvGhXvuRQq-s",
	authDomain: "messenger-b2aaf.firebaseapp.com",
	databaseURL: "https://messenger-b2aaf.firebaseio.com",
	projectId: "messenger-b2aaf",
	storageBucket: "messenger-b2aaf.appspot.com",
	messagingSenderId: "226416675846",
	appId: "1:226416675846:web:9e6df7db2b9541d17f4787",
	measurementId: "G-D945VR6RF1"
});

const db = firebaseApp.firestore();
// to access the database - for storing data
// const auth = firebase.auth();
// // to access the authentication - for logging in and out
// const storage = firebase.storage();
// // to access the storage - for uploading content

// export { firebase, db, auth, storage };
export { db };
