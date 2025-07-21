import React from "react";
import { BackgroundLines } from "@/components/ui/background-lines";
import heroImage from "../../assets/heroImage.png";
import { useNavigate } from "react-router-dom";

const PetAppHero = () => {

  return (
    <section className="relative w-full overflow-hidden bg-black">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Happy pets"
        className="absolute inset-0 w-full h-full object-cover z-10 opacity-20 rounded-lg"
      />

      {/* Foreground Content */}
      <BackgroundLines className="relative flex flex-col items-center justify-center text-center px-2 sm:px-4 md:px-8 py-12 sm:py-20 md:py-28 max-w-screen-lg mx-auto ">

        {/* Main Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold bg-gradient-to-b from-emerald-700 to-emerald-500 dark:from-emerald-400 dark:to-green-200 text-transparent bg-clip-text">
          Welcome to Pet Haven
        </h2>

        {/* Subheading */}
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-100 dark:text-gray-300 max-w-md sm:max-w-xl">
          Discover tips, tricks, and resources to give your furry friends the best care they deserve. Your journey to becoming a better pet parent starts here!
        </p>

        {/* Call to Action */}
        <div className="mt-8 w-full max-w-sm">
          <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-green-100 dark:text-white mb-3">
            Caring for Pets, Made Simple
          </h3>

          <p className="text-sm sm:text-base text-gray-100 dark:text-gray-300 mb-6">
            Join our community and access expert advice, tools, and support for a healthy and happy pet life.
          </p>
        </div>
      </BackgroundLines>
    </section>
  );
};

export default PetAppHero;
