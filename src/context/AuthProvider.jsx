import React, {useEffect, useState } from "react";
import {
    GoogleAuthProvider,
    signInWithPopup,
  } from "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { auth } from "../firebase/firebase.init";
import Loading from "../components/ExtraComponents/Loading";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
const [roleLoading, setRoleLoading] = useState(true); // new state




const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    setLoading(true);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
    if (auth.currentUser) {
      await auth.currentUser.reload();
    }
    return userCredential;
  };

  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  const logOut = () => {
    return signOut(auth);
  };



useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
    if (currentUser) {
      await currentUser.reload();

      try {
        const token = await currentUser.getIdToken();

        // Start role loading
        setRoleLoading(true);

        const res = await axios.get(
          `http://localhost:5000/api/users/${currentUser.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser({
          ...currentUser,
          ...res.data,
        });

        setRoleLoading(false); // role loaded
      } catch (err) {
        console.error("❌ Error fetching user:", err);
        setUser(currentUser);
        setRoleLoading(false);
      }
    } else {
      setUser(null);
      setRoleLoading(false);
    }

    setLoading(false);
  });

  return () => unsubscribe();
}, []);



  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  const googleProvider = new GoogleAuthProvider();

const googleSignIn = () => {
  setLoading(true);
  return signInWithPopup(auth, googleProvider);
};

  const userInfo = {
    user,
    setUser,
    createUser,
    logOut,
    signIn,
    googleSignIn,
    loading,
    setLoading,
    updateUser,
  
  };

  console.log(user);
    return (
        <div>
            <AuthContext.Provider value={userInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;