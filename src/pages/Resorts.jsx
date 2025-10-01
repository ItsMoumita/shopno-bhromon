
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Resorts = () => {
  const axiosSecure = useAxiosSecure();
  const [resorts, setResorts] = useState([]);

  // Fetch all resorts
  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const res = await axiosSecure.get("/api/resorts");
        setResorts(res.data);
      } catch (err) {
        console.error("Error fetching resorts:", err);
      }
    };
    fetchResorts();
  }, [axiosSecure]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#12121c] text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold mb-8 text-center">
          🏨 Explore Our Resorts
        </h2>

        {resorts.length === 0 ? (
          <p className="text-center text-gray-500">No resorts available</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resorts.map((resort) => (
              <div
                key={resort._id}
                className="flex flex-col rounded-lg bg-white dark:bg-[#1b1b2b] overflow-hidden shadow-md hover:shadow-xl transition"
              >
                {/* Cover Image */}
                <img
                  src={resort.coverImage}
                  alt={resort.name}
                  className="h-48 w-full object-cover"
                />

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-lg font-bold">{resort.name}</h3>
                  <p className="flex items-center text-sm text-gray-600 dark:text-gray-400 gap-1">
                    <FaMapMarkerAlt /> {resort.location}
                  </p>
                  <p className="text-[#4657F0] font-bold mt-2">
                    ৳{resort.pricePerNight.toLocaleString()} / night
                  </p>

                  {/* Rating */}
                  <p className="flex items-center gap-1 text-yellow-500 font-medium mt-1">
                    <FaStar /> {resort.rating}
                  </p>

                  {/* Amenities Preview */}
                  <div className="flex flex-wrap gap-2 mt-3 text-xs">
                    {resort.amenities?.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-100"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="mt-auto pt-5">
                   <Link to={`/resort/${resort._id}`}>
                      <button className="w-full py-2 bg-[#4657F0] text-white rounded-md font-medium hover:bg-[#2f3fd9] transition">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resorts;