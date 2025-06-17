// src/components/layouts/DashboardLayout.jsx
import React, { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import Footer from "../components/dashboard/Footer";

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <div className="flex flex-col h-screen">
            {/* Navbar with menu toggle */}
            <Navbar onMenuClick={handleToggleSidebar} />

            {/* Layout */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div
                    className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-gray-900 text-white shadow-lg transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative md:flex`}
                >
                    <Sidebar closeSidebar={() => setSidebarOpen(false)} />
                </div>

                {/* Mobile overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <main className="flex-1 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-4">{children}</div>
                    <footer className="flex-none">
                        <Footer />
                    </footer>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
