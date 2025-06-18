import { initializeApp, getApps, getApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDUEVYeRbXtNkfTtOvjYkF_6V9n9mZCQoo",
  authDomain: "baraaburtgehapp.firebaseapp.com",
  projectId: "baraaburtgehapp",
  storageBucket: "baraaburtgehapp.appspot.com",
  messagingSenderId: "219072346296",
  appId: "1:219072346296:web:72ccc34c3e47835b74dc4d",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (e) {
  auth = getAuth(app);
}

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
