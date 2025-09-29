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
        path: "about",
        Component: About
      }

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