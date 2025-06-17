// src/pages/ReportPage.jsx
import React, { useState } from "react";
import DashboardLayout from "../pages/DashboardLayout";
import AddPetForm from "@/components/pets/AddPets";
import ViewPetProfile from "@/components/pets/PetProfile";

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
        {isVisible && <AddPetForm />}
      </div>
      <ViewPetProfile />
    </DashboardLayout>
  );
};

export default ReportPage;
