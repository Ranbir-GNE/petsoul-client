// src/pages/ReportPage.jsx
import React, { useState } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import AddVaccinationForm from "@/components/vaccinations/AddVaccinationForm";
import ViewVaccination from "@/components/vaccinations/ViewVaccinations";

const ReportPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleVisibility = () => setIsVisible(!isVisible);

  return (
    <DashboardLayout>
      <div className="text-center">
        <button
          onClick={handleToggleVisibility}
          className="mb-4 p-2 bg-[#1a1a1a]/20 backdrop-blur-lg text-white rounded hover:bg-white hover:text-blue-500 transition duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          {isVisible ? "Hide Vaccination Form" : "Show Vaccination Form"}
        </button>
        {isVisible && <AddVaccinationForm />}
      </div>
      <ViewVaccination />
    </DashboardLayout>
  );
};

export default ReportPage;
