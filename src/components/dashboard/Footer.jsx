import React from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaChevronRight, FaLinkedinIn } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a]/20 backdrop-blur-lg rounded-lg text-[#fffff0] bottom-2">
      {/* Mobile Footer (no collapsible) */}
      <div className="md:hidden px-4 py-6">
        <div className="space-y-6 mt-0">
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
              <a href="mailto:your.email@example.com" className="hover:underline">singh772ranbir@gmail.com</a>
              {/* <a href="tel:+1234567890" className="hover:underline">+1 234 567 890</a> */}
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
            <ul className="flex gap-2 text-[#fffff0]">
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
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-pink-600 hover:bg-pink-700 transition-colors hover:scale-95 transition-transform"
                >
                  <FaInstagram size={16} weight="fill" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Desktop Footer */}
      <div className="hidden md:block mx-auto max-w-5xl px-4 py-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide">CONTACT</h3>
              <div className="space-y-0.5 text-[#fffff0]">
                <p>Ranbir Singh</p>
                <a href="mailto:your.email@example.com" className="hover:underline">singh772ranbir@gmail.com</a>
              </div>
            </div>
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
            <div className="space-y-2">
              <h3 className="text-[#fffff0] tracking-wide">FOLLOW US</h3>
              <ul className="flex gap-1 text-[#fffff0]">
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
                <li>
                  <a
                    href="https://peerlist.io/ranbir"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="inline-flex items-center justify-center font-extrabold w-8 h-8 rounded-full bg-green-600 hover:bg-green-700 transition-colors hover:scale-95 transition-transform"
                  >
                    P
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-red-200 pt-3">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-2 md:space-y-0 text-xs text-[#fffff0]">
            <div className="flex flex-col md:flex-row space-y-1 md:space-y-0 md:space-x-4">
              <a href="#" className="hover:underline transition-colors duration-200">Privacy Policy</a>
              <span>Copyright 2025 My Portfolio</span>
            </div>
            <p className="text-right max-w-xs">Made by GENCONIANS.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
