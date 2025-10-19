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
    
    return userCredential;
  };

  const updateUser = async (updatedData) => {
    await updateProfile(auth.currentUser, updatedData);
   
    setUser((prevUser) => ({
      ...prevUser,
      displayName: updatedData.displayName || prevUser.displayName,
    
    }));
  };

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

       
          const res = await axios.get(
            `https://shopno-bhromon-server.vercel.app/users/${currentUser.email}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

        
          const mergedUser = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName || res.data.name, 
            photoURL: res.data.profilePic || currentUser.photoURL || "https://i.ibb.co/MBtjqXQ/male-placeholder-image.jpg", 
            role: res.data.role, 
          };
          setUser(mergedUser);
        } catch (err) {
          console.error("❌ Error fetching user data from backend:", err);
         
          setUser({
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL || "https://i.ibb.co/MBtjqXQ/male-placeholder-image.jpg", // Fallback placeholder
            role: "user", 
          });
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