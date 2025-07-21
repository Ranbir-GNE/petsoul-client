import { useState } from "react"
import Navbar from "../components/dashboard/Navbar"
import Sidebar from "../components/dashboard/Sidebar"
import Footer from "../components/dashboard/Footer"
import background from "../assets/picture2.png"

const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(false)

    const handleToggleSidebar = () => {
        setSidebarOpen((prev) => !prev)
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Background color for the entire layout */}
            <div className="text-white">
                <img
                    src={background || "/placeholder.svg"}
                    alt="Coffee"
                    className="w-full h-full object-cover fixed top-0 left-0 z-[-1] opacity-50"
                />
            </div>
            <div className="w-full max-w-[1140px] mx-auto flex flex-col min-h-screen">
                {/* Navbar with menu toggle */}
                <Navbar onMenuClick={handleToggleSidebar} />

                {/* Main layout area */}
                <div className="flex flex-1 overflow-hidden m-2">
                    {/* Sidebar */}
                    <div
                        className={`fixed inset-y-0 left-0 z-40 w-64 transform  text-white shadow-lg transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                            } md:translate-x-0 md:relative md:flex`}
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
                    </main>
                </div>

                {/* Sticky Footer */}
                <footer className="flex-none mt-auto">
                    <Footer />
                </footer>
            </div>
        </div>
    )
}

export default DashboardLayout
