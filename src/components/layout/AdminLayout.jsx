import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
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
import { Toaster } from "sonner";

const navItemData = [
  {
    label: "Manage Client",
    navitems: [
      { label: "Clients List ", link: "/admin/clients" },
      { label: "Client PRP ", link: "/admin/clients-prp" },
      {
        label: "Client Payment & Schedule ",
        link: "/admin/clients-payment-schedule",
      },
    ],
  },
  {
    label: "Manage Appointment",
    navitems: [
      {
        label: "Today's Appointment",
        link: `/admin/appointments?date=${
          new Date().toISOString().split("T")[0]
        }`,
      },
      { label: "Appointment", link: "/admin/appointments" },
    ],
  },
  {
    label: "Query",
    navitems: [
      {
        label: "Today's Query-List",
        link: `/admin/queries?date=${new Date().toISOString().split("T")[0]}`,
      },
      { label: "Query-List", link: "/admin/queries" },
    ],
  },
  {
    label: "Manage Doctor",
    navitems: [{ label: "Doctor", link: "/admin/manage-doctor" }],
  },
  {
    label: "Manage Website",
    navitems: [
      { label: "Hero Section", link: "/admin/manage-website/hero" },
      { label: "Hero Banner", link: "/admin/manage-website/hero/banner" },
      { label: "Post Result", link: "/admin/manage-website/post-result" },
      {
        label: "Post Clinic Video",
        link: "/admin/manage-website/post-clinic-video",
      },
      {
        label: "Manage Review",
        link: "/admin/manage-website/post-review",
      },
    ],
  },
  {
    label: "Manage Branch",
    navitems: [{ label: "Branch", link: "/admin/manage-branch" }],
  },
];
export default function AdminLayout() {
  const { user } = useUser();
  const location = useLocation();
  const [paths, setPaths] = useState([]);

  useEffect(() => {
    const pathArray = location.pathname.split("/").filter(Boolean);
    setPaths(pathArray);
  }, [location.pathname]);
  return (
    <SidebarProvider>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 5000,
          unstyled: true,
          className:
            "flex items-center z-100 bg-white gap-2 rounded-md shadow-lg p-4 border min-w-[250px] sm:min-w-[300px] md:min-w-[350px] lg:min-w-[400px] max-w-[90vw] mx-auto",
          classNames: {
            error: "text-red-600 bg-white border-red-600 ",
            success: "text-green-600 bg-white border-green-600 ",
            warning: "text-yellow-600 bg-white border-yellow-600 ",
            info: "text-blue-400 bg-white border-blue-400 ",
          },
        }}
      />
      <AppSidebar sidebarData={navItemData} user={user} />
      <SidebarInset>
        <header className="bg-white z-50 sticky top-0 flex border-b h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {paths.map((path, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <BreadcrumbItem className={"cursor-not-allowed capitalize"}>
                      {path}
                    </BreadcrumbItem>
                    {index !== paths.length - 1 && (
                      <BreadcrumbSeparator
                        key={index}
                        className="cursor-not-allowed"
                      />
                    )}
                  </div>
                ))}
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
