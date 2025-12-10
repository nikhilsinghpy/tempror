import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
const menuData = [
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
    label: "Quick links",
    links: [
      {
        title: "About",
        href: "/About",
      },
      {
        title: "Contact",
        href: "/contact-us",
      },
      {
        title: "Results",
        href: "/results",
      },
    ],
  },
];
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <img src={"https://res.cloudinary.com/dlfpme2sn/image/upload/v1765022631/logo_ojc0cv.png"} alt="Belleza Rohini Logo" className="h-12 mb-4" loading="lazy" />
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Belleza Rohini</strong> — Delhi’s top Hair Transplant
              Clinic, specializing in <strong>FUE, DHI</strong> &amp;{" "}
              <strong>Sapphire</strong> techniques. Trusted by 10,000+ happy
              patient.
            </p>

            {/* Contact Info */}
            <div className="mt-4 space-y-2 text-gray-700 text-sm">
              <p className="flex items-center gap-2">
                <MapPin size={16} /> Headquarters : Rohini, New Delhi, India
              </p>
              <p className="flex items-center gap-2">
                <Phone size={16} /> +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                <Mail size={16} /> info@bellezarohini.com
              </p>
            </div>
          </div>
          {/* Dynamic Menu Columns */}
          {menuData.map((item, i) => (
            <div key={i}>
              <h3 className="text-gray-900 font-semibold mb-4 text-lg">
                {item.label}
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {item.links.map((link, idx) => (
                  <li key={idx}>
                    <a
                      href={link.href}
                      className="hover:text-primary transition-colors duration-200"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-300 my-8"></div>
        {/* Social + Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-600 gap-4">
          <p>© 2025 Belleza Rohini. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={18} />
            </a>
            <a
              href="#"
              className="hover:text-primary transition-colors"
              aria-label="YouTube"
            >
              <Youtube size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
