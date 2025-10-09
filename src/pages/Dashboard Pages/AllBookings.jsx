import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const PLACEHOLDER = "https://placehold.co/120x90/efefef/333333?text=No+Image";

function formatCurrency(num) {
  return `৳${Number(num || 0).toLocaleString()}`;
}
// function formatDate(iso) {
//   return iso ? new Date(iso).toLocaleString() : "-";
// }

export default function AdminBookings() {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [itemsMap, setItemsMap] = useState({}); // itemId -> { image, title, location }
  const [usersMap, setUsersMap] = useState({}); // email -> { name }
  const [loading, setLoading] = useState(true);

  // pagination
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch bookings (admin route)
        const res = await axiosSecure.get(`/api/bookings?page=${page}&limit=${limit}`);
        const data = res.data;
        const bookingList = Array.isArray(data) ? data : data.bookings || [];
        if (!mounted) return;
        setBookings(bookingList);
        setPages(data.pages || 1);

        // Build maps of unique itemIds -> itemType (from bookings)
        const itemTypeMap = {};
        const emailSet = new Set();
        bookingList.forEach((b) => {
          if (b.itemId) {
            // prefer booking.itemType if present
            itemTypeMap[b.itemId] = b.itemType || itemTypeMap[b.itemId] || "package";
          }
          if (b.userEmail) emailSet.add(b.userEmail);
        });

        // Fetch item details in parallel
        const itemEntries = Object.entries(itemTypeMap);
        const newItemsMap = {};
        await Promise.all(
          itemEntries.map(async ([itemId, itemType]) => {
            try {
              const endpoint = itemType === "package" ? `/api/packages/${itemId}` : `/api/resorts/${itemId}`;
              const r = await axiosSecure.get(endpoint);
              const it = r.data || {};
              newItemsMap[itemId] = {
                image: it.coverImage || (it.gallery && it.gallery[0]) || PLACEHOLDER,
                title: it.title || it.name || it.itemTitle || "",
                location: it.location || it.destination || "",
              };
            } catch (err) {
              // fallback to booking's itemTitle if present or placeholder
              newItemsMap[itemId] = { image: PLACEHOLDER, title: "", location: "" };
            }
          })
        );
        if (!mounted) return;
        setItemsMap((prev) => ({ ...prev, ...newItemsMap }));

        // Fetch user names for unique emails
        const emails = Array.from(emailSet);
        const newUsersMap = {};
        await Promise.all(
          emails.map(async (email) => {
            try {
              // encode email for URL safety
              const r = await axiosSecure.get(`/api/users/${encodeURIComponent(email)}`);
              const u = r.data || {};
              newUsersMap[email] = { name: u.name || u.displayName || u.email || email };
            } catch (err) {
              newUsersMap[email] = { name: email };
            }
          })
        );
        if (!mounted) return;
        setUsersMap((prev) => ({ ...prev, ...newUsersMap }));
      } catch (err) {
        console.error("Error fetching bookings (admin):", err);
        Swal.fire("Error", "Failed to load bookings", "error");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();
    return () => {
      mounted = false;
    };
  }, [axiosSecure, page]);

  const handleDelete = async (bookingId) => {
    const result = await Swal.fire({
      title: "Delete booking?",
      text: "This will permanently delete the booking.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) return;

    try {
      await axiosSecure.delete(`/api/bookings/${bookingId}`);
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      Swal.fire("Deleted", "Booking deleted successfully", "success");
    } catch (err) {
      console.error("Delete booking error:", err);
      Swal.fire("Error", "Could not delete booking", "error");
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-[#12121c] text-gray-900 dark:text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">All Bookings (Admin)</h1>

        {loading ? (
          <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-[#1b1b2b] rounded shadow">
                <Skeleton width={96} height={72} />
                <div className="flex-1">
                  <Skeleton height={18} width="40%" />
                  <Skeleton height={14} width="30%" className="mt-2" />
                </div>
                <div style={{ width: 180 }}>
                  <Skeleton height={36} />
                </div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="p-6 bg-white dark:bg-[#1b1b2b] rounded shadow">
            <p>No bookings found.</p>
          </div>
        ) : (
          <>
            <ul className="space-y-4">
              {bookings.map((b) => {
                const item = itemsMap[b.itemId] || {};
                const title = b.itemTitle || item.title || (b.itemType === "package" ? "Package" : "Resort");
                const image = item.image || PLACEHOLDER;
                const person = (b.userEmail && usersMap[b.userEmail] && usersMap[b.userEmail].name) || b.userEmail || "Guest";
                const amount = b.amount ?? 0;

                return (
                  <li key={b._id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white dark:bg-[#1b1b2b] rounded shadow">
                    <div className="flex items-center gap-4">
                      <img src={image} alt={title} className="w-20 h-16 object-cover rounded" />
                      <div>
                        <div className="text-lg font-semibold">{title}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Booked by: {person}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                      <div className="text-right">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Amount</div>
                        <div className="font-semibold">{formatCurrency(amount)}</div>
                        <div className="text-xs text-gray-500 mt-1">{b.status}</div>
                      </div>

                      <Link
                        to={b.itemType === "package" ? `/package/${b.itemId}` : `/resort/${b.itemId}`}
                        className="px-3 py-1 bg-gray-200 dark:bg-[#292b51] rounded text-sm font-medium hover:bg-gray-300 dark:hover:bg-[#3a3a45]"
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleDelete(b._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded text-sm font-medium hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page <= 1}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-[#292b51] disabled:opacity-50"
              >
                Prev
              </button>

              <span className="px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
                Page {page} of {pages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(p + 1, pages))}
                disabled={page >= pages}
                className="px-3 py-1 rounded bg-gray-200 dark:bg-[#292b51] disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}