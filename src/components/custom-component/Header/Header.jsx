import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MenuIcon, User2 } from "lucide-react";
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
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
  const [login, setLogin] = useState(true);
  return (
    <header className="fixed w-full z-50 top-0 flex items-center justify-between bg-white border-b py-4 px-4 md:px-8">
      <img src={logo} alt="paras parivar" className="w-28 h-full" />
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
        <Button variant="default" size={"icon"} className={"hidden md:flex"}>
          <User2 />
        </Button>
      ) : (
        <Button variant="default" className={"hidden md:flex"}>
          Login
        </Button>
      )}

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className={"md:hidden"}>
            <MenuIcon className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Belleza</SheetTitle>
            <SheetDescription>
              Leading with Experience and Excellence
            </SheetDescription>
          </SheetHeader>
          <div className="px-4 py-6 w-full space-y-4 flex flex-col  max-h-[95vh] overflow-y-auto">
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
        </SheetContent>
      </Sheet>
    </header>
  );
}
