import NotFound from "@/components/custom-component/NotFound/NotFound";
import AdminLayout from "@/components/layout/AdminLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import HomeLayout from "@/components/layout/HomeLayout";
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
import AccountPageUser from "@/pages/userPages/AccountPage.user";
import AboutUs from "@/pages/utilityPages/AboutUs";
import AppointmentPage from "@/pages/utilityPages/AppointmentPage";
import ContactUs from "@/pages/utilityPages/ContactUs";
import ResultPage from "@/pages/utilityPages/ResultPage";
import BeardTransplantPage from "@/pages/utilityPages/servicePages/BeardTransplantPage";
import EyebrowTransplantPage from "@/pages/utilityPages/servicePages/EyebrowTransplantPage";
import HairTransplantPage from "@/pages/utilityPages/servicePages/HairTransplantPage";
import { createBrowserRouter } from "react-router-dom";
import AccountDetailUser from "@/pages/userPages/AccountDetailPage.user";
import AppointmentPageUser from "@/pages/userPages/AppointmentPage.user";
import QueryPageUser from "@/pages/userPages/QueryPage.user";
import DietChartPageUser from "@/pages/userPages/DietChartPage.user";
import PaymentPageUser from "@/pages/userPages/PaymentPage.user";
import PRPPageUser from "@/pages/userPages/PRPPage.user";
import AccountSettingsUser from "@/pages/userPages/Setting.user";
import ProtectRoutes from "./protect.routes";
import AddPrpForm from "@/components/custom-component/forms/add-Prp-form";
import PatientFrom from "@/components/custom-component/forms/patient-from";

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
      {
        path: "book-appointment",
        element: <ProtectRoutes />,
        children: [{ index: true, element: <AppointmentPage /> }],
      },
      {
        path: "services",
        children: [
          { path: "hair-transplant", element: <HairTransplantPage /> },
          { path: "beard-transplant", element: <BeardTransplantPage /> },
          { path: "eyebrow-transplant", element: <EyebrowTransplantPage /> },
        ],
      },
      {
        path: "/account",
        element: <ProtectRoutes />,
        children: [
          { index: true, element: <AccountPageUser /> },
          { path: "account-details", element: <AccountDetailUser /> },
          { path: "appointments", element: <AppointmentPageUser /> },
          { path: "queries", element: <QueryPageUser /> },
          { path: "diet-chart", element: <DietChartPageUser /> },
          { path: "payment", element: <PaymentPageUser /> },
          { path: "prp", element: <PRPPageUser /> },
          { path: "settings", element: <AccountSettingsUser /> },
        ],
      },
      { path: "*", element: <NotFound /> },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectRoutes requiredRole="admin">
        <AdminLayout />
      </ProtectRoutes>
    ),
    children: [
      { index: true, element: <AdminHomePage /> },
      {
        path: "patient",
        children: [
          { path: "", element: <ClientListPageAdmin /> },
          { path: "add-patient", element: <PatientFrom /> },
          {
            path: "patient-prp",
            children: [
              { path: "", element: <ClientPRPPageAdmin /> },
              { path: "schedule", element: <AddPrpForm /> },
            ],
          },
          { path: "payment-schedule", element: <ClientPayemntPageAdmin /> },
        ],
      },
      { path: "appointments", element: <AppointmentsAdmin /> },
      { path: "queries", element: <QueryListAdmin /> },
      { path: "manage-doctor", element: <DoctorPageAdmin /> },
      {
        path: "manage-website",
        children: [
          { path: "hero/section", element: <HeroSectionAdmin /> },
          { path: "hero/banner", element: <HeroBannerAdmin /> },
          { path: "post-result", element: <PostResultAdmin /> },
          { path: "post-clinic-video", element: <PostClinicVideoPageAdmin /> },
          { path: "post-review", element: <ManageReviewAdmin /> },
        ],
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
