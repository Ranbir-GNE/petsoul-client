import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import heroImage from "../../assets/heroImage.png";
import { useNavigate } from "react-router-dom";

const PetAppHero = () => {
  const navigate = useNavigate();
  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 relative">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-emerald-700 to-emerald-500 dark:from-emerald-400 dark:to-green-200 text-3xl md:text-5xl lg:text-6xl font-sans py-4 md:py-10 relative z-20 font-extrabold tracking-tight">
        Welcome to Pet Haven
      </h2>

      <p className="max-w-2xl mx-auto text-sm md:text-lg text-gray-700 dark:text-gray-300 text-center mb-4">
        Discover tips, tricks, and resources to give your furry friends the best
        care they deserve. Your journey to becoming a better pet parent starts
        here!
      </p>

      <img
        src={heroImage}
        alt="Happy pets"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      <div className="relative text-center z-10 p-6">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-green-900 dark:text-white">
          Caring for Pets, Made Simple
        </h1>
        <p className="text-lg md:text-xl mb-8 text-gray-600 dark:text-gray-300">
          Join our community and access resources, expert advice, and tools to
          ensure a healthy and happy life for your pets.
        </p>
        <Button
          variant="primary"
          className="px-8 py-4 text-lg bg-green-500 hover:bg-green-400 shadow-lg rounded-lg"
          onClick={() => navigate("/login")}
        >
          Join Now
        </Button>
      </div>
    </BackgroundLines>
  );
};

export default PetAppHero;
