import React from "react";
import { StickyScroll } from "../ui/sticky-scroll-reveal";
import petWalk from "../../assets/petWalk.jpg";

const content = [
  {
    title: "Pet Health Tracking",
    description:
      "Monitor your pet's health effortlessly. Track vaccinations, vet visits, and wellness checks all in one place. Stay proactive and ensure your furry friend's well-being with real-time updates and reminders.",
    content: (
      <div className=" h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] flex items-center justify-center text-white">
        🐾 Pet Health Tracking
      </div>
    ),
  },
  {
    title: "Daily Activities",
    description:
      "Keep a log of your pet's daily activities, from walks to playtime. Easily monitor exercise patterns and ensure your pet is living a happy, healthy lifestyle.",
    content: (
      <div className="h-full w-full flex items-center justify-center text-white">
        <img
          src={petWalk}
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="dog walking"
        />
      </div>
    ),
  },
  {
    title: "Feeding Schedules",
    description:
      "Plan and track your pet's feeding schedule with ease. Ensure your pet gets the right nutrition at the right time. Manage meal portions, and set reminders for feeding time.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] flex items-center justify-center text-white">
        🍖 Feeding Schedules
      </div>
    ),
  },
  {
    title: "Pet Memories",
    description:
      "Capture and cherish every special moment. Create a timeline of your pet's life with photos, videos, and notes. Relive those happy memories anytime you want.",
    content: (
      <div className="h-full w-full bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--pink-500))] flex items-center justify-center text-white">
        📸 Pet Memories
      </div>
    ),
  },
];

const ScrollAnimation = () => {
  return (
    <div className="p-10 text-2xl font-semibold text-left">
      <h2 className="text-4xl font-semibold text-center">Our Services</h2>
      <StickyScroll content={content} />
    </div>
  );
};

export default ScrollAnimation;
