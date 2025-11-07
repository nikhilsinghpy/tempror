import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BadgeCheck,
  LogOut,
  MenuIcon,
  User,
  CalendarCheck,
  MessageSquare,
  Utensils,
  CreditCard,
  Droplets,
  Settings,
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
import { getHandler, postHandler } from "@/services/api.services";

const navigationData = [
  {
    label: "Account",
    link: "/account",
    icon: User,
  },
  {
    label: "Your Appointment",
    link: "/appointments",
    icon: CalendarCheck,
  },
  {
    label: "Your Query",
    link: "/queries",
    icon: MessageSquare,
  },
  {
    label: "Diet Chart",
    link: "/diet-chart",
    icon: Utensils,
  },
  {
    label: "Payment",
    link: "/payment",
    icon: CreditCard,
  },
  {
    label: "PRP",
    link: "/prp",
    icon: Droplets,
  },
  {
    label: "Settings",
    link: "/settings",
    icon: Settings,
  },
];

export default function Header() {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);
  const [menu, setMenu] = useState([
    { label: "Home", href: "/", simpleLink: true },
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
    { label: "Results", href: "/results", simpleLink: true },
    { label: "About", href: "/about-us", simpleLink: true },
    { label: "Contact", href: "/contact-us", simpleLink: true },
  ]);
  const { user } = useUser();

  const fetchBranches = async () => {
    try {
      const response = await getHandler("/branch/get");
      return response.data;
    } catch (error) {
      toast.dismiss();
      toast.error(error.message || "Something went wrong!");
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchBranches();
        const formattedData = data.map((branch) => ({
          title: branch.title,
          href: `/branch/${branch.seo.slug}`,
          description: branch.description,
        }));
        setMenu((prevMenu) => {
          // Avoid adding "Branch" twice
          if (prevMenu.some((item) => item.label === "Branch")) return prevMenu;

          // Insert at index 2
          const index = 1;
          return [
            ...prevMenu.slice(0, index),
            { label: "Branch", links: formattedData },
            ...prevMenu.slice(index),
          ];
        });
      } catch (error) {
        console.error("Error fetching branch data:", error);
      }
    };

    fetchData();
  }, []);

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
          {menu.map((item, index) =>
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
                              {`${link?.description?.slice(0, 80)} ...`}
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
            {menu.map((item, index) =>
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
          {navigationData.map((item, index) => (
            <DropdownMenuItem
              key={index}
              onClick={() => navigate(item.link)}
              className="cursor-pointer"
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleLogout}
          className={"bg-red-100 text-red-800"}
        >
          <LogOut className={"text-red-800"} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
