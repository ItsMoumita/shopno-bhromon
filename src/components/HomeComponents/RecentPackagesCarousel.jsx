import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PackageCard = ({ pkg, onHoverStart, onHoverEnd }) => (
  <motion.div
    className="relative w-72 h-96 flex-shrink-0 rounded-xl overflow-hidden shadow-xl group mx-2"
    onMouseEnter={onHoverStart}
    onMouseLeave={onHoverEnd}
  >
    <img
      src={pkg.coverImage}
      alt={pkg.title}
      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
    <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
      <h3 className="font-bold text-2xl">{pkg.title}</h3>
      <p className="text-sm">📍 {pkg.destination}</p>
      <p className="mt-2 font-semibold text-[#FFD700]">
        ৳{pkg.price.toLocaleString()} — {pkg.duration} days
      </p>
      <Link
        to={`/package/${pkg._id}`}
        className="mt-4 inline-block bg-[#4657F0] px-4 py-2 text-sm rounded font-bold hover:bg-[#2f3fd9]"
      >
        View Details
      </Link>
    </div>
  </motion.div>
);

const PackageSkeleton = () => (
  <div className="relative w-72 h-96 flex-shrink-0 rounded-xl overflow-hidden shadow-xl mx-2">
    <Skeleton height="100%" borderRadius="0.75rem" />
  </div>
);

export default function RecentPackagesCarousel() {
  const axiosSecure = useAxiosSecure();
  const [recentPackages, setRecentPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const controls = useAnimation();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const res = await axiosSecure.get("/packages?limit=6");
        setRecentPackages(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, [axiosSecure]);

  // Duplicate items for smooth loop
  const loopPackages = [...recentPackages, ...recentPackages];

  // Start autoplay animation
  useEffect(() => {
    if (!loading && recentPackages.length > 0) {
      controls.start({
        x: ["0%", "-100%"],
        transition: {
          duration: 20,
          ease: "linear",
          repeat: Infinity,
        },
      });
    }
  }, [controls, recentPackages, loading]);

  const handleHoverStart = () => controls.stop();
  const handleHoverEnd = () => {
    controls.start({
      x: ["0%", "-100%"],
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Infinity,
      },
    });
  };

  return (
    <div className="w-full py-12 md:py-20 bg-gray-50 dark:bg-[#12121c]">
      <div className="max-w-7xl mx-auto px-4">
        <h2
          data-aos="zoom-in"
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          Recently Added <span className="text-[#4657F0]">Packages</span>
        </h2>

        <div data-aos="zoom-in" className="overflow-hidden">
          {loading ? (
            // Skeleton cards while loading
            <div className="flex">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <PackageSkeleton key={i} />
                ))}
            </div>
          ) : (
            <motion.div className="flex" animate={controls}>
              {loopPackages.map((pkg, index) => (
                <PackageCard
                  key={index + pkg._id}
                  pkg={pkg}
                  onHoverStart={handleHoverStart}
                  onHoverEnd={handleHoverEnd}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
