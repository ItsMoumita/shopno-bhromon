import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Tile = ({ label, value, delta, positive, subtitle }) => (
  <div className="bg-white dark:bg-[#1b1b2b] rounded-lg p-4 shadow flex flex-col">
    <div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>
    <div className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{value}</div>
    {typeof delta === "number" && (
      <div className={`text-sm mt-1 ${positive ? "text-green-500" : "text-red-500"}`}>
        {positive ? "▲" : "▼"} {Math.abs(delta)}%
      </div>
    )}
    {subtitle && <div className="text-xs text-gray-500 mt-2">{subtitle}</div>}
  </div>
);

export default function KPIRow() {
  const axiosSecure = useAxiosSecure();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);

  useEffect(() => {
    let mounted = true;
    const fetchOverview = async () => {
      setLoading(true);
      try {
        const res = await axiosSecure.get(`/api/admin/overview?days=${days}`);
        if (mounted) setOverview(res.data);
      } catch (err) {
        console.error("Failed to fetch overview:", err);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOverview();
    return () => (mounted = false);
  }, [axiosSecure, days]);

  const buttons = [
    { label: "7d", value: 7 },
    { label: "30d", value: 30 },
    { label: "90d", value: 90 },
  ];

  return (
    <div className="bg-gray-50 dark:bg-[#12121c] p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Overview</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">Quick snapshot of recent activity</p>
        </div>
        <div className="flex items-center gap-2">
          {buttons.map((b) => (
            <button
              key={b.value}
              onClick={() => setDays(b.value)}
              className={`px-3 py-1 rounded-full text-sm border ${days === b.value ? "bg-[#4657F0] text-white border-[#4657F0]" : "bg-white dark:bg-[#1b1b2b] text-gray-700 dark:text-gray-300 border-[#cbd5e1]"}`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {loading || !overview ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {[...Array(5)].map((_, i) => (
            <div key={i}><Skeleton height={80} /></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          <Tile
            label={`Bookings (${days}d)`}
            value={overview.totalBookings}
            delta={overview.bookingsChangePercent}
            positive={overview.bookingsChangePercent >= 0}
            subtitle={`${overview.pendingBookings || 0} pending`}
          />
          <Tile
            label="New Users"
            value={overview.newUsers}
            delta={overview.usersChangePercent}
            positive={overview.usersChangePercent >= 0}
            subtitle={`${overview.totalUsers} total`}
          />
          <Tile label="Packages" value={overview.packagesCount} />
          <Tile label="Resorts" value={overview.resortsCount} />
          <Tile label="Pending Bookings" value={overview.pendingBookings} />
        </div>
      )}
    </div>
  );
}