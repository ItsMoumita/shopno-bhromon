import DashboardNavbar from "../components/DashboardComponents/DashboardNavbar";
import DashboardSidebar from "../components/DashboardComponents/DashboardSidebar";

 const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content Wrapper */}
      <div className="flex-1 ml-64">
        {/* Navbar */}
        <DashboardNavbar />

        {/* Page Content */}
        <main className="mt-16 p-6 bg-gray-100 dark:bg-[#12121c] min-h-screen">
          {children}
        </main>
      </div>
    </div>
  );
};



export default DashboardLayout;