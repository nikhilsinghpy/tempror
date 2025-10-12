import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavItem({ navItemData }) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      {navItemData.map((item) => (
        <SidebarGroup key={item.label}>
          <SidebarGroupLabel>{item.label}</SidebarGroupLabel>
          <SidebarMenu>
            {item.navitems.map((navitem) => (
              <SidebarMenuItem key={navitem.label}>
                <SidebarMenuButton asChild>
                  <Link to={navitem.link}>{navitem.label}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </SidebarGroup>
  );
}
