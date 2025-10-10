
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import CustomButton from "../ExtraComponents/CustomButton";

const PLACEHOLDER = "https://placehold.co/120x90/efefef/333333?text=No+Image";
const fmt = (n) => `৳${Number(n||0).toLocaleString()}`;

export default function RecentBookings({ limit = 10 }) {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [itemsMap, setItemsMap] = useState({});
  const [usersMap, setUsersMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetch = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/api/bookings?limit=${limit}`);
        const data = res.data;
        // if endpoint returns {bookings,...} handle both cases
        const list = Array.isArray(data) ? data : (data.bookings || []);
        if (!mounted) return;
        setBookings(list);

        // build unique itemId -> itemType and unique emails
        const itemMap = {};
        const emailSet = new Set();
        list.forEach((b) => {
          if (b.itemId && !itemMap[b.itemId]) itemMap[b.itemId] = b.itemType || "package";
          if (b.userEmail) emailSet.add(b.userEmail);
        });

        const entries = Object.entries(itemMap);
        const newItems = {};
        await Promise.all(entries.map(async ([itemId, itemType]) => {
          try {
            const endpoint = itemType === "package" ? `/api/packages/${itemId}` : `/api/resorts/${itemId}`;
            const r = await axiosSecure.get(endpoint);
            const it = r.data || {};
            newItems[itemId] = {
              image: it.coverImage || (it.gallery && it.gallery[0]) || PLACEHOLDER,
              title: it.title || it.name || "",
            };
          } catch (err) {
            newItems[itemId] = { image: PLACEHOLDER, title: "" };
          }
        }));

        const emails = Array.from(emailSet);
        const newUsers = {};
        await Promise.all(emails.map(async (email) => {
          try {
            const r = await axiosSecure.get(`/api/users/${encodeURIComponent(email)}`);
            const u = r.data || {};
            newUsers[email] = { name: u.name || u.displayName || u.email };
          } catch (err) {
            newUsers[email] = { name: email };
          }
        }));

        if (!mounted) return;
        setItemsMap(newItems);
        setUsersMap(newUsers);
      } catch (err) {
        console.error("Error fetching bookings admin:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetch();
    return () => { mounted = false; };
  }, [axiosSecure, limit]);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      title: "Delete booking?",
      text: "This will permanently remove it.",
      icon: "warning",
      showCancelButton: true,
    });
    if (!confirmed.isConfirmed) return;
    try {
      await axiosSecure.delete(`/api/bookings/${id}`);
      setBookings((prev) => prev.filter((b)=>b._id !== id));
      Swal.fire("Deleted", "Booking removed", "success");
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not delete", "error");
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await axiosSecure.put(`/api/bookings/${id}/status`, { status });
      setBookings((prev) => prev.map(b => b._id === id ? { ...b, status } : b));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Could not update status", "error");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_,i)=>(
          <div key={i} className="flex items-center gap-4 p-4 bg-white dark:bg-[#1b1b2b] rounded">
            <Skeleton width={96} height={72} />
            <div className="flex-1">
              <Skeleton height={18} width="40%" />
              <Skeleton height={14} width="30%" className="mt-2" />
            </div>
            <Skeleton width={140} height={36} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 py-6 space-y-8 md:space-y-16 px-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Recent Bookings</h1>

      {bookings.length === 0 ? <p>No bookings found</p> : (
        <ul className="space-y-4">
          {bookings.map(b => {
            const item = itemsMap[b.itemId] || {};
            const person = (b.userEmail && usersMap[b.userEmail]?.name) || b.userEmail || "Guest";
            return (
              <li key={b._id} className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 p-4 bg-white dark:bg-[#1b1b2b] rounded shadow">
                <div className="flex items-center gap-4">
                  <img src={item.image} alt={item.title} className="w-24 h-16 object-cover rounded" />
                  <div>
                    <div className="font-semibold">{item.title || b.itemTitle}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Booked by: {person}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Date: {b.startDate ? new Date(b.startDate).toLocaleDateString() : (b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "-")}</div>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">Amount</div>
                    <div className="font-semibold">{fmt(b.amount)}</div>
                  </div>

                 <div className=" space-x-4">
                  
                  <Link to={b.itemType === "package" ? `/package/${b.itemId}` : `/resort/${b.itemId}`} className="px-3 py-1 bg-gray-200 text-gray-900 rounded">View</Link>
                  <button onClick={()=>handleDelete(b._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                 </div>

                </div>
              </li>
            );
          })}
        </ul>
      )}

       <CustomButton label="View More" to="all-bookings" ></CustomButton>
    </div>
  );
}