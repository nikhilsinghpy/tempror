import React from "react";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import logo from "../../../assets/images/logo.png";
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
        href: "/Contact",
      },
      {
        label: "Results",
        href: "/Results",
        simpleLink: true,
      },
    ],
  },
];
export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto py-10 px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div>
            <img src={logo} alt="Belleza Rohini Logo" className="h-12 mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed">
              <strong>Belleza Rohini</strong> — Delhi’s top Hair Transplant
              Clinic, specializing in <strong>FUE, DHI</strong> &amp;{" "}
              <strong>Sapphire</strong> techniques. Trusted by 10,000+ happy
              clients.
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

        {/* Divider */}
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

// {/* Contact Info */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">Reach Us</h3>
//             <ul className="text-gray-400 space-y-2 text-sm">
//               <li>
//                 Address: C, 9/119, Halar Rd, Pocket 9, Sector 8C, Rohini, New
//                 Delhi, 110085
//               </li>
//               <li>
//                 Phone:{" "}
//                 <a href="tel:+917982332206" className="hover:text-white">
//                   +91 79823 32206
//                 </a>
//               </li>
//               <li>
//                 Email:{" "}
//                 <a
//                   href="mailto:info@bellezarohini.com"
//                   className="hover:text-white"
//                 >
//                   info@bellezarohini.com
//                 </a>
//               </li>
//             </ul>
//           </div>
//           {/* Social & Newsletter */}
//           <div>
//             <h3 className="text-white font-semibold mb-4">Connect with Us</h3>
//             <div className="flex space-x-4 mb-6">
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <svg
//                   className="h-6 w-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   …FB icon svg…
//                 </svg>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <svg
//                   className="h-6 w-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   …Instagram icon svg…
//                 </svg>
//               </a>
//               <a href="#" className="text-gray-400 hover:text-white">
//                 <svg
//                   className="h-6 w-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   …YouTube icon svg…
//                 </svg>
//               </a>
//             </div>
//           </div>
