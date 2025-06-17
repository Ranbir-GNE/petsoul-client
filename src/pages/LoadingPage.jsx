import React from "react";
import spinnerImage from "../assets/loading.gif"; // Adjust the path as necessary

const LoadingPage = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 w-full h-full">
            <img src={spinnerImage} alt="Loading..." className="h-200 w-200" />
        </div>
    );
};

export default LoadingPage;