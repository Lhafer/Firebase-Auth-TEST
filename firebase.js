import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAj72oKIoCkA4pUJNj4hk3J3gMIcWmp7ak",
  authDomain: "fir-auth-9e528.firebaseapp.com",
  projectId: "fir-auth-9e528",
  storageBucket: "fir-auth-9e528.appspot.com",
  messagingSenderId: "798029181503",
  appId: "1:798029181503:web:f9b5a49d9640eedaf1fe8a",
};

const FIREBASE_APP = initializeApp(firebaseConfig);

const auth = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore();

export { auth, db };
