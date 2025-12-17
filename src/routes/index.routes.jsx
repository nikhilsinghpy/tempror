import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import AuthLayout from "@/components/layout/AuthLayout";
import HomeLayout from "@/components/layout/HomeLayout";
import ProtectRoutes from "./protect.routes";

const NotFound = lazy(() => import("@/components/custom-component/NotFound/NotFound")); 
const AppointmentsAdmin = lazy(()=> import("@/pages/AdminPages/Appointments.admin"));
const BranchPageAdmin = lazy(() => import("@/pages/AdminPages/BranchPage.admin"));
const ClientListPageAdmin = lazy(() => import("@/pages/AdminPages/ClientListPage.admin"));
const ClientPayemntPageAdmin = lazy(() => import("@/pages/AdminPages/ClientPayemntPage.admin"));
const ClientPRPPageAdmin = lazy(() => import("@/pages/AdminPages/ClientPRPPage.admin"));
const DoctorPageAdmin = lazy(() => import("@/pages/AdminPages/DoctorPage.admin"));
const HeroBannerAdmin = lazy(() => import("@/pages/AdminPages/HeroBanner.admin"));
const HeroSectionAdmin = lazy(() => import("@/pages/AdminPages/HeroSection.admin"));
const AdminHomePage = lazy(() => import("@/pages/AdminPages/HomePage.admin"));
const ManageReviewAdmin = lazy(() => import("@/pages/AdminPages/ManageReview.admin"));
const PostClinicVideoPageAdmin = lazy(() => import("@/pages/AdminPages/PostClinicVideoPage.admin"));
const PostResultAdmin = lazy(() => import("@/pages/AdminPages/PostResult.admin"));
const QueryListAdmin = lazy(() => import("@/pages/AdminPages/QueryList.admin"));

// Auth Pages
const ForgotPassword = lazy(() => import("@/pages/authPages/ForgotPassword"));
const Login = lazy(() => import("@/pages/authPages/Login"));
const ResetPassword = lazy(() => import("@/pages/authPages/ResetPassword"));
const SignUp = lazy(() => import("@/pages/authPages/SignUp"));
const VerifyOtp = lazy(() => import("@/pages/authPages/VerifyOtp"));

// Utility / Normal Pages
const BranchPage = lazy(() => import("@/pages/BranchPage/BranchPage"));
const HomePage = lazy(() => import("@/pages/homePage/HomePage"));
const AboutUs = lazy(() => import("@/pages/utilityPages/AboutUs"));
const AppointmentPage = lazy(() => import("@/pages/utilityPages/AppointmentPage"));
const ContactUs = lazy(() => import("@/pages/utilityPages/ContactUs"));
const ResultPage = lazy(() => import("@/pages/utilityPages/ResultPage"));
const RewardPage = lazy(() => import("@/pages/rewards/RewardPage"));
// Service Pages
const BeardTransplantPage = lazy(() => import("@/pages/utilityPages/servicePages/BeardTransplantPage"));
const EyebrowTransplantPage = lazy(() => import("@/pages/utilityPages/servicePages/EyebrowTransplantPage"));
const HairTransplantPage = lazy(() => import("@/pages/utilityPages/servicePages/HairTransplantPage"));

// User Pages
const AccountPageUser = lazy(() => import("@/pages/userPages/AccountPage.user"));
const AccountDetailUser = lazy(() => import("@/pages/userPages/AccountDetailPage.user"));
const AppointmentPageUser = lazy(() => import("@/pages/userPages/AppointmentPage.user"));
const QueryPageUser = lazy(() => import("@/pages/userPages/QueryPage.user"));
const DietChartPageUser = lazy(() => import("@/pages/userPages/DietChartPage.user"));
const PaymentPageUser = lazy(() => import("@/pages/userPages/PaymentPage.user"));
const PRPPageUser = lazy(() => import("@/pages/userPages/PRPPage.user"));
const AccountSettingsUser = lazy(() => import("@/pages/userPages/Setting.user"));

// Components
const AddPrpForm = lazy(() => import("@/components/custom-component/forms/add-Prp-form"));
const PatientFrom = lazy(() => import("@/components/custom-component/forms/patient-from"));





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
      { path: "rewards", element: <RewardPage /> },
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
