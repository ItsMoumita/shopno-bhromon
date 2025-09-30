import { useState, useContext } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";

const AddPackage = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Adventure");
  const [coverImage, setCoverImage] = useState("");
  const [validFrom, setValidFrom] = useState("");
  const [validTill, setValidTill] = useState("");
  const [availability, setAvailability] = useState(true);
  const [itinerary, setItinerary] = useState([{ day: 1, activities: "" }]);

  // Add itinerary item
  const addItineraryDay = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, activities: "" }]);
  };

  const updateItinerary = (index, field, value) => {
    const newItinerary = [...itinerary];
    newItinerary[index][field] = value;
    setItinerary(newItinerary);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

   const newPackage = {
  title,
  description,
  destination,
  duration: parseInt(duration),
  price: parseFloat(price),
  category,
  coverImage,
  validFrom,
  validTill,
  itinerary,
  availability,
  createdBy: user?.displayName || user?.email, // better than uid
  createdAt: new Date(),
  updatedAt: new Date(),
};
    try {
      await axiosSecure.post("/api/packages", newPackage);

      Swal.fire({
        icon: "success",
        title: "✅ Package Added",
        text: "Your new tour package has been created!",
        timer: 2000,
        showConfirmButton: false,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setDestination("");
      setDuration("");
      setPrice("");
      setCategory("Adventure");
      setCoverImage("");
      setValidFrom("");
      setValidTill("");
      setAvailability(true);
      setItinerary([{ day: 1, activities: "" }]);
    } catch (err) {
      console.error("Error adding package:", err);
      Swal.fire({
        icon: "error",
        title: "❌ Failed",
        text: err.response?.data?.error || "Something went wrong!",
      });
    }
  };

  return (
    <div data-aos="zoom-in" className="p-6 max-w-3xl mx-auto bg-white dark:bg-[#1b1b2b] shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 text-center">
        Add New Package
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded dark:bg-black dark:text-white"
          required
        />
        <textarea
          placeholder="Description"
          rows="3"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded dark:bg-black dark:text-white"
          required
        ></textarea>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border rounded dark:bg-black dark:text-white"
            required
          />
          <input
            type="number"
            placeholder="Duration (days)"
            min="1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-2 border rounded dark:bg-black dark:text-white"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price (BDT)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded dark:bg-black dark:text-white"
            required
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded dark:bg-black dark:text-white"
          >
            <option>Adventure</option>
            <option>Luxury</option>
            <option>Family</option>
            <option>Honeymoon</option>
          </select>
        </div>

        <input
          type="url"
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="w-full p-2 border rounded dark:bg-black dark:text-white"
          required
        />

        {/* Validity Dates */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            value={validFrom}
            onChange={(e) => setValidFrom(e.target.value)}
            className="w-full p-2 border rounded dark:bg-black dark:text-white"
            required
          />
          <input
            type="date"
            value={validTill}
            onChange={(e) => setValidTill(e.target.value)}
            className="w-full p-2 border rounded dark:bg-black dark:text-white"
            required
          />
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2">
          <label className="font-medium">Available:</label>
          <input
            type="checkbox"
            checked={availability}
            onChange={(e) => setAvailability(e.target.checked)}
          />
        </div>

        {/* Itinerary Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium">Itinerary</label>
          {itinerary.map((item, index) => (
            <div key={index} className="flex gap-3">
              <input
                type="number"
                min="1"
                value={item.day}
                onChange={(e) => updateItinerary(index, "day", e.target.value)}
                className="w-20 p-2 border rounded dark:bg-black dark:text-white"
              />
              <input
                type="text"
                placeholder="Activities"
                value={item.activities}
                onChange={(e) =>
                  updateItinerary(index, "activities", e.target.value)
                }
                className="flex-1 p-2 border rounded dark:bg-black dark:text-white"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addItineraryDay}
            className="px-3 py-1 mt-2 text-sm bg-gray-200 dark:bg-[#292b51] rounded"
          >
            + Add Day
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-[#4657F0] text-white rounded hover:bg-[#2f3fd9] transition"
        >
          Add Package
        </button>
      </form>
    </div>
  );
};

export default AddPackage;