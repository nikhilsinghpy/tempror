import HomeLayout from "@/components/layout/HomeLayout";
import Login from "@/pages/authPages/Login";
import BranchPage from "@/pages/BranchPage/BranchPage";
import HomePage from "@/pages/homePage/HomePage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
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
    path: "auth",
    children: [{ path: "login", element: <Login /> }],
  },
]);
