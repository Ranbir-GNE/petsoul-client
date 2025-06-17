import React, { useState } from "react";
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaChevronUp, FaChevronDown } from "react-icons/fa";

const Footer = () => {
  const [collapsed, setCollapsed] = useState(true);

  return (
    <footer className="bg-gray-800 text-white">
      {/* Mobile Collapsible Footer */}
      <div className="md:hidden p-4">
        <button
          className="flex items-center justify-between w-full"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-expanded={!collapsed}
        >
          <span className="text-xl font-bold">Footer</span>
          {collapsed ? <FaChevronUp /> : <FaChevronDown />}
        </button>
        {!collapsed && (
          <div className="mt-4 space-y-4">
            <div>
              <h2 className="text-lg font-bold mb-1">Let's Talk</h2>
              <p className="text-sm">Have a project in mind? Let's talk. Get in touch with me.</p>
            </div>
            <div>
              <h2 className="text-lg font-bold mb-1">Links</h2>
              <ul className="mb-2 space-y-1">
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
              <ul className="flex space-x-4 mt-2">
                <li>
                  <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400">
                    <FaTwitter size={20} />
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600">
                    <FaFacebook size={20} />
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500">
                    <FaInstagram size={20} />
                  </a>
                </li>
                <li>
                  <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-300">
                    <FaLinkedin size={20} />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
      {/* Desktop Footer */}
      <div className="hidden md:grid grid-cols-3 gap-6 p-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-2">Let's Talk</h2>
          <p>Have a project in mind? Let's talk. Get in touch with me.</p>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Links</h2>
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
          <ul className="flex space-x-4 mt-2">
            <li>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-blue-400">
                <FaTwitter size={20} />
              </a>
            </li>
            <li>
              <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-600">
                <FaFacebook size={20} />
              </a>
            </li>
            <li>
              <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-500">
                <FaInstagram size={20} />
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-300">
                <FaLinkedin size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;