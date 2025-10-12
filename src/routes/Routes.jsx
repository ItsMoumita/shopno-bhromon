import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Packages from "../pages/packages";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import DashboardLayout from "../layouts/DashboardLayout";
import { Component } from "lucide-react";
import DashboardHome from "../pages/Dashboard Pages/DashboardHome";
import AdminRoute from "../hooks/AdminRoute";
import AllUsers from "../pages/Dashboard Pages/AllUsers";
import AddPackage from "../pages/Dashboard Pages/AddPackage";
import ManagePackages from "../pages/Dashboard Pages/ManagePackages";
import PackageDetails from "../pages/PackageDetails";
import AddResorts from "../pages/Dashboard Pages/AddResorts";
import Resorts from "../pages/Resorts";
import ManageResorts from "../pages/Dashboard Pages/ManageResorts";
import ResortDetails from "../pages/ResortDetails";
import CheckoutPage from "../pages/CheckoutPage";
import Bookings from "../pages/Bookings";
import AllBookings from "../pages/Dashboard Pages/AllBookings";
import Private from "../context/Private";



export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: "packages",
        Component: Packages
      },
      {
        path: "package/:id",
        Component: PackageDetails
      },
      {
        path: "about",
        Component: About
      },
      {
        path: "resorts",
        Component: Resorts
      },
      {
        path: "/resort/:id",
        Component: ResortDetails
      },
      {
        path: "/checkout",
        element: <Private><CheckoutPage></CheckoutPage></Private>
      },
      {
        path: "/bookings",
        element: <Private><Bookings></Bookings></Private>
      },

    ]
  },
  {
    path: "dashboard",
    element:<AdminRoute></AdminRoute>,
    children:[
          {
            index: true,
            element: <DashboardLayout>
                <DashboardHome></DashboardHome>
            </DashboardLayout>
          },
          {
            path: "all-users",
            element: <DashboardLayout>
                <AllUsers></AllUsers>
            </DashboardLayout>
          },
          {
            path: "add-packages",
            element: <DashboardLayout>
                <AddPackage></AddPackage>
            </DashboardLayout>
          },
          {
            path: "manage-packages",
            element: <DashboardLayout>
                <ManagePackages></ManagePackages>
            </DashboardLayout>
          },
          {
            path: "add-resorts",
            element: <DashboardLayout>
                <AddResorts></AddResorts>
            </DashboardLayout>
          },
          {
            path: "manage-resorts",
            element: <DashboardLayout>
                <ManageResorts></ManageResorts>
            </DashboardLayout>
          },
      
          {
            path: "all-bookings",
            element: <DashboardLayout>
                <AllBookings></AllBookings>
            </DashboardLayout>
          },
      
    ]

  },
  {
        path: "login",
        Component: Login
      },
  {
        path: "register",
        Component: Register
        
      },
]);