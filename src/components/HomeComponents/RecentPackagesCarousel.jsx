"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

// Package card inside carousel
const PackageCard = ({ pkg }) => {
  return (
    <motion.div
      className="relative w-72 h-96 flex-shrink-0 rounded-lg overflow-hidden shadow-xl group"
      whileHover={{
        y: -8,
        transition: { type: "spring", stiffness: 300 },
      }}
    >
      <img
        src={pkg.coverImage}
        alt={pkg.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        <h3 className="font-bold text-2xl tracking-wide">{pkg.title}</h3>
        <p className="text-sm text-gray-200">
          📍 {pkg.destination}
        </p>
        <p className="mt-2 font-semibold text-[#FFD700]">
          ৳{pkg.price?.toLocaleString()} — {pkg.duration} days
        </p>
        <Link
          to={`/package/${pkg._id}`}
          className="mt-4 inline-block bg-[#4657F0] px-4 py-2 text-sm rounded font-bold hover:bg-[#2f3fd9] transition"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default function RecentPackagesCarousel() {
  const axiosSecure = useAxiosSecure();
  const [recentPackages, setRecentPackages] = useState([]);
  const [dragConstraint, setDragConstraint] = useState(0);
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axiosSecure.get("/api/packages?limit=6");
        setRecentPackages(res.data);
      } catch (err) {
        console.error("Failed to fetch recent packages:", err);
      }
    };
    fetchRecent();
  }, [axiosSecure]);

  // Calculate drag constraints
  useEffect(() => {
    const calculateConstraints = () => {
      if (containerRef.current && trackRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const trackWidth = trackRef.current.scrollWidth;
        setDragConstraint(containerWidth - trackWidth);
      }
    };
    calculateConstraints();
    window.addEventListener("resize", calculateConstraints);
    return () => window.removeEventListener("resize", calculateConstraints);
  }, []);

  return (
    <div className="font-sans w-full py-12 md:py-20 flex flex-col items-center justify-center bg-gray-50 dark:bg-[#12121c]">
      <div className="w-full max-w-7xl mx-auto px-4">
        {/* Header */}
        <header className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Recently Added <span className="text-[#4657F0]">Packages</span>
          </h1>
          <p className="mt-2 text-lg text-gray-500 dark:text-gray-400">
            Explore our latest tour packages
          </p>
        </header>

        {/* Carousel */}
        <motion.div
          ref={containerRef}
          className="overflow-hidden cursor-grab"
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            ref={trackRef}
            className="flex space-x-6 pb-6 px-4"
            drag="x"
            dragConstraints={{ right: 0, left: dragConstraint - 32 }}
            dragElastic={0.15}
          >
            {recentPackages.map((pkg) => (
              <PackageCard key={pkg._id} pkg={pkg} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}