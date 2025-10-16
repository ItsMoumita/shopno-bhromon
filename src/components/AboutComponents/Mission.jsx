import React from "react";
import { FaGlobeAsia, FaPlaneDeparture, FaMapMarkedAlt } from "react-icons/fa";

const Mission = () => {
  return (
    <section className="w-full bg-white dark:bg-[#12121c] py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Header Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Why <span className="text-[#4657F0]">সপ্নভ্রমণ </span> Exists 🌍
        </h2>

        <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
          সপ্নভ্রমণ is a Bangladeshi travel platform built with passion for
          adventure and a love for our culture. We exist to make travel simple,
          affordable, and meaningful — so that people can explore Bangladesh and
          the world with confidence, joy, and unforgettable memories.
        </p>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Mission */}
          <div
            data-aos="fade-up"
            className="p-6 rounded-lg shadow-md bg-gray-50 dark:bg-[#1c1c29] hover:shadow-xl dark:hover:shadow-white dark:hover:shadow-sm transition"
          >
            <div className="text-[#4657F0] text-4xl mb-4 flex justify-center">
              <FaGlobeAsia />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To become Bangladesh’s most trusted travel companion — connecting
              travelers with the beauty of our country and beyond, through
              affordable, curated, and hassle-free packages.
            </p>
          </div>

          {/* Vision */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="p-6 rounded-lg shadow-md bg-gray-50 dark:bg-[#1c1c29] hover:shadow-xl dark:hover:shadow-white dark:hover:shadow-sm transition"
          >
            <div className="text-[#4657F0] text-4xl mb-4 flex justify-center">
              <FaPlaneDeparture />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To bring Bangladesh closer to the global travel map while inspiring
              every Bangladeshi to explore the world — creating memories that
              last a lifetime.
            </p>
          </div>

          {/* Values */}
          <div
            data-aos="fade-up"
            data-aos-delay="400"
            className="p-6 rounded-lg shadow-md bg-gray-50 dark:bg-[#1c1c29] hover:shadow-xl dark:hover:shadow-white dark:hover:shadow-sm transition"
          >
            <div className="text-[#4657F0] text-4xl mb-4 flex justify-center">
              <FaMapMarkedAlt />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              Our Values
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Integrity, trust, hospitality, and adventure — those are the
              principles that guide সপ্নভ্রমণ  in serving every traveler
              across Bangladesh and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;