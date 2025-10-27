import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  Bell,
  CreditCard,
  LogOut,
  MenuIcon,
  Sparkles,
} from "lucide-react";
import logo from "../../../assets/images/logo.png";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import usericon from "../../../assets/images/usericon.jpg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/hooks/use-user";
import { toast } from "sonner";
import { postHandler } from "@/services/api.services";

const menuData = [
  {
    label: "Home",
    href: "/",
    simpleLink: true,
  },
  {
    label: "Branch",
    links: [
      {
        title: "Rohini Belleza Branch",
        href: "/branch/rohini-belleza-branch",
        description:
          "Our main and first branch, specializing in advanced hair transplants.",
      },
      {
        title: "Lucknow Belleza Branch",
        href: "/branch/lucknow-belleza-branch",
        description:
          "Our newly opened branch offering expert hair transplant services.",
      },
      {
        title: "Jaipur Belleza Branch",
        href: "/branch/jaipur-belleza-branch",
        description:
          "Our upcoming branch, expanding expert hair transplant services to Jaipur.",
      },
    ],
  },
  {
    label: "What We Do",
    links: [
      {
        title: "Hair Transplant",
        href: "/services/hair-transplant",
        description:
          "We offer advanced hair transplant treatments for natural results.",
      },
      {
        title: "Beard Transplant",
        href: "/services/beard-transplant",
        description:
          "Get a fuller, well-defined beard with our expert transplant services.",
      },
      {
        title: "Eyebrow Transplant",
        href: "/services/eyebrow-transplant",
        description:
          "Enhance your look with precise and natural eyebrow transplants.",
      },
    ],
  },
  {
    label: "Results",
    href: "/results",
    simpleLink: true,
  },
  {
    label: "About",
    href: "about-us",
    simpleLink: true,
  },
  {
    label: "Contact",
    href: "/contact-us",
    simpleLink: true,
  },
];
export default function Header() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      setLogin(true);
    }
  }, [user]);
  return (
    <header className="fixed w-full z-50 top-0 flex items-center justify-between bg-white border-b py-4 px-4 md:px-8">
      <Link to={"/"}>
        <img src={logo} alt="paras parivar" className="w-28 h-full" />
      </Link>
      <NavigationMenu viewport={false} className="hidden md:flex">
        <NavigationMenuList>
          {menuData.map((item, index) =>
            item.simpleLink ? (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link to={item.href}>{item.label}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem key={index}>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-4">
                    <li className="space-y-2">
                      {item.links.map((link, index) => (
                        <NavigationMenuLink asChild key={index}>
                          <Link to={link.href}>
                            <div className="font-medium">{link.title}</div>
                            <div className="text-muted-foreground">
                              {link.description}
                            </div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          )}
        </NavigationMenuList>
      </NavigationMenu>

      {login ? (
        <div className="hidden md:flex">
          <UserDropdownMenu user={user} />
        </div>
      ) : (
        <Button
          variant="default"
          className={"hidden md:flex"}
          onClick={() => navigate("/auth/login")}
        >
          Login
        </Button>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className={"md:hidden"}>
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent className={"gap-0"}>
          <SheetHeader>
            <SheetTitle>Belleza</SheetTitle>
            <SheetDescription className={"text-xs"}>
              Leading with Experience and Excellence
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 py-6 w-full space-y-4 flex flex-col border-y  max-h-[90vh] overflow-y-auto">
            {menuData.map((item, index) =>
              item.simpleLink ? (
                <Link
                  key={index}
                  to={item.href}
                  className="border p-2 rounded-sm hover:bg-slate-100"
                >
                  {item.label}
                </Link>
              ) : (
                <div key={index}>
                  <p className="text-[12px] text-accent-foreground font-semibold mb-2">
                    {item.label}
                  </p>
                  <div className="flex flex-col gap-2">
                    {item.links.map((link, index) => (
                      <Link
                        to={link.href}
                        key={index}
                        className="border p-2 rounded-sm hover:bg-slate-100"
                      >
                        {link.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
          <SheetFooter>
            {login ? (
              <UserDropdownMenu user={user} />
            ) : (
              <Button variant="default" onClick={() => navigate("/auth/login")}>
                Login
              </Button>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </header>
  );
}

function UserDropdownMenu({ user }) {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const handleLogout = () => {
    try {
      toast.promise(postHandler("/auth/logout"), {
        loading: "Logging out...",
        success: (response) => {
          localStorage.removeItem("accessToken");
          navigate("/auth/login");
          return response.message;
        },
        error: (error) => error.message || "Something went wrong!",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className={"!p-0"}>
          <Avatar>
            <AvatarImage src={usericon} alt={"user"} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{`${user?.name.first} ${user?.name.last}`}</span>
            <span className="truncate text-xs">
              {user?.email || "loading..."}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        side={isMobile ? "top" : "bottom"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={usericon} alt={"user"} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{"Paras Parivar"}</span>
              <span className="truncate text-xs">
                {" "}
                {"parasParivar@gmail.com"}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
