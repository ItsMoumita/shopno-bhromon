
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ChevronLeftIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" height="24"
    viewBox="0 0 24 24"
    fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

const Badge = ({ children, className }) => (
  <div
    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium ${className}`}
  >
    {children}
  </div>
);

const ResortCard = ({ resort }) => (
  <div className="relative w-72 h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-xl group mx-2">
    <img
      src={resort.coverImage}
      alt={resort.name}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "https://placehold.co/400x600/1e1e1e/ffffff?text=Image+Missing";
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
    <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
      <h3 className="font-bold text-2xl tracking-wide">{resort.name}</h3>
      <p className="text-sm">{resort.location}</p>
      <p className="mt-2 font-semibold text-[#FFD700]">
        ৳{resort.pricePerNight?.toLocaleString()} / night
      </p>
      <p className="mt-2 font-semibold text-[#FFD700]">
         ⭐ {resort.rating?.toFixed(1) || "N/A"}
      </p>
     
    </div>
  </div>
);

export default function RecentResortsCarousel() {
  const axiosSecure = useAxiosSecure();
  const [resorts, setResorts] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayIntervalRef = useRef(null);
  const autoplayDelay = 3000;

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const res = await axiosSecure.get("/api/resorts?limit=6");
        setResorts(res.data);
      } catch (err) {
        console.error("Failed to fetch resorts:", err);
      }
    };
    fetchResorts();
  }, [axiosSecure]);

  useEffect(() => {
    if (!isPaused && resorts.length > 0) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % resorts.length);
      }, autoplayDelay);
    }
    return () => clearInterval(autoplayIntervalRef.current);
  }, [isPaused, resorts]);

  const changeSlide = (newIndex) => {
    setActiveIndex((newIndex + resorts.length) % resorts.length);
    if (autoplayIntervalRef.current) {
      clearInterval(autoplayIntervalRef.current);
    }
  };

  return (
    <section
      className="w-full flex flex-col items-center justify-center font-sans overflow-hidden py-12 md:py-20 bg-gray-50 dark:bg-[#12121c]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div data-aos="zoom-in" className="w-full max-w-7xl mx-auto p-4">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-black dark:text-white">
            Explore Top <span className="text-[#4657F0]">Resorts</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400">
            Discover the best resorts for your next vacation.
          </p>
        </header>

        <div  className="relative w-full h-[280px] md:h-[400px] flex items-center justify-center overflow-hidden pt-12">
          <motion.div 
            className="flex w-full justify-center"
            animate={{ x: `-${activeIndex * 300}px` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {resorts.map((resort, index) => (
              <ResortCard key={resort._id} resort={resort} />
            ))}
          </motion.div>

          {/* Left Arrow */}
          <button
            onClick={() => changeSlide(activeIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => changeSlide(activeIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div  className="mt-6 flex items-center justify-center gap-2">
          {resorts.map((_, idx) => (
            <button
              key={idx}
              onClick={() => changeSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                activeIndex === idx
                  ? "w-6 bg-[#4657F0]"
                  : "w-2 bg-gray-300 dark:bg-neutral-600 hover:bg-gray-400 dark:hover:bg-neutral-500"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}