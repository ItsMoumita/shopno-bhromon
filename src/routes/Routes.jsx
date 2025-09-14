import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Packages from "../pages/packages";
import Login from "../pages/Login";
import Register from "../pages/Register";


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
      }

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