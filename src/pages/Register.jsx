

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router"; 
import { FaUser, FaFileImage, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2"; 
import { Helmet } from "react-helmet-async";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const { createUser, setUser, googleSignIn, updateUser } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const result = await createUser(email, password);

      let photoURL = "";
      if (profilePic) {
        photoURL = URL.createObjectURL(profilePic);
      }

      await updateUser({ displayName: fullName, photoURL });
      setUser(result.user);

      const user = { name: fullName, email, profilePic: photoURL };
      await axios.post("https://shopno-bhromon-server.vercel.app/users", user);

      // ✅ SweetAlert after success
      Swal.fire({
           title: "Registration Successful 🎉",
           text: `Welcome back, ${result.user.displayName || "User"} ✅`,
           icon: "success",
           confirmButtonColor: "#4657F0",
         });

      navigate("/"); // Navigate home after signup
    } catch (err) {
      console.error("Registration failed:", err.message);

      //  SweetAlert for error
     Swal.fire({
      title: "Registration Failed",
      text: err.message,
      icon: "error",
      confirmButtonColor: "#4657F0",
    });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      setUser(result.user);

      const user = {
        name: result.user.displayName,
        email: result.user.email,
        profilePic: result.user.photoURL,
      };
      await axios.post("https://shopno-bhromon-server.vercel.app/users", user);

      Swal.fire({
        icon: "success",
        title: "Welcome 🎉",
        text: "Google Sign-In Successful!",
        showConfirmButton: false,
        timer: 2000,
      });

      navigate("/");
    } catch (err) {
      console.error("Google sign-in failed:", err.message);
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#12121c] px-4">
      <Helmet>
        <title>Register | সপ্নভ্রমণ</title>
      </Helmet>
      <div className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-100 mb-4">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-9 pr-3 py-2 border rounded-md dark:bg-black"
              />
            </div>
          </div>

          {/* Profile Picture */}
          <div>
            <label className="text-sm font-medium">Profile Picture</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaFileImage />
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProfilePic(e.target.files[0])}
                className="w-full pl-9 pr-3 py-2 border rounded-md dark:bg-black"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <MdEmail />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 border rounded-md dark:bg-black"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full pl-9 pr-10 py-2 border rounded-md dark:bg-black"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <span className="text-sm">I agree to the Terms & Privacy</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isChecked}
            className="w-full py-2 rounded-md text-white bg-[#4657F0] hover:bg-[#2f3fd9] disabled:opacity-50"
          >
            Create account
          </button>
        </form>

        {/* Or Google */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-black px-2 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        <button
          onClick={handleGoogleSignIn}
          type="button"
          className="flex items-center justify-center w-full py-2 border rounded"
        >
          <FcGoogle className="text-xl" />
          <span className="ml-2">Sign up with Google</span>
        </button>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-[#4657F0] hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;