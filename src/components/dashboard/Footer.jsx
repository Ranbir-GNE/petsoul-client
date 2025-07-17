import React, { useState } from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaChevronUp, FaChevronDown, FaLinkedinIn, FaChevronRight } from "react-icons/fa";
const Footer = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <footer className="bg-gray-800 text-[#fffff0] font-serif"> {/* Adjusted background and text color */}
      {/* Mobile Collapsible Footer */}
      <div className="md:hidden px-4 py-6"> {/* Added padding consistent with new footer */}
        <button
          className="flex items-center justify-between w-full text-xl font-bold"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-expanded={!collapsed}
        >
          <span>Pet Soul</span> {/* Changed from "Footer" to match new style */}
          {collapsed ? <FaChevronDown size={20} /> : <FaChevronUp size={20} />} {/* Phosphor icons for collapse */}
        </button>
        {!collapsed && (
          <div className="mt-6 space-y-6"> {/* Increased spacing */}
            {/* Logo and Tagline (Mobile) */}
            <div className="space-y-1">
              <h1 className="text-3xl font-bold leading-none tracking-tight">
                Pet Soul
              </h1>
              <p className="text-lg font-light">
                Crafting (Pet)ential Experiences
              </p>
            </div>

            {/* Contact Info (Mobile) */}
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide text-xs">CONTACT</h3>
              <div className="space-y-0.5 text-[#fffff0] text-sm">
                <p>Ranbir Singh</p>
                <a href="mailto:your.email@example.com" className="hover:underline">your.email@example.com</a> {/* Placeholder */}
                <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a> {/* Placeholder */}
              </div>
            </div>

            {/* Quick Links (Mobile) */}
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide text-xs">QUICK LINKS</h3>
              <ul className="space-y-1 text-sm">
                <li>
                  <a href="#home" className="hover:underline">Home</a>
                </li>
                <li>
                  <a href="#services" className="hover:underline">Services</a>
                </li>
                <li>
                  <a href="#projects" className="hover:underline">Projects</a>
                </li>
              </ul>
            </div>

            {/* Follow Us (Mobile) */}
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide text-xs">FOLLOW US</h3>
              <ul className="flex gap-2 text-[#fffff0]"> {/* Adjusted gap */}
                <li>
                  <a
                    href="https://www.linkedin.com/in/ranbir-singh-907345261/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0077B5] hover:bg-[#005582] transition-all hover:scale-95 transition-transform"
                  >
                    <FaLinkedinIn size={16} weight="fill" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/ranbir.bhatia.311/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1877F2] hover:bg-[#145DBF] transition-colors hover:scale-95 transition-transform"
                  >
                    <FaFacebook size={16} weight="fill" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ranbir.1376/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors hover:scale-95 transition-transform" // Custom color for Instagram
                  >
                    <FaInstagram size={16} weight="fill" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter (Mobile) */}
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide text-xs">NEWSLETTER</h3>
              <p className="text-[#fffff0] text-xs leading-relaxed">Sign up for updates</p>
              <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="newsletter-mobile" className="sr-only">Email</label>
                <input
                  id="newsletter-mobile"
                  type="email"
                  placeholder="Email"
                  className="flex-1 placeholder:text-base font-bold bg-transparent border-b border-red-600 text-[#fffff0] placeholder-red-800 focus:outline-none focus:border-red-800 pb-0.5"
                />
                <button className="ml-2 text-[#fffff0] hover:text-red-800">
                  <FaChevronRight size={18} weight="bold" />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block mx-auto max-w-5xl px-4 py-6 lg:px-8"> {/* Max-width and padding from new footer */}
        {/* Main content area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6"> {/* Adjusted gap */}
          {/* Left side - Logo and tagline */}
          <div className="space-y-3">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#fffff0] leading-none tracking-tight">
                Pet Soul
              </h1>
              <p className="text-lg md:text-xl text-[#fffff0] font-light">
                Crafting (Pet)ential Experiences
              </p>
            </div>
          </div>

          {/* Right side - Contact info, quick links, social, and newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Contact */}
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide">CONTACT</h3>
              <div className="space-y-0.5 text-[#fffff0]">
                <p>Ranbir Singh</p>
                <a href="mailto:your.email@example.com" className="hover:underline">singh772ranbir@gmail.com</a> {/* Placeholder */}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide">QUICK LINKS</h3>
              <ul className="mb-4 space-y-1">
                <li>
                  <a href="#home" className="hover:underline">Home</a>
                </li>
                <li>
                  <a href="#services" className="hover:underline">Services</a>
                </li>
                <li>
                  <a href="#projects" className="hover:underline">Projects</a>
                </li>
              </ul>
            </div>

            {/* Follow us */}
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide">FOLLOW US</h3>
              <ul className="flex gap-2 text-[#fffff0]">
                <li>
                  <a
                    href="https://www.linkedin.com/in/ranbir-singh-907345261/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#0077B5] hover:bg-[#005582] transition-all hover:scale-95 transition-transform"
                  >
                    <FaLinkedin size={16} weight="fill" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/ranbir.bhatia.311/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[#1877F2] hover:bg-[#145DBF] transition-colors hover:scale-95 transition-transform"
                  >
                    <FaFacebook size={16} weight="fill" />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/ranbir.1376/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors hover:scale-95 transition-transform"
                  >
                    <FaInstagram size={16} weight="fill" />
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide">NEWSLETTER</h3>
              <p className="text-[#fffff0] text-xs leading-relaxed">Sign up for updates</p>
              <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="newsletter-desktop" className="sr-only">Email</label>
                <input
                  id="newsletter-desktop"
                  type="email"
                  placeholder="Email"
                  className="flex-1 placeholder:text-base font-bold bg-transparent border-b border-red-600 text-[#fffff0] placeholder-red-800 focus:outline-none focus:border-red-800 pb-0.5"
                />
                <button className="ml-2 text-[#fffff0] hover:text-red-800">
                  <FaChevronRight size={18} weight="bold" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-red-200 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 text-xs text-[#fffff0]">
            <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-4">
              <a href="#" className="hover:underline transition-colors duration-200">Privacy Policy</a>
              <span>Copyright 2025 My Portfolio</span> {/* Updated copyright */}
            </div>
            <p className="text-right max-w-xs">Made by GENCONIANS.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
