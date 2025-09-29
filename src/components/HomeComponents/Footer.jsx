"use client";

import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-[#aeb0d6]/20 to-gray-50 dark:from-[#12121c] dark:to-gray-900 text-gray-900 dark:text-white py-16 px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Logo + About */}
        <div className="space-y-4 text-center md:text-left">
          <a
            href="/"
            className="flex justify-center md:justify-start items-center space-x-2"
          >
            <img
              src="/travel-logo.png"
              alt="Shopnobhromon Logo"
              className="h-12 w-auto object-contain"
            />
            <h3 className="text-2xl font-extrabold text-[#4657F0]">
              সপ্নভ্রমণ
            </h3>
          </a>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
            Explore the world with confidence. Trusted by travelers in 100+
            countries to book tours, resorts, and more.
          </p>

          {/* Socials */}
          <div className="flex justify-center md:justify-start space-x-4 pt-2">
            <a
              href="#"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#4657F0] hover:text-white transition-colors"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#4657F0] hover:text-white transition-colors"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-300 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-[#4657F0] hover:text-white transition-colors"
            >
              <FaLinkedinIn size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-bold">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/packages"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                Packages
              </a>
            </li>
            <li>
              <a
                href="/resorts"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                Resorts
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-bold">Resources</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                FAQs
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                Quick Start
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                User Guide
              </a>
            </li>
          </ul>
        </div>

        {/* Blogs */}
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-lg font-bold">Blogs</h3>
          <ul className="space-y-3">
            <li>
              <a
                href="/blog"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                News
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                Tips & Tricks
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                New Updates
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 dark:text-gray-300 hover:text-[#4657F0] transition-colors"
              >
                Events
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-500 dark:text-gray-400 text-sm pt-10 mt-10 border-t border-gray-200 dark:border-gray-700">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="text-[#4657F0]">সপ্নভ্রমণ</span>. All rights
          reserved.
        </p>
        <p className="mt-1">Designed with ❤️ in Bangladesh</p>
      </div>
    </footer>
  );
};

export default Footer;