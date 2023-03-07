// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDj01I6UBIoGyKxQVeetl_ATK6SL9WjMR8",
  authDomain: "e-commerce-app-firebase.firebaseapp.com",
  projectId: "e-commerce-app-firebase",
  storageBucket: "e-commerce-app-firebase.appspot.com",
  messagingSenderId: "603988944633",
  appId: "1:603988944633:web:65aff140a4e6672c0d2428",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
    const [user, setUser] = useState();

  const signUp = (email, password, displayName) =>
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      updateProfile(user, { displayName });
      setUser(user);
      return user;
    });

  const signIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password).then(({ user }) => {
      setUser(user);
      return user;
    });

  const signOutUser = () => signOutUser(auth).then(() => setUser(null));

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      user ? setUser(user) : setUser(null)
    );
    return () => unsubscribe();
  });

  return {
    signIn,
    signUp,
    signOut: signOutUser,
    user,
  };
}
