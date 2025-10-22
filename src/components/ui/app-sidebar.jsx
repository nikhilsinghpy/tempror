import { GalleryVerticalEnd } from "lucide-react";
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

export function AppSidebar({ sidebarData, user }) {
  return (
    <Sidebar collapsible="icon">
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
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
