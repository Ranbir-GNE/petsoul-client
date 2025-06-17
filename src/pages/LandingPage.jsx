import React from "react";
import Navbar from "../components/dashboard/Navbar";
import Landing from "../components/landing/Landing";
import Footer from "@/components/dashboard/Footer";

const LandingPage = () => {
  return (
    <div className="flex h-screen bg-[#355c7d]">
      <div className="flex-1 flex flex-col">
        <div className="h-16">
          <Navbar />
        </div>

        <div className="flex-1 flex">
          <div className="flex-1">
            <Landing />
          </div>
        </div>
        <div className="bg-gray-800 text-white p-4">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
