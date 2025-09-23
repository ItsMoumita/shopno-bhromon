import { useState } from "react";
import DashboardSidebar from "../components/DashboardComponents/DashboardSidebar";
import DashboardNavbar from "../components/DashboardComponents/DashboardNavbar";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); 
  return (
    <div className="flex">
      {/* Sidebar */}
      <DashboardSidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main Content */}
      <div className="flex-1 md:ml-64">
        <DashboardNavbar isOpen={isOpen} setIsOpen={setIsOpen} />

        <main className="mt-16 p-6 bg-gray-100 dark:bg-[#12121c] min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;