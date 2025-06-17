import React, { useState, useRef } from "react";
import { Input } from "../ui/input";

const OtpPage = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index]) {
      if (inputRefs.current[index - 1]) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, otp.length);
    if (!/^\d+$/.test(paste)) return;

    const updatedOtp = paste.split("");
    setOtp((prev) => prev.map((_, idx) => updatedOtp[idx] || ""));
    inputRefs.current[updatedOtp.length - 1]?.focus();
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length < otp.length || otp.includes("")) {
      alert("Please enter the complete OTP");
      return;
    }
    alert("Entered OTP is " + enteredOtp);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold mb-4">Enter OTP</h2>
      <div className="flex space-x-2 mb-4">
        {otp.map((data, index) => (
          <Input
            key={index}
            type="text"
            inputMode="numeric"
            maxLength="1"
            className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={data}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onFocus={(e) => e.target.select()}
            onPaste={handlePaste}
            aria-label={`OTP Digit ${index + 1}`}
          />
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpPage;
