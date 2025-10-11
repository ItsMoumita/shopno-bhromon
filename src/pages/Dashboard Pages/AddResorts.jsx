import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AddResorts = () => {
  const axiosSecure = useAxiosSecure();

  const [form, setForm] = useState({
    name: "",
    location: "",
    coverImage: "",
    gallery: [""],
    pricePerNight: "",
    totalRooms: "",
    checkIn: "",
    checkOut: "",
    rating: "",
    availability: true,
    amenities: [],
    cancellation: "",
    childrenPolicy: "",
    pets: "",
  });

  const [roomTypes, setRoomTypes] = useState([{ type: "", price: "", capacity: "" }]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Room types (dynamic fields)
  const handleRoomChange = (index, field, value) => {
    const updatedRooms = [...roomTypes];
    updatedRooms[index][field] = value;
    setRoomTypes(updatedRooms);
  };

  const addRoomType = () => {
    setRoomTypes([...roomTypes, { type: "", price: "", capacity: "" }]);
  };

  // Submit Resort
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResort = {
      ...form,
      pricePerNight: Number(form.pricePerNight),
      totalRooms: Number(form.totalRooms),
      rating: Number(form.rating),
      availability: form.availability,
      roomTypes: roomTypes.map((r) => ({
        type: r.type,
        price: Number(r.price),
        capacity: Number(r.capacity),
      })),
      policies: {
        cancellation: form.cancellation,
        children: form.childrenPolicy,
        pets: form.pets,
      },
      createdBy: "Admin User", // Replace with logged-in Admin info
      createdAt: new Date(),
    };

    try {
      await axiosSecure.post("/api/resorts", newResort);
      Swal.fire("✅ Success!", "Resort added successfully", "success");
      setForm({
        name: "",
        location: "",
        coverImage: "",
        gallery: [""],
        pricePerNight: "",
        totalRooms: "",
        checkIn: "",
        checkOut: "",
        rating: "",
        availability: true,
        amenities: [],
        cancellation: "",
        childrenPolicy: "",
        pets: "",
      });
      setRoomTypes([{ type: "", price: "", capacity: "" }]);
    } catch (err) {
      Swal.fire("❌ Failed!", "Error adding resort", "error");
    }
  };

  return (
    <div data-aos="zoom-in" className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white/80 shadow-xl backdrop-blur-sm dark:border-white/10 dark:bg-[#15162a]">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-6 text-white sm:px-8">
          <h2 className="text-2xl font-bold">Add New Resort</h2>
          <p className="mt-1 text-white/80">List a resort with rooms, amenities, and policies.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 p-6 sm:p-8">
          {/* Name & Location */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Resort Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Resort Name"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Location"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                required
              />
            </div>
          </section>

          {/* Media */}
          <section className="grid grid-cols-1 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Cover Image URL</label>
              <input
                name="coverImage"
                value={form.coverImage}
                onChange={handleChange}
                placeholder="https://..."
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                Gallery Image URLs (comma separated)
              </label>
              <textarea
                name="gallery"
                value={form.gallery}
                onChange={(e) => setForm({ ...form, gallery: e.target.value.split(",") })}
                placeholder="https://img1.jpg, https://img2.jpg"
                className="block w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
              ></textarea>
            </div>
          </section>

          {/* Pricing, Rooms, Rating */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Price per Night</label>
              <input
                type="number"
                name="pricePerNight"
                value={form.pricePerNight}
                onChange={handleChange}
                placeholder="Price per Night"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Total Rooms</label>
              <input
                type="number"
                name="totalRooms"
                value={form.totalRooms}
                onChange={handleChange}
                placeholder="Total Rooms"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Rating (0-5)</label>
              <input
                type="number"
                step="0.1"
                name="rating"
                value={form.rating}
                onChange={handleChange}
                placeholder="Rating (0-5)"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
              />
            </div>
          </section>

          {/* Check in/out */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Check-in Time</label>
              <input
                name="checkIn"
                value={form.checkIn}
                onChange={handleChange}
                placeholder="Check-in Time"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Check-out Time</label>
              <input
                name="checkOut"
                value={form.checkOut}
                onChange={handleChange}
                placeholder="Check-out Time"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
              />
            </div>
          </section>

          {/* Amenities */}
          <section>
            <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
              Amenities (comma separated)
            </label>
            <textarea
              name="amenities"
              value={form.amenities}
              onChange={(e) => setForm({ ...form, amenities: e.target.value.split(",") })}
              placeholder="Pool, Gym, Spa"
              className="block w-full resize-y rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
            ></textarea>
          </section>


          {/* Room Types */}
          <section>
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">Room Types</h3>
              <button
                type="button"
                onClick={addRoomType}
                className="rounded-lg border border-indigo-200 bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-100 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 dark:border-indigo-500/30 dark:bg-indigo-500/10 dark:text-indigo-200"
              >
                + Add Room
              </button>
            </div>

            <div className="space-y-3">
              {roomTypes.map((room, i) => (
                <div
                  key={i}
                  className="rounded-2xl border border-gray-200 bg-white/60 p-4 shadow-sm dark:border-white/10 dark:bg-white/5"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600 text-sm font-semibold text-white">
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Room</span>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    {/* Type */}
                    <div className="relative">
                      <label className="sr-only">Type</label>
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400 dark:text-gray-500">
                        🛏️
                      </span>
                      <input
                        value={room.type}
                        onChange={(e) => handleRoomChange(i, "type", e.target.value)}
                        placeholder="Type (e.g., Deluxe, Suite)"
                        className="w-full rounded-full border border-gray-300 bg-white px-3 py-2 pl-10 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                      />
                    </div>

                    {/* Price */}
                    <div className="relative">
                      <label className="sr-only">Price</label>
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400 dark:text-gray-500">
                        ৳
                      </span>
                      <input
                        type="number"
                        value={room.price}
                        onChange={(e) => handleRoomChange(i, "price", e.target.value)}
                        placeholder="Price"
                        className="w-full rounded-full border border-gray-300 bg-white px-3 py-2 pl-9 pr-16 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-gray-400 dark:text-gray-500">
                        / night
                      </span>
                    </div>

                    {/* Capacity */}
                    <div className="relative">
                      <label className="sr-only">Capacity</label>
                      <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400 dark:text-gray-500">
                        👥
                      </span>
                      <input
                        type="number"
                        value={room.capacity}
                        onChange={(e) => handleRoomChange(i, "capacity", e.target.value)}
                        placeholder="Capacity"
                        className="w-full rounded-full border border-gray-300 bg-white px-3 py-2 pl-10 pr-14 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-xs text-gray-400 dark:text-gray-500">
                        guests
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Policies */}
          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Cancellation Policy</label>
              <input
                name="cancellation"
                value={form.cancellation}
                onChange={handleChange}
                placeholder="Cancellation Policy"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Children Policy</label>
              <input
                name="childrenPolicy"
                value={form.childrenPolicy}
                onChange={handleChange}
                placeholder="Children Policy"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">Pets Policy</label>
              <input
                name="pets"
                value={form.pets}
                onChange={handleChange}
                placeholder="Pets Policy"
                className="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-black/20 dark:text-white"
              />
            </div>
          </section>

          {/* Availability */}
          <section>
            <div className="flex items-center gap-3">
              <input
                id="available"
                type="checkbox"
                checked={form.availability}
                onChange={(e) => setForm({ ...form, availability: e.target.checked })}
                className="h-5 w-5 rounded accent-indigo-600"
              />
              <label htmlFor="available" className="font-medium text-gray-700 dark:text-gray-200">
                Available
              </label>
            </div>
          </section>

          {/* Submit - unchanged design */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2 bg-[#4657F0] text-white rounded hover:bg-[#2f3fd9]"
            >
              Add Resort
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddResorts;