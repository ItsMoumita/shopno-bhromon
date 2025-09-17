import React from "react";
import { FaPlaneDeparture, FaHotel, FaGlobeAmericas, FaHeadset } from "react-icons/fa";

const Features = () => {
  return (
    <section className="w-full bg-white dark:bg-[#12121c] py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-12">
          Why Choose <span className="text-[#4657F0]">সপ্নভ্রমণ</span> 
        </h2>

        {/* Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Feature 1 */}
          <div data-aos="fade-up" className="flex flex-col items-center">
            <FaPlaneDeparture className="text-5xl text-[#4657F0] mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Affordable Tour Packages
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Explore Bangladesh and beyond with the best deals designed for every traveler’s budget. 
              Adventure doesn’t have to be expensive.
            </p>
          </div>

          {/* Feature 2 */}
          <div data-aos="fade-up" data-aos-delay="150" className="flex flex-col items-center">
            <FaHotel className="text-5xl text-[#4657F0] mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Handpicked Resorts
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Stay at carefully selected hotels & resorts with comfort, quality,
              and local experiences ensured at every step.
            </p>
          </div>

          {/* Feature 3 */}
          <div data-aos="fade-up" data-aos-delay="300" className="flex flex-col items-center">
            <FaGlobeAmericas className="text-5xl text-[#4657F0] mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Global Availability
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Whether it’s Cox’s Bazar or Canada, our services stretch across
              continents, so your dreams always find a path.
            </p>
          </div>

          {/* Feature 4 */}
          <div data-aos="fade-up" data-aos-delay="450" className="flex flex-col items-center">
            <FaHeadset className="text-5xl text-[#4657F0] mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              24/7 Customer Support
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Our travel experts are always a call away — helping you with 
              bookings, changes, or advice, anytime, anywhere.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Features;