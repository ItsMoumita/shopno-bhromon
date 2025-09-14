import React from "react";
import { Link } from "react-router";
import aboutBg from "../../assets/travel-about.jpg";

const AboutBanner = () => {
  return (
    <section
      className="relative w-full h-[40vh] bg-center bg-cover flex items-center justify-center"
      style={{ backgroundImage: `url(${aboutBg})` }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white mt-15">
        {/* Breadcrumb */}
        <p className="text-md mb-2">
          <Link to="/" className="hover:text-[#4657F0] transition">
            Home
          </Link>{" "}
          <span className="mx-2">{">"}</span> About Us
        </p>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold">About Us</h1>
      </div>
    </section>
  );
};

export default AboutBanner;