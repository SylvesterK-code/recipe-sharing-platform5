import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { href: "https://facebook.com", icon: FaFacebook, label: "Facebook" },
  { href: "https://twitter.com", icon: FaTwitter, label: "Twitter" },
  { href: "https://instagram.com", icon: FaInstagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: FaLinkedin, label: "LinkedIn" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center md:flex-row md:justify-between">
        {/* Copyright */}
        <p className="text-center md:text-left mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} RecipeApp. All rights reserved.
        </p>

        {/* Social Icons */}
        <div className="flex space-x-6 text-2xl">
          {socialLinks.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hover:text-white transition-colors duration-200"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
