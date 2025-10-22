import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "../ui/app-sidebar";
import { useUser } from "@/hooks/use-user";
import {
  BarChart3,
  Bell,
  Briefcase,
  Building,
  Calendar,
  CalendarClock,
  CalendarDays,
  Clock,
  CreditCard,
  Database,
  FileSearch,
  FileSignature,
  FileText,
  Gift,
  Home,
  List,
  MessageCircle,
  Plane,
  Receipt,
  Send,
  Timer,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
const navItemData = [
  {
    label: "Core HR Management",
    navitems: [
      { label: "HR Dashboard", link: "/core/", icon: BarChart3 },
      {
        label: "Employees",
        link: "/core/employee-database",
        icon: Database,
      },
      {
        label: "Document Management",
        link: "/core/document-management",
        icon: FileText,
      },
      {
        label: "Department & Roles",
        link: "/core/departments",
        icon: Building,
      },
    ],
  },
  {
    label: "Attendance & Time",
    navitems: [
      {
        label: "Attendance Tracking",
        link: "/attendance/tracking",
        icon: Clock,
      },
      { label: "Shift Scheduling", link: "/attendance/shifts", icon: Calendar },
      { label: "Leave Management", link: "/attendance/leaves", icon: Plane },
      {
        label: "Overtime Management",
        link: "/attendance/overtime",
        icon: Timer,
      },
      {
        label: "Holiday Calendar",
        link: "/attendance/holidays",
        icon: CalendarDays,
      },
      { label: "Remote Work Tracking", link: "/attendance/remote", icon: Home },
    ],
  },
  {
    label: "Payroll & Compensation",
    navitems: [
      {
        label: "Payroll Processing",
        link: "/payroll/processing",
        icon: CreditCard,
      },
      { label: "Payslips", link: "/payroll/payslips", icon: Receipt },
      { label: "Bonuses & Incentives", link: "/payroll/bonuses", icon: Gift },
      {
        label: "Expense Reimbursement",
        link: "/payroll/expenses",
        icon: Wallet,
      },
    ],
  },
  {
    label: "Recruitment & Onboarding",
    navitems: [
      { label: "Job Postings", link: "/recruitment/jobs", icon: Briefcase },
      { label: "Applicant Tracking", link: "/recruitment/ats", icon: Users },
      {
        label: "Resume",
        link: "/recruitment/resume-parsing",
        icon: FileSearch,
      },
      {
        label: "Interview Scheduling",
        link: "/recruitment/interviews",
        icon: CalendarClock,
      },
      {
        label: "Offer Letters",
        link: "/recruitment/offer-letters",
        icon: FileSignature,
      },
    ],
  },
];
const employeeNavItem = [
  {
    label: "Employee Self-Service",
    navitems: [
      { label: "Profile Updates", link: "/ess/profile", icon: UserCog },
      { label: "Leave Requests", link: "/ess/leave", icon: Send },
      { label: "Payslip & Tax Access", link: "/ess/payslips", icon: FileText },
      { label: "Attendance Logs", link: "/ess/attendance", icon: List },
      {
        label: "Feedback & Complaints",
        link: "/ess/feedback",
        icon: MessageCircle,
      },
      { label: "Announcements", link: "/ess/announcements", icon: Bell },
    ],
  },
];
export default function HRManagementDashboardLayout() {
  const { user } = useUser();
  const [sidebarData, setSidebarData] = useState([]);
  useEffect(() => {
    if (user) {
      if (user.role === "employee") {
        setSidebarData(employeeNavItem);
      } else if (user.role === "admin") {
        setSidebarData(navItemData);
      } else {
        setSidebarData(navItemData);
      }
    }
  }, [user]);
  return (
    <SidebarProvider>
      <AppSidebar sidebarData={sidebarData} user={user} />
      <SidebarInset>
        <header className="flex border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
