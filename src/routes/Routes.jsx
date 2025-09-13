import {
  createBrowserRouter,
} from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import Packages from "../pages/packages";


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
  }
]);