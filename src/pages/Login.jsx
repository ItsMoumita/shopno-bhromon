
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { MdEmail } from "react-icons/md";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePassword = () => setPasswordVisible(!passwordVisible);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, googleSignIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();



  // Email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await signIn(email, password);
      setUser(result.user);
      
       // SweetAlert success
    Swal.fire({
      title: "Login Successful!",
      text: `Welcome back, ${result.user.displayName || "User"} ✅`,
      icon: "success",
      confirmButtonColor: "#4657F0",
    });

    navigate(location.state?.from || "/", { replace: true }); 
  } catch (err) {
    console.error("Login error:", err.message);

    // SweetAlert error
    Swal.fire({
      title: "Login Failed",
      text: err.message,
      icon: "error",
      confirmButtonColor: "#4657F0",
    });

    }
  };

  // Google login
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      setUser(result.user);
      console.log("Google Sign-In successful 🚀", result.user);

      navigate("/");
    } catch (err) {
      console.error("Google login error:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#12121c] px-4">
      <Helmet>
        <title>Login | সপ্নভ্রমণ</title>
      </Helmet>
      {/* Back Home */}
      <div className="mb-6">
        <Link
          to="/"
          className="text-[#4657F0] hover:text-[#2f3fd9] text-lg font-medium flex items-center"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6 signin-card">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email and password to login
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Email
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <MdEmail />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                required
                className="w-full pl-9 pr-3 py-2 border rounded-md bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#4657F0] outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaLock />
              </span>
              <input
                type={passwordVisible ? "text" : "password"}
                required
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-10 py-2 border rounded-md bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#4657F0] outline-none transition-all"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {passwordVisible ? <FaEye />: <FaEyeSlash />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md text-white bg-[#4657F0] hover:bg-[#2f3fd9] text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-black px-2 text-gray-500 dark:text-gray-400">
              Or continue with
            </span>
          </div>
        </div>

        {/* Google button only */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-black rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
        >
          <FcGoogle className="text-xl" />
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Login with Google
          </span>
        </button>

        {/* Register link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#4657F0] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;