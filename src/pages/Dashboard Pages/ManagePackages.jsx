import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ManagePackages = () => {
  const axiosSecure = useAxiosSecure();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch packages
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get("/api/packages");
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [axiosSecure]);

  return (
    <div className="p-6 bg-white dark:bg-[#1b1b2b] rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
        Manage Packages
      </h2>

      {/* Skeleton Loader */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, idx) => (
            <div key={idx} className="p-4 border rounded-md">
              <Skeleton height={20} width="60%" />
              <Skeleton height={15} width="80%" className="mt-2" />
              <Skeleton height={15} width="40%" className="mt-2" />
            </div>
          ))}
        </div>
      ) : packages.length === 0 ? (
        <p className="text-center text-gray-500">No packages found</p>
      ) : (
        <>
          {/* ✅ Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="min-w-full border border-gray-200 dark:border-gray-700 shadow-sm rounded-lg overflow-hidden">
              <thead className="bg-gray-100 dark:bg-[#292b51]">
                <tr>
                  <th className="px-4 py-2 text-left">Title</th>
                  <th className="px-4 py-2">Destination</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Category</th>
                  <th className="px-4 py-2">Duration</th>
                  <th className="px-4 py-2">Availability</th>
                  <th className="px-4 py-2">Validity</th>
                  <th className="px-4 py-2">Itinerary</th>
                  <th className="px-4 py-2">Created By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {packages.map((pkg) => (
                  <tr key={pkg._id} className="hover:bg-gray-50 dark:hover:bg-[#1b1b2b]">
                    <td className="px-4 py-2 font-medium">{pkg.title}</td>
                    <td className="px-4 py-2">{pkg.destination}</td>
                    <td className="px-4 py-2 text-[#4657F0] font-semibold">
                      ৳{pkg.price.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200">
                        {pkg.category}
                      </span>
                    </td>
                    <td className="px-4 py-2">{pkg.duration} days</td>
                    <td className="px-4 py-2">
                      {pkg.availability ? (
                        <span className="text-green-600 font-semibold">Available</span>
                      ) : (
                        <span className="text-red-500 font-semibold">Unavailable</span>
                      )}
                    </td>
                    <td className="px-4 py-2 text-sm">
                      {new Date(pkg.validFrom).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      <br />
                      {new Date(pkg.validTill).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-4 py-2 text-xs max-w-[200px]">
                      {pkg.itinerary?.map((d, i) => (
                        <div key={i}>Day {d.day}: {d.activities}</div>
                      ))}
                    </td>
                    <td className="px-4 py-2 text-xs">{pkg.createdBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ✅ Mobile Cards */}
          <div className="md:hidden grid gap-4">
            {packages.map((pkg) => (
              <div key={pkg._id} className="p-4 border rounded-lg shadow-sm bg-gray-50 dark:bg-[#1f1f2e]">
                <h3 className="font-bold text-lg text-gray-800 dark:text-gray-100">{pkg.title}</h3>
                <p className="text-gray-700 dark:text-gray-300">{pkg.destination}</p>
                <p className="text-[#4657F0] font-semibold">৳{pkg.price.toLocaleString()}</p>
                <p className="text-sm">{pkg.duration} days · {pkg.category}</p>
                <p className="text-sm mt-1">
                  Valid: {new Date(pkg.validFrom).toLocaleDateString("en-GB", { day: "numeric", month: "short"})} -{" "}
                  {new Date(pkg.validTill).toLocaleDateString("en-GB", { day: "numeric", month: "short"})}
                </p>
                <div className="mt-2 text-sm">
                  <p className={pkg.availability ? "text-green-600" : "text-red-500"}>
                    {pkg.availability ? "Available" : "Unavailable"}
                  </p>
                  <div className="mt-1">
                    {pkg.itinerary?.map((d, i) => (
                      <div key={i} className="text-xs">Day {d.day}: {d.activities}</div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Created by: {pkg.createdBy}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManagePackages;