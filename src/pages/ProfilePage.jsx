import React from "react";
import DashboardLayout from "../pages/DashboardLayout";
import ViewProfile from "@/components/profile/ViewProfile";

const ProfilePage = () => {
  return (
    <DashboardLayout>
      <ViewProfile />
    </DashboardLayout>
  );
};

export default ProfilePage;
