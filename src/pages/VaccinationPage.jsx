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
          className="mb-4 p-2 bg-blue-500 text-white rounded"
        >
          {isVisible ? "Hide Report Form" : "Show Report Form"}
        </button>
        {isVisible && <AddVaccinationForm />}
      </div>
      <ViewVaccination />
    </DashboardLayout>
  );
};

export default ReportPage;
