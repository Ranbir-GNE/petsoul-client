import React from "react";
import InfiniteCards from "./InfiniteMovingCards";
import PetAppHero from "./BackgroundLines";
import OurMission from "./OurMission";
import PetCarousel from "./PetCarousel";

const Landing = () => {
  return (
    <>
      <div className="flex flex-col space-y-20 px-4 sm:px-6 md:px-20 lg:px-40 text-white bg-black">
        <section>
          <PetAppHero />
        </section>

        <section>
          <PetCarousel />
        </section>

        <section>
          <OurMission />
        </section>

        <section>
          <InfiniteCards />
        </section>

      </div>
    </>
  );
};

export default Landing;
