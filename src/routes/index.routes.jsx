import NotFound from "@/components/custom-component/NotFound/NotFound";
import AdminLayout from "@/components/layout/AdminLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import HomeLayout from "@/components/layout/HomeLayout";
import HRManagementDashboardLayout from "@/components/layout/HRManagementDashboardLayout";
import AppointmentsAdmin from "@/pages/AdminPages/Appointments.admin";
import BranchPageAdmin from "@/pages/AdminPages/BranchPage.admin";
import ClientListPageAdmin from "@/pages/AdminPages/ClientListPage.admin";
import ClientPayemntPageAdmin from "@/pages/AdminPages/ClientPayemntPage.admin";
import ClientPRPPageAdmin from "@/pages/AdminPages/ClientPRPPage.admin";
import DoctorPageAdmin from "@/pages/AdminPages/DoctorPage.admin";
import HeroBannerAdmin from "@/pages/AdminPages/HeroBanner.admin";
import HeroSectionAdmin from "@/pages/AdminPages/HeroSection.admin";
import AdminHomePage from "@/pages/AdminPages/HomePage.admin";
import ManageReviewAdmin from "@/pages/AdminPages/ManageReview.admin";
import PostClinicVideoPageAdmin from "@/pages/AdminPages/PostClinicVideoPage.admin";
import PostResultAdmin from "@/pages/AdminPages/PostResult.admin";
import QueryListAdmin from "@/pages/AdminPages/QueryList.admin";
import ForgotPassword from "@/pages/authPages/ForgotPassword";
import Login from "@/pages/authPages/Login";
import ResetPassword from "@/pages/authPages/ResetPassword";
import SignUp from "@/pages/authPages/SignUp";
import VerifyOtp from "@/pages/authPages/VerifyOtp";
import BranchPage from "@/pages/BranchPage/BranchPage";
import HomePage from "@/pages/homePage/HomePage";
import AboutUs from "@/pages/utilityPages/AboutUs";
import AppointmentPage from "@/pages/utilityPages/AppointmentPage";
import ContactUs from "@/pages/utilityPages/ContactUs";
import ResultPage from "@/pages/utilityPages/ResultPage";
import BeardTransplantPage from "@/pages/utilityPages/servicePages/BeardTransplantPage";
import EyebrowTransplantPage from "@/pages/utilityPages/servicePages/EyebrowTransplantPage";
import HairTransplantPage from "@/pages/utilityPages/servicePages/HairTransplantPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "contact-us", element: <ContactUs /> },
      { path: "about-us", element: <AboutUs /> },
      { path: "results", element: <ResultPage /> },
      { path: "branch/:slug", element: <BranchPage /> },
      { path: "book-appointment", element: <AppointmentPage /> },
      {
        path: "services",
        children: [
          { path: "hair-transplant", element: <HairTransplantPage /> },
          { path: "beard-transplant", element: <BeardTransplantPage /> },
          { path: "eyebrow-transplant", element: <EyebrowTransplantPage /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/hr-management",
    element: <HRManagementDashboardLayout />,
    children: [{ path: "*", element: <NotFound /> }],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminHomePage /> },
      { path: "clients", element: <ClientListPageAdmin /> },
      { path: "clients-prp", element: <ClientPRPPageAdmin /> },
      { path: "clients-payment-schedule", element: <ClientPayemntPageAdmin /> },
      { path: "appointments", element: <AppointmentsAdmin /> },
      { path: "queries", element: <QueryListAdmin /> },
      { path: "manage-doctor", element: <DoctorPageAdmin /> },
      { path: "manage-website/hero", element: <HeroSectionAdmin /> },
      { path: "manage-website/hero/banner", element: <HeroBannerAdmin /> },
      { path: "manage-website/post-result", element: <PostResultAdmin /> },
      {
        path: "manage-website/post-clinic-video",
        element: <PostClinicVideoPageAdmin />,
      },
      {
        path: "manage-website/post-review",
        element: <ManageReviewAdmin />,
      },
      { path: "manage-branch", element: <BranchPageAdmin /> },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "sign-up", element: <SignUp /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      { path: "verify-otp", element: <VerifyOtp /> },
      { path: "reset-password", element: <ResetPassword /> },
    ],
  },
]);
