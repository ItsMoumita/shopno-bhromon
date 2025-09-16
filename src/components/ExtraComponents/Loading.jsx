import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../../assets/loader.json";

const Loading = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full">
      <Lottie
        animationData={loaderAnimation}
        loop
        className="w-50 h-50"
      />
      <p className="mt-4 text-lg font-medium animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loading;