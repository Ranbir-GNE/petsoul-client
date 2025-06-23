import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import { Button } from "@/components/ui/button";
import heroImage from "../../assets/heroImage.png";
import { useNavigate } from "react-router-dom";

const PetAppHero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full overflow-hidden dark:bg-black bg-[#355c7d] ">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Happy pets"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      />

      {/* Background Animation + Content */}
      <BackgroundLines className="relative z-10 flex flex-col items-center justify-center px-4 py-16 sm:py-20 md:py-28">
        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center bg-gradient-to-b from-emerald-700 to-emerald-500 dark:from-emerald-400 dark:to-green-200 text-transparent bg-clip-text">
          Welcome to Pet Haven
        </h2>

        {/* Subheading */}
        <p className="max-w-md sm:max-w-xl md:max-w-2xl mt-4 text-center text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-300">
          Discover tips, tricks, and resources to give your furry friends the best
          care they deserve. Your journey to becoming a better pet parent starts here!
        </p>

        {/* Content Section */}
        <div className="z-20 mt-12 text-center max-w-lg w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight mb-4 text-green-900 dark:text-white">
            Caring for Pets, Made Simple
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6 text-gray-600 dark:text-gray-300">
            Join our community and access expert advice, tools, and support for a healthy and happy pet life.
          </p>
          <Button
            variant="primary"
            className="w-full sm:w-auto px-6 py-3 text-base sm:text-lg bg-green-500 hover:bg-green-400 shadow-md rounded-lg"
            onClick={() => navigate("/login")}
          >
            Join Now
          </Button>
        </div>
      </BackgroundLines>
    </section>
  );
};

export default PetAppHero;
