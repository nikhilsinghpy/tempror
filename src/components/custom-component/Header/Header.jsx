import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
  User2,
} from "lucide-react";

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
        href: "Branch/Rohini-Belleza-Branch",
        description:
          "Our main and first branch, specializing in advanced hair transplants.",
      },
      {
        title: "Lucknow Belleza Branch",
        href: "Branch/Lucknow-Belleza-Branch",
        description:
          "Our newly opened branch offering expert hair transplant services.",
      },
      {
        title: "Jaipur Belleza Branch",
        href: "Branch/Jaipur-Belleza-Branch",
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
        href: "Services/Hair-Transplant",
        description:
          "We offer advanced hair transplant treatments for natural results.",
      },
      {
        title: "Beard Transplant",
        href: "Services/Beard-Transplant",
        description:
          "Get a fuller, well-defined beard with our expert transplant services.",
      },
      {
        title: "Eyebrow Transplant",
        href: "Services/Eyebrow-Transplant",
        description:
          "Enhance your look with precise and natural eyebrow transplants.",
      },
    ],
  },
  {
    label: "Results",
    href: "/Results",
    simpleLink: true,
  },
  {
    label: "About",
    href: "/About",
    simpleLink: true,
  },
  {
    label: "Contact",
    href: "/Contact",
    simpleLink: true,
  },
];
export default function Header() {
  const [login, setLogin] = useState(true);
  return (
    <header className="fixed w-full z-50 top-0 flex items-center justify-between bg-white border-b py-4 px-8">
      <img
        src="https://res.cloudinary.com/dge7jibik/image/upload/v1759558896/mainlogo_Black_ewt8d1.png"
        alt="paras parivar"
        className="w-42 h-full"
      />
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          {menuData.map((item, index) =>
            item.simpleLink ? (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href={item.href}>{item.label}</Link>
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
        <Button variant="default" size={"icon"}>
          <User2 />
        </Button>
      ) : (
        <Button variant="default">Login</Button>
      )}
    </header>
  );
}
