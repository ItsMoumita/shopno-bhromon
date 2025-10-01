
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
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#1b1b2b] p-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-6">Add New Resort</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name & Location */}
        <input name="name" value={form.name} onChange={handleChange}
          placeholder="Resort Name" className="w-full p-2 border rounded" required />
        <input name="location" value={form.location} onChange={handleChange}
          placeholder="Location" className="w-full p-2 border rounded" required />

        {/* Images */}
        <input name="coverImage" value={form.coverImage} onChange={handleChange}
          placeholder="Cover Image URL" className="w-full p-2 border rounded" required />
        <textarea
          name="gallery"
          value={form.gallery}
          onChange={(e) => setForm({ ...form, gallery: e.target.value.split(",") })}
          placeholder="Gallery Image URLs (comma separated)"
          className="w-full p-2 border rounded"
        ></textarea>

        {/* Numbers */}
        <input type="number" name="pricePerNight" value={form.pricePerNight} onChange={handleChange}
          placeholder="Price per Night" className="w-full p-2 border rounded" required />
        <input type="number" name="totalRooms" value={form.totalRooms} onChange={handleChange}
          placeholder="Total Rooms" className="w-full p-2 border rounded" />

        {/* Check in/out */}
        <input name="checkIn" value={form.checkIn} onChange={handleChange}
          placeholder="Check-in Time" className="w-full p-2 border rounded" />
        <input name="checkOut" value={form.checkOut} onChange={handleChange}
          placeholder="Check-out Time" className="w-full p-2 border rounded" />

        {/* Rating */}
        <input type="number" name="rating" value={form.rating} onChange={handleChange}
          placeholder="Rating (0-5)" className="w-full p-2 border rounded" step="0.1" />

        {/* Amenities */}
        <textarea
          name="amenities"
          value={form.amenities}
          onChange={(e) => setForm({ ...form, amenities: e.target.value.split(",") })}
          placeholder="Amenities (comma separated)"
          className="w-full p-2 border rounded"
        ></textarea>

        {/* Room Types */}
        <div className="space-y-2">
          <h3 className="font-semibold">Room Types</h3>
          {roomTypes.map((room, i) => (
            <div key={i} className="grid grid-cols-3 gap-2">
              <input value={room.type} onChange={(e) => handleRoomChange(i, "type", e.target.value)}
                placeholder="Type" className="p-2 border rounded" />
              <input type="number" value={room.price} onChange={(e) => handleRoomChange(i, "price", e.target.value)}
                placeholder="Price" className="p-2 border rounded" />
              <input type="number" value={room.capacity} onChange={(e) => handleRoomChange(i, "capacity", e.target.value)}
                placeholder="Capacity" className="p-2 border rounded" />
            </div>
          ))}
          <button type="button" onClick={addRoomType}
            className="px-4 py-1 text-sm bg-gray-200 rounded">+ Add Room</button>
        </div>

        {/* Policies */}
        <input name="cancellation" value={form.cancellation} onChange={handleChange}
          placeholder="Cancellation Policy" className="w-full p-2 border rounded" />
        <input name="childrenPolicy" value={form.childrenPolicy} onChange={handleChange}
          placeholder="Children Policy" className="w-full p-2 border rounded" />
        <input name="pets" value={form.pets} onChange={handleChange}
          placeholder="Pets Policy" className="w-full p-2 border rounded" />

        {/* Availability */}
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={form.availability}
            onChange={(e) => setForm({ ...form, availability: e.target.checked })} />
          Available
        </label>

        <button type="submit"
          className="w-full py-2 bg-[#4657F0] text-white rounded hover:bg-[#2f3fd9]">
          Add Resort
        </button>
      </form>
    </div>
  );
};

export default AddResorts;