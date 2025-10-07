
import { useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Link } from "react-router";
import { FaMapMarkerAlt, FaStar } from "react-icons/fa";
import FancyButton from "../components/ExtraComponents/FancyButton";

const categories = ["Beachfront", "Mountain", "Luxury", "Family"];
const sortOptions = [
  { value: "latest", label: "Newest" },
  { value: "priceLowHigh", label: "Price: Low → High" },
  { value: "priceHighLow", label: "Price: High → Low" },
];

const Resorts = () => {
  const axiosSecure = useAxiosSecure();
  const [resorts, setResorts] = useState([]);
  const [filteredResorts, setFilteredResorts] = useState([]);

  // Filters state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const res = await axiosSecure.get("/api/resorts");
        setResorts(res.data);
        setFilteredResorts(res.data);
      } catch (err) {
        console.error("Error fetching resorts:", err);
      }
    };
    fetchResorts();
  }, [axiosSecure]);

  useEffect(() => {
    let data = [...resorts];

    // Search filter
    if (search) {
      data = data.filter(
        (r) =>
          r.name.toLowerCase().includes(search.toLowerCase()) ||
          r.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory) {
      data = data.filter((r) => r.category === selectedCategory);
    }

    // Price filter
    if (minPrice) {
      data = data.filter((r) => r.pricePerNight >= Number(minPrice));
    }
    if (maxPrice) {
      data = data.filter((r) => r.pricePerNight <= Number(maxPrice));
    }

    // Sorting
    if (sortBy === "priceLowHigh") {
      data.sort((a, b) => a.pricePerNight - b.pricePerNight);
    } else if (sortBy === "priceHighLow") {
      data.sort((a, b) => b.pricePerNight - a.pricePerNight);
    } else if (sortBy === "latest") {
      data.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    setFilteredResorts(data);
  }, [search, selectedCategory, minPrice, maxPrice, sortBy, resorts]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#12121c] text-gray-900 dark:text-gray-100 p-6 ">
      <div className="max-w-7xl mx-auto px-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Explore Resorts</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters */}
        <aside data-aos="fade-right" className="md:w-64 bg-white dark:bg-[#1b1b2b] p-6 rounded-lg shadow-md flex-shrink-0 sticky top-25 h-fit">
          {/* Search */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Search</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or location"
              className="w-full p-2 border border-[#4657F0] rounded focus:outline-none focus:ring-2 focus:ring-[#4657F0] dark:bg-[#12121c] dark:text-white"
            />
          </div>

          {/* Category */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 border border-[#4657F0] rounded focus:outline-none focus:ring-2 focus:ring-[#4657F0] dark:bg-[#12121c] dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold">Price Range (BDT)</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 p-2 border border-[#4657F0] rounded focus:outline-none focus:ring-2 focus:ring-[#4657F0] dark:bg-[#12121c] dark:text-white"
              />
              <input
                type="number"
                min="0"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 p-2 border border-[#4657F0] rounded focus:outline-none focus:ring-2 focus:ring-[#4657F0] dark:bg-[#12121c] dark:text-white"
              />
            </div>
          </div>

          {/* Sort */}
         <div>
  <h4 className="font-semibold mb-2">↕ Sort By</h4>
  <div className="flex flex-wrap gap-2">
    {sortOptions.map((opt) => (
      <button
        key={opt.value}
        onClick={() => setSortBy(opt.value)}
        className={`px-4 py-1.5 rounded-full text-sm font-medium border border-[#4657F0] transition ${
          sortBy === opt.value
            ? "bg-[#4657F0] text-white"
            : "bg-gray-100 dark:bg-[#292b51] text-gray-700 dark:text-gray-300 hover:bg-[#4657F0]/10"
        }`}
      >
        {opt.label}
      </button>
    ))}
  </div>
</div>

        </aside>

        {/* Resorts Grid */}
        <section data-aos="fade-left" className="flex-1 grid grid-cols-1  lg:grid-cols-2 gap-6">
          {filteredResorts.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">
              No resorts found.
            </p>
          ) : (
            filteredResorts.map((resort) => (
              <div
                key={resort._id}
                className="bg-white dark:bg-[#1b1b2b] rounded-lg shadow-sm hover:shadow-[#2f3fd9]/80 overflow-hidden flex flex-col"
              >
                <img
                  src={resort.coverImage}
                  alt={resort.name}
                  className="h-48 w-full object-cover"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold">{resort.name}</h3>
                  <p className="flex items-center gap-1 text-gray-600 dark:text-gray-400 mt-1">
                    <FaMapMarkerAlt className="text-[#4657F0]" />
                    {resort.location}
                  </p>
                  <p className="text-[#4657F0] font-bold mt-3">
                    ৳{resort.pricePerNight.toLocaleString()} / night
                  </p>
                  <p className="flex items-center gap-1 text-yellow-400 font-semibold mt-1">
                    <FaStar />
                    {resort.rating}
                  </p>
                  <p
                    className={`mt-auto font-semibold mb-2 ml-2 ${
                      resort.availability ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {resort.availability ? "Available" : "Unavailable"}
                  </p>
                
                  <FancyButton label="View Details" to={`/resort/${resort._id}`}></FancyButton>
                </div>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
    </div>
  );
};

export default Resorts;