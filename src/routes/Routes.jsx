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
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: DashboardHome
      }
      //  {
      //   path: "all-users",
      //  Component: AllUsers
      //  }
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