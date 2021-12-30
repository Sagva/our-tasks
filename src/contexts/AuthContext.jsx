import React, { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

const useAuthContext = () => {
  return useContext(AuthContext);
};

const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = async (email, password, name) => {
    // signup
    let userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Add display name to user
    await updateProfile(userCredentials.user, {
      displayName: name,
    });

    // create a user document in users collection
    await setDoc(doc(db, "users", userCredentials.user.uid), {
      name: name,
      email: email,
    });
  };

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    // listen for auth-state changes
    onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  const values = {
    currentUser,
    loading,
    login,
    logout,
    signup,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={values}>
      {loading && <div>Loading...</div>}
      {!loading && children}
    </AuthContext.Provider>
  );
};

export { useAuthContext, AuthContextProvider as default };
