import firebase from "firebase/app";
import "firebase/firestore";

const config = {
	apiKey: "AIzaSyC2IA9tuaC3li03Ci0I_hNpUtAZqRAjigM",
	authDomain: "imess-clone.firebaseapp.com",
	projectId: "imess-clone",
	storageBucket: "imess-clone.appspot.com",
	messagingSenderId: "182593262620",
	appId: "1:182593262620:web:789bfa10d162e749cbbbd9",
};
// Initialize Firebase
firebase.initializeApp(config);

export const db = firebase.firestore();
