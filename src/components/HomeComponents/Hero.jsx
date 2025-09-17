import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative w-full min-h-[92vh] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/hero-video.mp4"   // 👈 put your video inside /public folder
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
          Discover the World with <span className="text-[#4657F0]">সপ্নভ্রমণ </span>
        </h1>
        <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
          Find your dream destination, enjoy the journey, and create unforgettable memories.
        </p>
        <Link
          to="/tours"
          className="inline-block px-8 py-3 text-lg font-semibold rounded bg-[#4657F0] hover:bg-[#2f3fd9] transition"
        >
          Discover Now
        </Link>
      </div>
    </section>
  );
};

export default Hero;