import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyC_hQ1CIIe5bonHFZ7OqIUUpLckE8QfrfE",
  authDomain: "crwn-db-675fe.firebaseapp.com",
  databaseURL: "https://crwn-db-675fe.firebaseio.com",
  projectId: "crwn-db-675fe",
  storageBucket: "crwn-db-675fe.appspot.com",
  messagingSenderId: "787976252478",
  appId: "1:787976252478:web:e4ef3198ed0ada03bc356f",
  measurementId: "G-RBHH0N2262"
};

export const createUserProfileDocument = async (userAuth, additonalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({displayName, email, createdAt, ...additonalData});
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const singInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
