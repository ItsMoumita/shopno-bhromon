
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../hooks/useAxiosSecure";
import {
  FaMapMarkerAlt,
  FaClock,
  FaTag,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import CustomButton from "../components/ExtraComponents/CustomButton";

export default function PackageDetails() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const res = await axiosSecure.get(`/api/packages/${id}`);
        setPkg(res.data);
      } catch (err) {
        console.error("Error fetching package details:", err);
      }
    };
    fetchPackage();
  }, [axiosSecure, id]);

  if (!pkg) {
    return <p className="text-center mt-20 text-gray-500">Loading...</p>;
  }

  // Simple inline AnimatedBadge element
  const AnimatedBadge = ({ text, icon, borderColor = "via-sky-500" }) => (
    <div
      className={`rounded-full p-[1px] bg-gradient-to-r from-transparent ${borderColor} to-transparent [background-size:400%_100%]`}
      style={{ animation: "move-bg 8s linear infinite" }}
    >
      <div className="inline-flex items-center gap-2 rounded-full bg-white dark:bg-[#0a091e] px-4 py-1.5 text-sm text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-transparent">
        {icon}
        <span>{text}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#12121c]">
      <div className="max-w-7xl mx-auto px-4">
      {/* Keyframes once (scoped into JSX) */}
      <style>
        {`
          @keyframes move-bg {
            to {
              background-position: 400% 0;
            }
          }
        `}
      </style>

      {/* Hero Section */}
      <div data-aos="zoom-in" className="relative w-full h-72 md:h-[400px] lg:h-[480px]">
        <img
          src={pkg.coverImage}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white">
            {pkg.title}
          </h1>
          <p className="text-lg text-white flex items-center gap-2 mt-2">
            <FaMapMarkerAlt /> {pkg.destination}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className=" py-10 space-y-10">
        {/* Highlights */}
        <div data-aos="zoom-in" className="flex flex-wrap gap-3">
          <AnimatedBadge
            text={pkg.destination}
            icon={<FaMapMarkerAlt className="text-[#4657F0]" />}
            borderColor="via-pink-500"
          />
          <AnimatedBadge
            text={`${pkg.duration} Days`}
            icon={<FaClock className="text-[#4657F0]" />}
            borderColor="via-indigo-500"
          />
          <AnimatedBadge
            text={pkg.category}
            icon={<FaTag className="text-[#4657F0]" />}
            borderColor="via-emerald-500"
          />
          <AnimatedBadge
            text={pkg.availability ? "Available" : "Unavailable"}
            icon={
              <FaCheckCircle
                className={pkg.availability ? "text-green-500" : "text-red-500"}
              />
            }
            borderColor="via-yellow-500"
          />
          <AnimatedBadge
            text={`৳${pkg.price.toLocaleString()}`}
            icon={<FaCalendarAlt className="text-[#4657F0]" />}
            borderColor="via-cyan-500"
          />
        </div>

        {/* Description */}
        <div data-aos="zoom-in" className="bg-white dark:bg-[#1b1b2b] p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3 text-[#4657F0]">Overview</h2>
          <p className="text-gray-700 dark:text-gray-300">{pkg.description}</p>
        </div>

        {/* Validity */}
        <div data-aos="zoom-in" className="bg-white dark:bg-[#1b1b2b] p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3 text-[#4657F0]">Validity</h2>
          <p>
            <strong>From:</strong>{" "}
            {new Date(pkg.validFrom).toLocaleDateString("en-GB")}
          </p>
          <p>
            <strong>Till:</strong>{" "}
            {new Date(pkg.validTill).toLocaleDateString("en-GB")}
          </p>
        </div>

        {/* Itinerary */}
        <div data-aos="zoom-in" className="bg-white dark:bg-[#1b1b2b] p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-3 text-[#4657F0]">Itinerary</h2>
          <ul className="space-y-3">
            {pkg.itinerary?.map((day, index) => (
              <li
                key={index}
                className="border-l-4 border-[#4657F0] pl-3 text-gray-700 dark:text-gray-300"
              >
                <strong>Day {day.day}:</strong> {day.activities}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div data-aos="zoom-in" className="space-x-6">
          <CustomButton label="Book Now" onClick={() => alert("Booking feature coming soon!")} />
          <CustomButton label="Back" to="/packages" />
        </div>
      </div>
    </div>
    </div>
  );
}