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
import axios from "axios";
import { auth } from "../firebase/firebase.init";
import { AuthContext } from "./AuthContext";
import Loading from "../components/ExtraComponents/Loading";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // ✅ Fetch user role and details from backend
  const fetchUserWithRole = async (firebaseUser) => {
    if (!firebaseUser?.email) return;

    try {
      setRoleLoading(true);
      const token = await firebaseUser.getIdToken();

      const res = await axios.get(
        `https://travel-server-liard-ten.vercel.app/users/${firebaseUser.email}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser({
        ...firebaseUser,
        ...res.data, 
      });
    } catch (err) {
      console.error("❌ Error fetching user from backend:", err);
      // fallback to Firebase user only
      setUser(firebaseUser);
    } finally {
      setRoleLoading(false);
    }
  };

  // ✅ Email/password signup
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Email/password login
  const signIn = async (email, password) => {
    setLoading(true);
    const result = await signInWithEmailAndPassword(auth, email, password);
    await fetchUserWithRole(result.user); // Fetch role immediately after login
    setLoading(false);
    return result;
  };

  // ✅ Google login
  const googleSignIn = async () => {
    setLoading(true);
    const result = await signInWithPopup(auth, googleProvider);
    await fetchUserWithRole(result.user); // Fetch role for Google login too
    setLoading(false);
    return result;
  };

  // ✅ Update profile info
  const updateUser = (updatedData) => {
    return updateProfile(auth.currentUser, updatedData);
  };

  // ✅ Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // ✅ Watch auth state changes (for refresh/persistence)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        await fetchUserWithRole(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Show loader while auth/role loading
  if (loading || roleLoading) {
    return <Loading />;
  }

  // ✅ Auth context value
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

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
