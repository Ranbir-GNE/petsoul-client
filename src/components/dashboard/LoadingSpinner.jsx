import React from "react";
import spinnerImage from "../../assets/loading.gif";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center mt-6">
      <img src={spinnerImage} alt="Loading..." className="h-16 w-16" />
    </div>
  );
};

export default LoadingSpinner;
