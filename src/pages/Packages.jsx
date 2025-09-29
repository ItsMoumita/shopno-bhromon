"use client";
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { FiSearch } from "react-icons/fi";

const categories = ["Adventure", "Family", "Luxury", "Honeymoon"];
const sortOptions = [
  { value: "latest", label: "Latest Added" },
  { value: "priceLowHigh", label: "Price: Low → High" },
  { value: "priceHighLow", label: "Price: High → Low" },
  { value: "duration", label: "Duration" },
];

const Packages = () => {
  const axiosSecure = useAxiosSecure();
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

  // --------- Filters ---------
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [minPrice, setMinPrice] = useState(1000);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [duration, setDuration] = useState("");

  // Reset filters
  const resetFilters = () => {
    setSearch("");
    setSelectedCategory("");
    setSortBy("latest");
    setMinPrice(1000);
    setMaxPrice(100000);
    setDuration("");
  };

  // Fetch all packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axiosSecure.get("/api/packages");
        setPackages(res.data);
        setFilteredPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };
    fetchPackages();
  }, [axiosSecure]);

  // Apply filters
  useEffect(() => {
    let data = [...packages];

    // Search
    if (search) {
      data = data.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(search.toLowerCase()) ||
          pkg.destination.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category
    if (selectedCategory) {
      data = data.filter((pkg) => pkg.category === selectedCategory);
    }

    // Price range
    data = data.filter((pkg) => pkg.price >= minPrice && pkg.price <= maxPrice);

    // Duration Filter
    if (duration) {
      if (duration === "4")
        data = data.filter((pkg) => pkg.duration >= 4);
      else data = data.filter((pkg) => pkg.duration === parseInt(duration));
    }

    // Sorting
    if (sortBy === "priceLowHigh") data.sort((a, b) => a.price - b.price);
    else if (sortBy === "priceHighLow") data.sort((a, b) => b.price - a.price);
    else if (sortBy === "duration") data.sort((a, b) => a.duration - b.duration);
    else if (sortBy === "latest")
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredPackages(data);
  }, [search, selectedCategory, sortBy, minPrice, maxPrice, duration, packages]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#12121c] text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">
          ✈️ Explore Our Tour Packages
        </h2>

        {/* Responsive layout */}
        <div className="grid md:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar Filters */}
          <div className="space-y-8 bg-white dark:bg-[#1b1b2b] p-6 rounded-lg shadow-md h-fit 
                md:sticky top-24">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-gray-800 dark:text-white">Filter</h3>
              <button
                onClick={resetFilters}
                className="px-3 py-1 text-sm bg-[#4657F0] text-white rounded font-semibold hover:bg-[#2f3fd9] transition"
              >
                RESET
              </button>
            </div>

            {/* Price Range */}
            <div>
              <h4 className="font-semibold mb-2">💰 Price Range</h4>
              <div className="flex justify-between text-sm font-semibold mb-2">
                <span>৳{minPrice.toLocaleString()}</span>
                <span>৳{maxPrice.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full accent-[#4657F0]"
              />
              <input
                type="range"
                min="1000"
                max="100000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#4657F0] mt-2"
              />
            </div>

            {/* Search */}
            <div>
              <h4 className="font-semibold mb-2">🔍 Package Search</h4>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Package"
                  className="w-full px-3 py-2 rounded-md border border-[#4657F0] focus:outline-none focus:ring-2 focus:ring-[#4657F0] dark:bg-[#12121c] dark:text-white"
                />
                <FiSearch className="absolute right-3 top-3 text-gray-500" />
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h4 className="font-semibold mb-3">🏷 Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() =>
                      setSelectedCategory(selectedCategory === cat ? "" : cat)
                    }
                    className={`px-4 py-1.5 rounded-full text-sm font-medium border border-[#4657F0] transition ${
                      selectedCategory === cat
                        ? "bg-[#4657F0] text-white"
                        : "bg-gray-100 dark:bg-[#292b51] text-gray-700 dark:text-gray-300 hover:bg-[#4657F0]/10"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div>
              <h4 className="font-semibold mb-2">🕒 Filter Durations</h4>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-[#4657F0] focus:outline-none focus:ring-2 focus:ring-[#4657F0] dark:bg-[#12121c] dark:text-white"
              >
                <option value="">Select Duration..</option>
                <option value="1">1 Day</option>
                <option value="2">2 Days</option>
                <option value="3">3 Days</option>
                <option value="4">4+ Days</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <h4 className="font-semibold mb-2">↕ Sort By</h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-[#4657F0] focus:outline-none focus:ring-2 focus:ring-[#4657F0] dark:bg-[#12121c] dark:text-white"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Packages Grid */}
          <div>
            {filteredPackages.length === 0 ? (
              <p className="text-center text-gray-500">No packages found</p>
            ) : (
              <div className="grid sm:grid-cols-1  lg:grid-cols-2 gap-6">
                {filteredPackages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className="flex flex-col rounded-lg bg-white dark:bg-[#1b1b2b] overflow-hidden shadow-md hover:shadow-xl transition"
                  >
                    <img
                      src={pkg.coverImage}
                      alt={pkg.title}
                      className="h-48 w-full object-cover"
                    />
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-lg font-bold">{pkg.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        📍 {pkg.destination}
                      </p>
                      <p className="text-[#4657F0] font-bold mt-3">
                        ৳{pkg.price.toLocaleString()} · {pkg.duration} days
                      </p>
                      <span className="text-xs px-3 py-1 mt-3 rounded-full border border-[#4657F0] text-[#4657F0] w-fit bg-[#4657F0]/10">
                        {pkg.category}
                      </span>
                      <div className="mt-auto pt-5">
                        <button className="w-full py-2 bg-[#4657F0] text-white rounded-md font-medium hover:bg-[#2f3fd9] transition">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packages;