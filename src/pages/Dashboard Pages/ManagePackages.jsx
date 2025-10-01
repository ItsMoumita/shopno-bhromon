"use client";
import { useEffect, useState, useRef, useId } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function useOutsideClick(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    return () => document.removeEventListener("mousedown", listener);
  }, [ref, handler]);
}

const ManagePackages = () => {
  const axiosSecure = useAxiosSecure();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState(null);
  const [formData, setFormData] = useState({});
  const [editMode, setEditMode] = useState(false);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    const fetchPkgs = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/api/packages");
        setPackages(res.data);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPkgs();
  }, [axiosSecure]);

  useOutsideClick(ref, () => {
    setActive(null);
    setEditMode(false);
  });

  const openDetails = (pkg) => {
    setFormData(pkg);
    setActive(pkg);
    setEditMode(false); // Always open in view mode
  };

  const handleSave = async () => {
    try {
      const { _id, ...updates } = formData;
      await axiosSecure.put(`/api/packages/${_id}`, updates);
      Swal.fire("✅ Updated!", "Package updated successfully", "success");
      setPackages((prev) =>
        prev.map((p) => (p._id === formData._id ? formData : p))
      );
      setEditMode(false);
    } catch (err) {
      Swal.fire("❌ Failed", "Could not update package", "error");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This package will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/api/packages/${id}`);
          setPackages((prev) => prev.filter((p) => p._id !== id));
          Swal.fire("Deleted!", "Package has been deleted.", "success");
        } catch (err) {
          Swal.fire("❌ Failed", "Could not delete package", "error");
          console.error(err);
        }
      }
    });
  };

  return (
    <div data-aos="zoom-in" className="p-6 min-h-screen rounded-lg bg-white dark:bg-[#12121c] text-gray-900 dark:text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">Manage Packages</h2>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 border rounded">
              <Skeleton height={50} width={50} />
              <Skeleton height={20} width="40%" />
              <Skeleton height={20} width="20%" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Expanded overlay */}
          <AnimatePresence>
            {active && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                />
                <div className="fixed inset-0 z-50 grid place-items-center p-4">
                  {/* Close Button (fixed top-right) */}
                  <button
                    className="absolute top-5 right-5 p-2 h-10 w-10 bg-white dark:bg-neutral-800 rounded-full shadow z-50"
                    onClick={() => {
                      setActive(null);
                      setEditMode(false);
                    }}
                  >
                    ✕
                  </button>

                  {/* Expanded Card */}
                  <motion.div
                    ref={ref}
                    layoutId={`card-${active._id}-${id}`}
                    className="w-full max-w-lg bg-white dark:bg-[#292b51] dark:text-white rounded-2xl shadow-lg overflow-hidden relative"
                  >
                    <motion.img
                      src={formData.coverImage}
                      alt={formData.title}
                      className="w-full h-60 object-cover"
                      layoutId={`img-${active._id}-${id}`}
                    />

                    <div className="p-4 space-y-2 dark:text-white">
                      {/* Title */}
                      {editMode ? (
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                          }
                          className="w-full p-2 border rounded text-black dark:text-white"
                        />
                      ) : (
                        <h3 className="text-xl font-bold">{formData.title}</h3>
                      )}

                      {/* Description */}
                      {editMode ? (
                        <textarea
                          value={formData.description}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              description: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded text-black dark:text-white"
                        />
                      ) : (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {formData.description}
                        </p>
                      )}

                      {/* Price */}
                      {editMode ? (
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) =>
                            setFormData({ ...formData, price: e.target.value })
                          }
                          className="w-full p-2 border rounded text-black dark:text-white"
                        />
                      ) : (
                        <p className="text-blue-600 font-semibold">
                          ৳{formData.price?.toLocaleString()} · {formData.duration} days
                        </p>
                      )}

                      {/* Destination */}
                      {editMode ? (
                        <input
                          type="text"
                          value={formData.destination}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              destination: e.target.value,
                            })
                          }
                          className="w-full p-2 border rounded text-black dark:text-white"
                        />
                      ) : (
                        <p className="text-xs">Destination: {formData.destination}</p>
                      )}

                      {/* Duration */}
                      {editMode && (
                        <input
                          type="number"
                          value={formData.duration}
                          onChange={(e) =>
                            setFormData({ ...formData, duration: e.target.value })
                          }
                          className="w-full p-2 border rounded text-black dark:text-white"
                        />
                      )}

                      {/* Valid Dates */}
                      {editMode ? (
                        <>
                          <input
                            type="date"
                            value={formData.validFrom?.split("T")[0]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                validFrom: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded text-black dark:text-white"
                          />
                          <input
                            type="date"
                            value={formData.validTill?.split("T")[0]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                validTill: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded text-black dark:text-white"
                          />
                        </>
                      ) : (
                        <p className="text-xs">
                          Valid:{" "}
                          {new Date(formData.validFrom).toLocaleDateString("en-GB")} -{" "}
                          {new Date(formData.validTill).toLocaleDateString("en-GB")}
                        </p>
                      )}

                      {/* Availability */}
                      {editMode ? (
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={formData.availability}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                availability: e.target.checked,
                              })
                            }
                          />
                          Available
                        </label>
                      ) : (
                        <p
                          className={`text-sm font-semibold ${formData.availability
                            ? "text-green-600"
                            : "text-red-500"
                            }`}
                        >
                          {formData.availability ? "Available" : "Unavailable"}
                        </p>
                      )}

                      {/* Created By (always read only) */}
                      <p className="text-xs mt-3">
                        Created by: {formData.createdBy}
                      </p>

                      {/* Toggle Edit/Save */}
                      {editMode ? (
                        <button
                          onClick={handleSave}
                          className="w-full mt-2 p-2 rounded bg-green-500 text-white"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => setEditMode(true)}
                          className="w-full mt-2 p-2 rounded bg-[#4657F0] text-white"
                        >
                          Edit
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </AnimatePresence>

          {/* List view (with Details + Delete buttons) */}
          <ul className="space-y-3">
            {packages.map((pkg) => (
              <motion.li
                key={pkg._id}
                className="flex justify-between items-center p-3 border border-[#4657F0]/20 rounded-lg bg-gray-50 dark:bg-[#12121c]"
              >
                <div className="max-w-2/3 flex items-center gap-3">
                  <motion.img
                    src={pkg.coverImage}
                    alt={pkg.title}
                    className="h-14 w-14 rounded object-cover"
                  />
                  <div>
                    <motion.h3 className="font-semibold">{pkg.title}</motion.h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {pkg.destination}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-2 ">
                  <motion.button
                    onClick={() => openDetails(pkg)}
                    className="px-4 py-1 text-sm rounded-full font-bold bg-gray-200 dark:bg-[#292b51] hover:bg-[#4657F0] hover:text-white"
                  >
                    Details
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(pkg._id)}
                    className="px-4 py-1 text-sm rounded-full font-bold bg-red-500 text-white hover:bg-red-700"
                  >
                    Delete
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default ManagePackages;