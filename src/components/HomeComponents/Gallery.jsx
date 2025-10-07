"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FancyButton from "../ExtraComponents/FancyButton";

// Heart icon (same as Sera UI)
const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5 text-white group-hover:text-pink-500 transition-colors"
  >
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

// Sera UI GridItem (unchanged look/behavior)
const GridItem = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.div
      className="mb-4 break-inside-avoid relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <img
        src={item.imageUrl}
        alt={item.title}
        className="w-full h-auto rounded-xl shadow-lg"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/400x300/fecaca/333333?text=Image+Not+Found`;
        }}
      />
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"
          >
            <div className="p-4 h-full flex flex-col justify-between">
              <div className="flex justify-start gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="p-2 bg-black/30 rounded-lg backdrop-blur-sm group"
                >
                  <HeartIcon />
                </motion.button>
              </div>
              <p className="text-white font-bold text-base truncate">{item.title}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const MasonryGrid = ({ items }) => {
  return (
    <div
      className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4"
      style={{ columnWidth: "280px" }}
    >
      {items.map((item) => (
        <GridItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default function Gallery() {
  const axiosSecure = useAxiosSecure();
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // State for small-device "see more"
  const [isSmall, setIsSmall] = useState(false);
  const [showAll, setShowAll] = useState(false);

  // How many to show on small devices before "See more"
  const SMALL_SHOW_COUNT = 4;

  useEffect(() => {
    // detect small device (mobile)
    const onResize = () => setIsSmall(window.innerWidth < 768); // md breakpoint
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        // fetch latest 6 resorts (backend should support ?limit=6)
        const res = await axiosSecure.get("/api/resorts?limit=6");
        const resorts = res.data || [];

        // Flatten each resort into images (cover + gallery)
        const items = resorts.flatMap((resort) => {
          const images = [resort.coverImage, ...(resort.gallery || [])].filter(Boolean);
          return images.map((img, i) => ({
            id: `${resort._id}-${i}`,
            imageUrl: img,
            title: resort.name,
          }));
        });

        setGalleryItems(items);
      } catch (err) {
        console.error("Failed to fetch resorts gallery:", err);
        setGalleryItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [axiosSecure]);

  // Determine which items to display
  const visibleItems = isSmall && !showAll ? galleryItems.slice(0, SMALL_SHOW_COUNT) : galleryItems;

  return (
    <section className="bg-gray-50 dark:bg-[#12121c] py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title + Description */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Discover Our Resorts Gallery
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A curated selection of recent resorts — hover any image to see details. 
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-gray-200 dark:bg-neutral-800 h-40 animate-pulse" />
            ))}
          </div>
        ) : (
          <>
            <MasonryGrid items={visibleItems} />

            {/* Small device: See more / Show less */}
            {isSmall && galleryItems.length > SMALL_SHOW_COUNT && (
              <div className="mt-6 text-center">
               
                <FancyButton label={showAll ? "Show less" : "See more"} onClick={() => setShowAll((s) => !s)}> </FancyButton>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}