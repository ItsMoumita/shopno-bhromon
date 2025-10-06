
import { useEffect, useState, useRef, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const ManageResorts = () => {
  const axiosSecure = useAxiosSecure();
  const [resorts, setResorts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/api/resorts");
        setResorts(res.data);
      } catch (err) {
        console.error("Error fetching resorts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResorts();
  }, [axiosSecure]);

  useOutsideClick(ref, () => {
    setActive(null);
    setEditMode(false);
  });

  const openDetails = (resort) => {
    // Prepare amenities as comma separated string for input
    const amenitiesStr = Array.isArray(resort.amenities) ? resort.amenities.join(", ") : "";
    // Prepare policies object safely
    const policies = resort.policies || {};
    setFormData({
      ...resort,
      amenities: amenitiesStr,
      policies: {
        cancellation: policies.cancellation || "",
        children: policies.children || "",
        pets: policies.pets || "",
      },
    });
    setActive(resort);
    setEditMode(false);
  };

  const handleSave = async () => {
    try {
      const { _id, amenities, policies, ...rest } = formData;
      // Convert amenities string back to array
      const amenitiesArr = amenities.split(",").map((a) => a.trim()).filter(Boolean);
      // Prepare policies object
      const policiesObj = {
        cancellation: policies.cancellation,
        children: policies.children,
        pets: policies.pets,
      };
      const updates = {
        ...rest,
        amenities: amenitiesArr,
        policies: policiesObj,
      };

      await axiosSecure.put(`/api/resorts/${_id}`, updates);
      Swal.fire("✅ Updated!", "Resort updated successfully", "success");
      setResorts((prev) =>
        prev.map((r) => (r._id === _id ? { ...formData, amenities: amenitiesArr, policies: policiesObj } : r))
      );
      setEditMode(false);
    } catch (err) {
      Swal.fire("❌ Failed", "Could not update resort", "error");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete Resort?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/api/resorts/${id}`);
          setResorts((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Deleted!", "Resort has been removed.", "success");
        } catch (err) {
          Swal.fire("❌ Failed", "Could not delete resort", "error");
        }
      }
    });
  };

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-[#12121c] text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Resorts</h2>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded">
              <Skeleton height={50} width={50} />
              <Skeleton height={20} width="40%" />
              <Skeleton height={20} width="20%" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Expanded Modal for Edit/View */}
          <AnimatePresence>
            {active && (
              <>
                <motion.div
                  className="fixed inset-0 bg-black/50 z-40"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <div className="fixed inset-0 z-50 grid place-items-center p-4">
                  <button
                    className="absolute top-5 right-5 p-2 h-10 w-10 bg-white dark:bg-neutral-800 rounded-full shadow"
                    onClick={() => {
                      setActive(null);
                      setEditMode(false);
                    }}
                  >
                    ✕
                  </button>

                  <motion.div
                    ref={ref}
                    className="max-w-lg w-full bg-white dark:bg-neutral-900 rounded-lg shadow-lg overflow-auto max-h-[90vh]"
                  >
                    <motion.img
                      src={formData.coverImage}
                      alt={formData.name}
                      className="h-56 w-full object-cover"
                    />
                    <div className="p-6 space-y-3">
                      {editMode ? (
                        <>
                          <div>
                            <label className="block font-semibold mb-1">Resort Name</label>
                            <input
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full p-2 border rounded text-black"
                              placeholder="Resort Name"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Location</label>
                            <input
                              value={formData.location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                              className="w-full p-2 border rounded text-black"
                              placeholder="Location"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Cover Image URL</label>
                            <input
                              value={formData.coverImage}
                              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                              className="w-full p-2 border rounded text-black"
                              placeholder="Cover Image URL"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Description</label>
                            <textarea
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full p-2 border rounded text-black"
                              placeholder="Description"
                              rows={4}
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Price per Night (BDT)</label>
                            <input
                              type="number"
                              value={formData.pricePerNight}
                              onChange={(e) => setFormData({ ...formData, pricePerNight: e.target.value })}
                              className="w-full p-2 border rounded text-black"
                              placeholder="Price per Night"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Total Rooms</label>
                            <input
                              type="number"
                              value={formData.totalRooms}
                              onChange={(e) => setFormData({ ...formData, totalRooms: e.target.value })}
                              className="w-full p-2 border rounded text-black"
                              placeholder="Total Rooms"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Check-in Time</label>
                            <input
                              value={formData.checkIn}
                              onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                              className="w-full p-2 border rounded text-black"
                              placeholder="Check-in Time"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Check-out Time</label>
                            <input
                              value={formData.checkOut}
                              onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                              className="w-full p-2 border rounded text-black"
                              placeholder="Check-out Time"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Rating</label>
                            <input
                              type="number"
                              step="0.1"
                              value={formData.rating}
                              onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                              className="w-full p-2 border rounded text-black"
                              placeholder="Rating"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Amenities (comma separated)</label>
                            <textarea
                              value={formData.amenities}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  amenities: e.target.value,
                                })
                              }
                              className="w-full p-2 border rounded text-black"
                              placeholder="Amenities (comma separated)"
                              rows={2}
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Cancellation Policy</label>
                            <input
                              value={formData.policies?.cancellation || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  policies: {
                                    ...formData.policies,
                                    cancellation: e.target.value,
                                  },
                                })
                              }
                              className="w-full p-2 border rounded text-black"
                              placeholder="Cancellation Policy"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Children Policy</label>
                            <input
                              value={formData.policies?.children || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  policies: {
                                    ...formData.policies,
                                    children: e.target.value,
                                  },
                                })
                              }
                              className="w-full p-2 border rounded text-black"
                              placeholder="Children Policy"
                            />
                          </div>

                          <div>
                            <label className="block font-semibold mb-1">Pets Policy</label>
                            <input
                              value={formData.policies?.pets || ""}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  policies: {
                                    ...formData.policies,
                                    pets: e.target.value,
                                  },
                                })
                              }
                              className="w-full p-2 border rounded text-black"
                              placeholder="Pets Policy"
                            />
                          </div>

                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={formData.availability}
                              onChange={(e) => setFormData({ ...formData, availability: e.target.checked })}
                            />
                            Available
                          </label>

                          <p className="text-xs mt-3">Created by: {formData.createdBy}</p>
                          <p className="text-xs">Created at: {new Date(formData.createdAt).toLocaleString()}</p>

                          <button
                            onClick={handleSave}
                            className="w-full bg-green-600 text-white py-2 rounded mt-4"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <h3 className="text-xl font-bold">{formData.name}</h3>
                          <p className="text-sm">📍 {formData.location}</p>
                          <p className="text-[#4657F0] font-bold">
                            ৳{formData.pricePerNight?.toLocaleString()}/night
                          </p>
                          <p className="text-yellow-500">⭐ {formData.rating}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {formData.description}
                          </p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.amenities?.split(",").map((a, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                              >
                                {a.trim()}
                              </span>
                            ))}
                          </div>
                          <div className="mt-4">
                            <h4 className="font-semibold">Policies</h4>
                            <ul className="space-y-2 text-gray-700 dark:text-gray-300 border-l-4 border-[#4657F0] pl-3">
                              {formData.policies?.cancellation && (
                                <li>
                                  <strong>Cancellation:</strong> {formData.policies.cancellation}
                                </li>
                              )}
                              {formData.policies?.children && (
                                <li>
                                  <strong>Children:</strong> {formData.policies.children}
                                </li>
                              )}
                              {formData.policies?.pets && (
                                <li>
                                  <strong>Pets:</strong> {formData.policies.pets}
                                </li>
                              )}
                            </ul>
                          </div>
                          <button
                            onClick={() => setEditMode(true)}
                            className="w-full bg-[#4657F0] text-white py-2 rounded mt-4"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>

          {/* Resorts List */}
          <ul className="space-y-3">
            {resorts.map((resort) => (
              <li
                key={resort._id}
                className="flex justify-between items-center p-4 border border-[#4657F0]/20 rounded-lg bg-gray-50 dark:bg-neutral-900"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={resort.coverImage}
                    alt={resort.name}
                    className="h-14 w-14 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-bold">{resort.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {resort.location}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => openDetails(resort)}
                    className="px-4 py-1 text-sm rounded-full font-bold bg-gray-200 hover:bg-[#4657F0] hover:text-white"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => handleDelete(resort._id)}
                    className="px-4 py-1 text-sm rounded-full font-bold bg-red-500 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ManageResorts;