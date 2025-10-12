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
  GalleryVerticalEnd,
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
import { NavItem } from "@/components/ui/nav-item";
import { NavUser } from "@/components/ui/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { SideBarheader } from "./sidebar-header";
import { useUser } from "@/hooks/use-user";
import { useState } from "react";
import { useEffect } from "react";

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

export function AppSidebar({ ...props }) {
  const user = useUser();
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
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SideBarheader
          data={{
            logo: GalleryVerticalEnd,
            title: "Bellezarohini",
          }}
        />
      </SidebarHeader>
      <SidebarContent>
        <NavItem navItemData={sidebarData} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
