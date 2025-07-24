import React from "react";
import Navbar from "../components/dashboard/Navbar";
import Landing from "../components/landing/Landing";
import Footer from "@/components/dashboard/Footer";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black/90">
      <div className="w-full max-w-[1140px] mx-auto px-4">
        <Navbar />
      </div>

      <div className="flex-1">
        <Landing />
      </div>

      <div className="text-white pt-4">
        <Footer />
      </div>
    </div>

  );
};

export default LandingPage;
