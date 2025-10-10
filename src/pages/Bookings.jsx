
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecure from "../hooks/useAxiosSecure";

const PLACEHOLDER = "https://placehold.co/120x90/efefef/333333?text=No+Image";

export default function Bookings() {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  // itemsMap: { [itemId]: { image, title, location } }
  const [itemsMap, setItemsMap] = useState({});

  useEffect(() => {
    let mounted = true;
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/api/bookings/user");
        if (!mounted) return;
        const data = res.data || [];
        setBookings(data);

        // Build unique item list to fetch
        const unique = {};
        data.forEach((b) => {
          if (b.itemId && !unique[b.itemId]) unique[b.itemId] = b.itemType;
        });

        const entries = Object.entries(unique);
        const map = {};

        // Fetch item details in parallel (packages or resorts)
        await Promise.all(
          entries.map(async ([itemId, itemType]) => {
            try {
              const endpoint =
                itemType === "package"
                  ? `/api/packages/${itemId}`
                  : `/api/resorts/${itemId}`;
              const r = await axiosSecure.get(endpoint);
              const item = r.data || {};
              map[itemId] = {
                image:
                  item.coverImage ||
                  (item.gallery && item.gallery[0]) ||
                  PLACEHOLDER,
                title: item.title || item.name || item.itemTitle || "",
                location: item.location || item.destination || "",
              };
            } catch (err) {
              // fallback to placeholder
              map[itemId] = { image: PLACEHOLDER, title: "", location: "" };
            }
          })
        );

        if (mounted) setItemsMap(map);
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchBookings();
    return () => {
      mounted = false;
    };
  }, [axiosSecure]);

  const handleDelete = async (bookingId) => {
    const confirmed = await Swal.fire({
      title: "Delete booking?",
      text: "This will cancel your booking permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!confirmed.isConfirmed) return;

    try {
      await axiosSecure.delete(`/api/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      Swal.fire("Deleted", "Booking has been cancelled.", "success");
    } catch (err) {
      console.error("Delete booking failed:", err);
      Swal.fire("Error", "Could not delete booking", "error");
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-8 text-center">My <span className="text-[#4657F0]">Bookings</span></h2>
        <div className="space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-[#1b1b2b] rounded shadow">
              <Skeleton height={72} width={96} />
              <div className="flex-1">
                <Skeleton height={18} width="40%" />
                <Skeleton height={14} width="30%" className="mt-2" />
                <Skeleton height={14} width="20%" className="mt-2" />
              </div>
              <Skeleton height={36} width={80} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-[#12121c] text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h2 data-aos="zoom-in" className="text-3xl font-bold mb-8 text-center">My <span className="text-[#4657F0]">Bookings</span></h2>

        {bookings.length === 0 ? (
          <div className="p-6 bg-white dark:bg-[#1b1b2b] rounded">
            <p className="text-gray-600 dark:text-gray-300">You have no bookings yet.</p>
            <div className="mt-4">
              <button
                onClick={() => navigate("/packages")}
                className="px-4 py-2 bg-[#4657F0] text-white rounded"
              >
                Browse Packages
              </button>
            </div>
          </div>
        ) : (
          <ul data-aos="zoom-in" className="space-y-4">
            {bookings.map((b) => {
              const item = itemsMap[b.itemId] || {};
              const title = b.itemTitle || item.title || (b.itemType === "package" ? "Package" : "Resort");
              const location = item.location || (b.itemType === "package" ? b.destination : "");
              const image = item.image || PLACEHOLDER;
              const amount = b.amount ?? 0;
              const date = b.startDate ? new Date(b.startDate).toLocaleDateString() : (b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "");

              return (
                <li
                  key={b._id}
                  className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 bg-white dark:bg-[#1b1b2b] rounded-lg shadow"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={image}
                      alt={title}
                      className="w-20 h-16 object-cover rounded"
                    />
                    <div className="min-w-0">
                      <div className="text-lg font-semibold truncate">{title}</div>
                      {location && <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{location}</div>}
                      <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                        {b.itemType === "resort" && b.nights ? `${b.nights} night(s) · ` : ""}
                        {b.guests ? `${b.guests} guest(s) · ` : ""}{date}
                      </div>
                    </div>
                  </div>

                  <div className="flex lg:items-center flex-col gap-3">
                    <div className="lg:text-right mr-2">
                      <div className="text-sm text-gray-500 dark:text-gray-400">Amount</div>
                      <div className="font-semibold">৳{Number(amount).toLocaleString()}</div>
                      {/* <div className="text-xs text-gray-500 mt-1">{b.status}</div> */}
                    </div>

                    <div className="space-x-4">
                      <Link
                      to={b.itemType === "package" ? `/package/${b.itemId}` : `/resort/${b.itemId}`}
                      className="px-3 py-1 bg-gray-200 dark:bg-[#292b51] rounded text-sm font-medium hover:bg-[#e5e7eb] dark:hover:bg-[#3a3a45]"
                    >
                      Details
                    </Link>

                    <button
                      onClick={() => handleDelete(b._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
                    >
                      Delete
                    </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}