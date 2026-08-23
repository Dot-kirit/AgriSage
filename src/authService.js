import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// Sign up a new user
export async function signUp(email, password, country, language) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Save extra profile info in Firestore
  await setDoc(doc(db, "users", user.uid), {
    email: email,
    country: country,
    preferredLanguage: language,
    scanHistory: []
  });

  return user;
}

// Log in an existing user
export async function logIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}