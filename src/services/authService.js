import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

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

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  // Prompt user to select account every time
  provider.setCustomParameters({ prompt: 'select_account' });

  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Check if user record exists in Firestore; if not, create one
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      email: user.email,
      displayName: user.displayName || '',
      country: "India",
      preferredLanguage: "en",
      scanHistory: [],
      createdAt: new Date().toISOString()
    });
  }

  return user;
}