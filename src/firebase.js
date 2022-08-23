import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import "firebase/compat/firestore";

import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjuu_6QW9Onfx4MjpqcNgJAqhUSCdnP34",
  authDomain: "t-volunteer-project.firebaseapp.com",
  projectId: "t-volunteer-project",
  storageBucket: "t-volunteer-project.appspot.com",
  messagingSenderId: "344805009985",
  appId: "1:344805009985:web:b8cb8ce187381e80c674c0",
  measurementId: "G-DQ7JE6HW4K"
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const auth = getAuth(app);
export const db = getFirestore(app);

export function signup(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  setLoading(false);
  alert("Uploaded file!");
}
