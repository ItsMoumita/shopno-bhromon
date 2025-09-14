"use client";

import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const footerLinks = {
    pages: [
      { name: "Home", href: "/" },
      { name: "Packages", href: "/packages" },
      { name: "Resorts", href: "/resorts" },
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "FAQs", href: "#" },
      { name: "Quick Start", href: "#" },
      { name: "Documentation", href: "#" },
      { name: "User Guide", href: "#" },
    ],
    blogs: [
      { name: "News", href: "/blog" },
      { name: "Tips & Tricks", href: "#" },
      { name: "New Updates", href: "#" },
      { name: "Events", href: "#" },
    ],
  };

const socialLinks = [
  {
    label: "Twitter",
    href: "#",
    icon: <FaTwitter className="w-5 h-5 text-white" />,
  },
  {
    label: "Instagram",
    href: "#",
    icon: <FaInstagram className="w-5 h-5 text-white" />,
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: <FaLinkedin className="w-5 h-5 text-white" />,
  },
  {
    label: "YouTube",
    href: "#",
    icon: <FaYoutube className="w-5 h-5 text-white" />,
  },
];

  return (
    <footer className="w-full bg-white dark:bg-[#12121c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-8 py-12">
          {/* Logo + About */}
          <div className="col-span-full lg:col-span-2 text-center lg:text-left">
            <a href="/" className="flex justify-center lg:justify-start">
              <img
                src="/travel-logo.png"
                alt="Travel Logo"
                className="h-14 w-auto object-contain"
              />
            </a>
            <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 lg:max-w-xs">
              Explore the world with confidence. Trusted by travelers in 100+
              countries to book tours, resorts, and more.
            </p>
            <a
              href="/contact"
              className="mt-6 inline-block py-2.5 px-6 bg-[#4657F0] hover:bg-[#2f3fd9] text-white text-sm rounded-full shadow-sm transition-colors"
            >
              Contact Us
            </a>
          </div>

          {/* Dynamic Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-5 capitalize">
                {title}
              </h4>
              <ul className="space-y-3 text-sm">
                {links.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 dark:border-gray-700 py-6 flex flex-col-reverse md:flex-row items-center justify-between gap-4">
          <span className="text-sm text-gray-500 dark:text-gray-400 text-center md:text-left">
            © 2024 FlyPlane Travel. All rights reserved.
          </span>
          <div className="flex space-x-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                aria-label={link.label}
                className="w-9 h-9 flex justify-center items-center rounded-full bg-gray-700 dark:bg-gray-600 hover:bg-[#4657F0] transition-colors"
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;