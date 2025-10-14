import HomeLayout from "@/components/layout/HomeLayout";
import HRManagementDashboardLayout from "@/components/layout/HRManagementDashboardLayout";
import Login from "@/pages/authPages/Login";
import BranchPage from "@/pages/BranchPage/BranchPage";
import HomePage from "@/pages/homePage/HomePage";
import ContactUs from "@/pages/utilityPages/ContactUs";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "branch/:slug", element: <BranchPage /> },
      {
        path: "*",
        element: (
          <div className="h-screen w-full justify-center flex items-center ">
            404
          </div>
        ),
      },
    ],
  },
  {
    path: "/hr-management",
    element: <HRManagementDashboardLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "*",
        element: (
          <div className="h-screen w-full justify-center flex items-center ">
            404
          </div>
        ),
      },
    ],
  },
  {
    path: "auth",
    children: [{ path: "login", element: <Login /> }],
  },
]);
