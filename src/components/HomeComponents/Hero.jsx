import { useState, useEffect } from "react";
import { Link } from "react-router";
import CustomButton from "../ExtraComponents/CustomButton";

const Hero = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const titleText = "Discover the World with সপ্নভ্রমণ ";
  const descText =
    "Find your dream destination, enjoy the journey, and create unforgettable memories.";

  useEffect(() => {
    let i = 0;
    const typeTitle = setInterval(() => {
      setTitle(titleText.slice(0, i + 1));
      i++;
      if (i === titleText.length) clearInterval(typeTitle);
    }, 80);

    return () => clearInterval(typeTitle);
  }, []);

  useEffect(() => {
    let j = 0;
    const typeDesc = setTimeout(() => {
      const typing = setInterval(() => {
        setDesc(descText.slice(0, j + 1));
        j++;
        if (j === descText.length) clearInterval(typing);
      }, 40);
    }, 1800);

    return () => clearTimeout(typeDesc);
  }, []);

  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/hero-video.mp4" // 👈 put your video inside /public folder
        autoPlay
        muted
        loop
        playsInline
      ></video>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          {title}
          <span className="text-[#4657F0] animate-pulse">|</span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          {desc}
          <span className="text-[#4657F0] animate-pulse">|</span>
        </p>
        <CustomButton to="/packages" label="Discover Now" />
      </div>
    </section>
  );
};

export default Hero;
