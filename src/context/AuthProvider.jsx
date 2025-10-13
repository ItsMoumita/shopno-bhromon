import React, { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
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
  const [roleLoading, setRoleLoading] = useState(true);

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

  const updateUser = (updatedData) => updateProfile(auth.currentUser, updatedData);

  const logOut = () => signOut(auth);

  const googleProvider = new GoogleAuthProvider();
  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setRoleLoading(true);

      if (currentUser) {
        try {
          await currentUser.reload();
          const token = await currentUser.getIdToken();

          // Fetch role from backend
          const res = await axios.get(
            `https://shopno-bhromon-server.vercel.app/users/${currentUser.email}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          setUser({ ...currentUser, ...res.data });
        } catch (err) {
          console.error("❌ Error fetching user:", err);
          setUser(currentUser); // fallback without role
        }
      } else {
        setUser(null);
      }

      setRoleLoading(false);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading || roleLoading) return <Loading />;
// console.log(user?.role);
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
    roleLoading,
  };

  return <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
