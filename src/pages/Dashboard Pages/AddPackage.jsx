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
      await axiosSecure.post("/packages", newPackage);

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
    <div data-aos="zoom-in" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-[#15162a]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-6 text-white sm:px-8">
          <h2 className="text-2xl font-bold">Add New Package</h2>
          <p className="mt-1 text-white/80">Create and publish a tour package with details and itinerary.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-8">
          {/* Basic Info */}
          <section className="grid gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Title</label>
              <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
              <textarea
                placeholder="Description"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="block w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-gray-400"
                required
              ></textarea>
            </div>
          </section>

          {/* Details */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Destination</label>
              <input
                type="text"
                placeholder="Destination"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Duration (days)</label>
              <input
                type="number"
                placeholder="Duration (days)"
                min="1"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Price (BDT)</label>
              <input
                type="number"
                placeholder="Price (BDT)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-gray-400"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
              >
                <option>Adventure</option>
                <option>Luxury</option>
                <option>Family</option>
                <option>Honeymoon</option>
              </select>
            </div>
          </section>

          {/* Media */}
          <section>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Cover Image URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-gray-400"
              required
            />
          </section>

          {/* Validity Dates */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Valid From</label>
              <input
                type="date"
                value={validFrom}
                onChange={(e) => setValidFrom(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Valid Till</label>
              <input
                type="date"
                value={validTill}
                onChange={(e) => setValidTill(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                required
              />
            </div>
          </section>

          {/* Availability */}
          <section>
            <div className="flex items-center gap-3">
              <input
                id="available"
                type="checkbox"
                checked={availability}
                onChange={(e) => setAvailability(e.target.checked)}
                className="h-5 w-5 rounded accent-indigo-600"
              />
              <label htmlFor="available" className="font-medium text-gray-700 dark:text-gray-200">
                Available
              </label>
            </div>
          </section>

          {/* Itinerary */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Itinerary</label>
              <button
                type="button"
                onClick={addItineraryDay}
                className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200"
              >
                + Add Day
              </button>
            </div>

            <div className="space-y-3">
              {itinerary.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/60 p-3 shadow-sm sm:flex-row sm:items-center dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex items-center gap-2 sm:w-40">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                      {index + 1}
                    </span>
                    <div className="w-full">
                      <label className="sr-only">Day</label>
                      <input
                        type="number"
                        min="1"
                        value={item.day}
                        onChange={(e) => updateItinerary(index, "day", e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="sr-only">Activities</label>
                    <input
                      type="text"
                      placeholder="Activities"
                      value={item.activities}
                      onChange={(e) => updateItinerary(index, "activities", e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white dark:placeholder:text-gray-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-xl bg-indigo-600 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-indigo-600/30 transition hover:bg-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 active:bg-indigo-700"
            >
              Add Package
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPackage;