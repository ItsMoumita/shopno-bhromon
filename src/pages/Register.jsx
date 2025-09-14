// "use client";

import React, { useState } from "react";
import { Link } from "react-router";
import { FaUser, FaLock, FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("REGISTER DATA ➝", { fullName, email, password });
  };

  const handleGoogleSignIn = () => {
    console.log("Google auth triggered 🚀");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-[#12121c] px-4">
      {/* Back Home */}
      <div className="mb-6">
        <Link
          to="/"
          className="text-[#4657F0] dark:text-white/80  hover:text-[#2f3fd9] text-lg font-medium flex items-center"
        >
          ← Back to Home
        </Link>
      </div>

      {/* Card */}
      <div className="w-full max-w-md bg-white dark:bg-black border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm p-6 signin-card">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 dark:bg-gray-900 rounded-full mb-4 text-gray-600 dark:text-gray-300">
            <FaUser />
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            Create account
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your details to get started
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="text-sm font-medium text-gray-900 dark:text-gray-100">
              Full Name
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                <FaUser />
              </span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full pl-9 pr-3 py-2 border rounded-md bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#4657F0] outline-none transition-all"
              />
            </div>
          </div>

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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full pl-9 pr-10 py-2 border rounded-md bg-white dark:bg-black border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-gray-100 placeholder-gray-500 focus:ring-2 focus:ring-[#4657F0] outline-none transition-all"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="h-4 w-4 text-[#4657F0] border-gray-300 rounded focus:ring-[#4657F0]"
            />
            <label className="text-sm text-gray-600 dark:text-gray-400">
              I agree to the{" "}
              <a
                href="#"
                className="text-[#4657F0] hover:underline font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-[#4657F0] hover:underline font-medium"
              >
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!isChecked}
            className="w-full py-2 rounded-md text-white bg-[#4657F0] hover:bg-[#2f3fd9] disabled:opacity-50 text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            Create account
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

        {/* Google button */}
        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center w-full py-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-black rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-all"
        >
          <FcGoogle className="text-xl" />
          <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Sign up with Google
          </span>
        </button>

        {/* Already have account */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#4657F0] font-medium hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;