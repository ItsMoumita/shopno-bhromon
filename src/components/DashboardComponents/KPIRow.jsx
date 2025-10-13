"use client";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaCalendarCheck, FaUsers, FaHotel } from "react-icons/fa";
import { TbPackage } from "react-icons/tb";
import { AiOutlineArrowUp, AiOutlineArrowDown } from "react-icons/ai";
import { FiRefreshCw } from "react-icons/fi";
import useAxiosSecure from "../../hooks/useAxiosSecure";

/* Count-up hook */
function useCountUp(end = 0, duration = 900) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
  const startRef = useRef(0);
  const fromRef = useRef(0);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    startRef.current = performance.now();
    fromRef.current = display;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
    const step = (now) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = fromRef.current + (end - fromRef.current) * eased;
      setDisplay(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(step);
      else rafRef.current = null;
    };
    rafRef.current = requestAnimationFrame(step);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration]);

  return display;
}

/* Format number */
const fmtNum = (n) => {
  if (n === null || typeof n === "undefined") return "0";
  const rounded = Math.round(n);
  return rounded.toLocaleString();
};

/* Tile component (responsive, no overflow) */
const Tile = ({ icon, label, endValue, delta }) => {
  const display = useCountUp(Number(endValue) || 0, 900);
  const positive = typeof delta === "number" ? delta >= 0 : null;

  return (
    <div className="relative bg-white dark:bg-[#111217] border border-gray-100 dark:border-gray-800 rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center gap-4 min-w-0">
      {/* icon */}
      <div
        className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center text-white"
        style={{ background: "linear-gradient(135deg,#4657F0,#2f3fd9)" }}
      >
        {icon}
      </div>

      {/* content */}
      <div className="flex-1 min-w-0">
        <div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>
        <div className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white mt-1 truncate">
          {fmtNum(display)}
        </div>
      </div>

      {/* delta badge - positioned inside tile so no overflow */}
      {typeof delta === "number" && (
        <div
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            positive ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
          }`}
        >
          {positive ? <AiOutlineArrowUp /> : <AiOutlineArrowDown />} {Math.abs(delta)}%
        </div>
      )}
    </div>
  );
};

/* KPIRow component */
export default function KPIRow() {
  const axiosSecure = useAxiosSecure();
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchOverview = async (d = days) => {
    setLoading(true);
    try {
      const res = await axiosSecure.get(`/admin/overview?days=${d}`);
      setOverview(res.data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Failed to fetch overview:", err);
      setOverview(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview(days);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const btns = [
    { label: "7d", value: 7 },
    { label: "30d", value: 30 },
    { label: "90d", value: 90 },
  ];

  return (
    <section className="bg-gray-50 dark:bg-[#12121c] p-4 md:p-6 rounded-lg overflow-hidden box-border">
      <div className="grid grid-col-1 md:grid-col-2 lg:grid-col-3 items-start md:items-center justify-between gap-4 mb-4">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Overview</h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">Key metrics at a glance</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex gap-2">
            {btns.map((b) => (
              <button
                key={b.value}
                onClick={() => setDays(b.value)}
                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  days === b.value
                    ? "bg-[#4657F0] text-white border-[#4657F0]"
                    : "bg-white dark:bg-[#1b1b2b] text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => fetchOverview(days)}
            className="p-2 ml-2 rounded-md bg-white dark:bg-[#1b1b2b] border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
            title="Refresh KPIs"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="p-4 bg-white dark:bg-[#1b1b2b] rounded-xl shadow">
              <Skeleton height={18} width="40%" className="mb-2" />
              <Skeleton height={34} width="70%" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Tile
            icon={<FaCalendarCheck size={18} />}
            label={`Bookings (${days}d)`}
            endValue={overview?.totalBookings ?? 0}
            delta={overview?.bookingsChangePercent ?? 0}
          />
          <Tile
            icon={<FaUsers size={18} />}
            label={`New Users (${days}d)`}
            endValue={overview?.newUsers ?? 0}
            delta={overview?.usersChangePercent ?? 0}
          />
          <Tile
            icon={<TbPackage size={18} />}
            label="Packages"
            endValue={overview?.packagesCount ?? 0}
          />
          <Tile
            icon={<FaHotel size={18} />}
            label="Resorts"
            endValue={overview?.resortsCount ?? 0}
          />
        </div>
      )}

      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 flex flex-col md:flex-row justify-between gap-2">
        <div>{lastUpdated ? `Last updated: ${lastUpdated.toLocaleString()}` : "—"}</div>
        <div className="text-sm text-gray-600 dark:text-gray-300">Data refresh every 60s</div>
      </div>
    </section>
  );
}