import { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaPencilAlt } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Aos from "aos";

const COLORS = ["#4657F0", "#00C49F", "#FF7F50", "#4FC3F7", "#FF8042"];


const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axiosSecure.get(`/api/users?page=${page}&limit=5`);
        setUsers(res.data.users);
        setPages(res.data.pages);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [axiosSecure, page]);

  const roleCounts = users.reduce((acc, u) => {
    acc[u.role] = (acc[u.role] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(roleCounts).map((role) => ({
    name: role.charAt(0).toUpperCase() + role.slice(1),
    value: roleCounts[role],
  }));

  useEffect(() => {
  Aos.init({
    duration: 800, // duration of animation in ms
    offset: 100,   // offset (in px) from the original trigger point
    easing: "ease-in-out", // easing type
    once: true,    // whether animation should happen only once
  });
}, []);

  const handleRoleChange = async (email, currentRole) => {
    Swal.fire({
      title: "Change Role",
      text: `Update role for ${email}`,
      input: "select",
      inputOptions: { user: "User", admin: "Admin" },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonText: "Update",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.put( `/api/users/${encodeURIComponent(email)}/role`, { role: result.value });
          Swal.fire("Updated ✅", `Role changed to ${result.value}`, "success");
          setUsers((prev) =>
            prev.map((u) => (u.email === email ? { ...u, role: result.value } : u))
          );
        } catch (err) {
          Swal.fire("Error ❌", err.response?.data?.error || "Failed to update role", "error");
        }
      }
    });
  };



  return (
    <div data-aos="zoom-in"
      className="flex flex-col min-h-[calc(100vh-94px)]"
    >
      {/* Main content grows */}
      <div className="flex-grow p-6 bg-white dark:bg-[#1b1b2b] rounded-lg shadow-md flex flex-col">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center dark:text-gray-100">
          Users Overview
        </h2>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={250}>
          <PieChart >
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" />
          </PieChart >
        </ResponsiveContainer>

        {/* Table */}
        <div className="flex-grow mt-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200 dark:bg-[#292b51] text-gray-700 dark:text-gray-200">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {loading
                ? [...Array(5)].map((_, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2"><Skeleton /></td>
                      <td className="px-4 py-2"><Skeleton /></td>
                      <td className="px-4 py-2"><Skeleton width={60} /></td>
                    </tr>
                  ))
                : users.map((u) => (
                    <tr key={u.email} className="border-b dark:border-gray-700">
                      <td className="px-4 py-2 text-gray-800 dark:text-gray-100">{u.name}</td>
                      <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{u.email}</td>
                      <td className="px-4 py-2 flex items-center justify-between text-gray-700 dark:text-gray-200">
                        {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                        {user?.role === "admin" && user.email !== u.email && (
                          <button
                            onClick={() => handleRoleChange(u.email, u.role)}
                            className="ml-2 text-[#292b51] dark:text-white hover:text-[#4657F0]"
                          >
                            <FaPencilAlt size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>


         {/* Pagination pinned at the bottom */}
      <div className="py-4 flex justify-center space-x-2">
        <button
          className="px-3 py-1 bg-gray-200 dark:bg-[#292b51] rounded disabled:opacity-50"
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <span className="px-3 py-1 text-gray-700 dark:text-gray-200">
          Page {page} of {pages}
        </span>
        <button
          className="px-3 py-1 bg-gray-200 dark:bg-[#292b51] rounded disabled:opacity-50"
          disabled={page >= pages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
      </div>

      

    </div>
  );
};

export default AllUsers;