import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import Footer from "../components/dashboard/Footer";
import background from "../assets/picture2.png";
import SidebarMobile from "@/components/dashboard/SidebarMobile";

const DashboardLayout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Background image */}
            <div className="text-white">
                <img
                    src={background || "/placeholder.svg"}
                    alt="Background"
                    className="w-full h-full object-cover fixed top-0 left-0 z-[-1] opacity-50"
                />
            </div>

            <div className="w-full max-w-[1140px] mx-auto flex flex-col min-h-screen">
                {/* Navbar */}
                <Navbar />

                {/* Main layout */}
                <div className="flex flex-1 overflow-hidden m-2">
                    {/* Desktop Sidebar */}
                    <Sidebar />

                    {/* Mobile Sidebar Dock */}
                    <SidebarMobile />

                    {/* Main Content */}
                    <main className="flex-1 flex flex-col overflow-hidden">
                        <div className="flex-1 overflow-y-auto p-4">{children}</div>
                    </main>
                </div>

                {/* Footer */}
                <footer className="flex-none mt-auto">
                    <Footer />
                </footer>
            </div>
        </div>
    );
};

export default DashboardLayout;
