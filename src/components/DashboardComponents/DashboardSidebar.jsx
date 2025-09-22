import { FaTachometerAlt, FaRegHeart, FaMoneyBill, FaUserEdit, FaCog, FaSignOutAlt, FaRoute } from "react-icons/fa";

const DashboardSidebar = () => {
  return (
    <aside className="bg-white dark:bg-[#1f1f2e] shadow-md w-64 min-h-screen fixed left-0 top-0 z-30 flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-[#4657F0] p-6">XploreElite</h2>
        <nav className="space-y-3 px-4">
          <a href="/dashboard" className="flex items-center gap-3 px-4 py-2 rounded-lg bg-[#4657F0] text-white">
            <FaTachometerAlt /> Dashboard
          </a>
          <a href="/tours" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#292b51]">
            <FaRoute /> Tour
          </a>
          <a href="/recent" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#292b51]">
            <FaRegHeart /> Recent Tour
          </a>
          <a href="/favorites" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#292b51]">
            <FaRegHeart /> Favorite
          </a>
          <a href="/payment" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#292b51]">
            <FaMoneyBill /> Payment
          </a>
          <a href="/profile" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#292b51]">
            <FaUserEdit /> Profile Edit
          </a>
          <a href="/settings" className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#292b51]">
            <FaCog /> Settings
          </a>
        </nav>
      </div>

      <div className="p-4">
        <a href="/logout" className="flex items-center gap-3 text-red-500 hover:bg-red-100 px-4 py-2 rounded-lg">
          <FaSignOutAlt /> Log Out
        </a>
      </div>
    </aside>
  );
};

export default DashboardSidebar;